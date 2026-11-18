const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// Footer year
$("#year").textContent = `© ${new Date().getFullYear()}`;

// Mobile navigation
const menuToggle = $(".menu-toggle");
const navLinks = $(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
$$(".nav-links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Subtle pointer glow (desktop only)
const glow = $(".cursor-glow");
window.addEventListener("pointermove", event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
$$(".reveal").forEach(element => revealObserver.observe(element));

// Project filters
$$(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter-button").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    $$(".project-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

// Pull public repositories from GitHub and add newly created projects.
// The hand-written featured cards remain visible if the API is unavailable.
const username = "Patrick-David1";
const excludedRepos = new Set([username.toLowerCase(), "patrickdvd.github.io"]);
const featuredRepos = new Set([
  "Simple-Java-ATM-System",
  "Pizza-Ordering-Kiosk-Java-",
  "Pythagorean-Theorem-Auto-Solver",
  "Quadratic-Equation-Nature-of-Roots",
  "Odd-Even-Number-Detection",
  "ITE-102"
]);

function categoryFor(repo) {
  const language = (repo.language || "").toLowerCase();
  if (language === "java") return "java";
  if (language === "c++" || language === "cpp") return "cpp";
  return "coursework";
}
function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[char]);
}
function repoCard(repo, index) {
  const category = categoryFor(repo);
  const language = repo.language || "PROJECT";
  const description = repo.description || "An experiment, exercise, or project from my development journey.";
  const stars = repo.stargazers_count ? ` · ${repo.stargazers_count} STAR${repo.stargazers_count === 1 ? "" : "S"}` : "";
  return `
    <a class="project-card api-project" href="${escapeHTML(repo.html_url)}" target="_blank" rel="noreferrer" data-category="${category}">
      <div class="project-card-top"><span>${String(index + 1).padStart(2, "0")} / ${escapeHTML(language.toUpperCase())}</span><span>↗</span></div>
      <div class="project-icon">⌘</div>
      <h3>${escapeHTML(repo.name.replaceAll("-", " ").replaceAll("_", " "))}</h3>
      <p>${escapeHTML(description)}</p>
      <div class="project-tags"><span>${escapeHTML(language.toUpperCase())}</span>${repo.fork ? "<span>FORK</span>" : "<span>GITHUB</span>"}</div>
      <div class="project-card-bottom"><span>VIEW REPOSITORY${escapeHTML(stars)}</span><span>↗</span></div>
    </a>`;
}
async function loadRepositories() {
  const status = $("#repo-status-text");
  const count = $("#repo-count");
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=owner`, {
      headers: { "Accept": "application/vnd.github+json" }
    });
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const repos = await response.json();
    const projects = repos.filter(repo =>
      !excludedRepos.has(repo.name.toLowerCase()) &&
      !featuredRepos.has(repo.name) &&
      !repo.archived
    );
    const grid = $("#project-grid");
    if (projects.length) {
      const startIndex = grid.querySelectorAll(".project-card").length;
      grid.insertAdjacentHTML("beforeend", projects.map((repo, index) => repoCard(repo, startIndex + index)).join(""));
    }
    const publicProjects = repos.filter(repo => !excludedRepos.has(repo.name.toLowerCase()));
    status.textContent = "GITHUB SYNCED";
    count.textContent = `${publicProjects.length} public repositories found · Latest projects are pulled directly from GitHub.`;
    // Reapply the currently selected filter to newly loaded cards.
    const activeFilter = $(".filter-button.active")?.dataset.filter || "all";
    $$(".project-card").forEach(card => {
      card.hidden = activeFilter !== "all" && card.dataset.category !== activeFilter;
    });
  } catch (error) {
    status.textContent = "FEATURED PROJECTS";
    count.textContent = "Showing selected projects. GitHub's live repository feed is temporarily unavailable.";
    console.info("Repository sync unavailable:", error);
  }
}
loadRepositories();

// Keep contact link honest until a real email is added.
const emailLink = $("#email-link");
emailLink.addEventListener("click", event => {
  event.preventDefault();
  const note = $(".email-note");
  note.textContent = "Add your preferred public email address to index.html to enable direct email contact.";
  note.classList.add("note-highlight");
});
