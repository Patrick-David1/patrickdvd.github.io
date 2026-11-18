# Patrick David — Personal Portfolio

A responsive, dark-themed personal portfolio built with plain HTML, CSS, and JavaScript. No framework, build tools, or package installation required.

## Project structure

```text
personal_portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── README.md
```

## Run it locally

### Option 1 — Open directly
1. Extract the ZIP file.
2. Open the `personal_portfolio` folder.
3. Double-click `index.html`.
4. It should open in your browser.

### Option 2 — Use Visual Studio Code (recommended)
1. Install Visual Studio Code.
2. Open the extracted `personal_portfolio` folder (`File → Open Folder`).
3. Install the **Live Server** extension by Ritwick Dey.
4. Right-click `index.html` and choose **Open with Live Server**.
5. Your browser will open a local preview. Changes you save should refresh automatically.

You can also use another local static server if you already have one installed.

## Customize it

### 1. Update contact links
Open `index.html`, find the `GET IN TOUCH` section, then:
- Replace `your.email@example.com` with your email address.
- Replace the `href="#"` values on GitHub and LinkedIn with your actual profile URLs.
- Remove any social link you do not want to display.

### 2. Add project links and screenshots
The project entries are currently descriptive portfolio summaries. When you have public repositories, demos, or screenshots:
- Add a real project URL to the relevant project entry.
- Add screenshots in a new `assets/images/` folder.
- Use descriptive alt text for every image.

Do not publish private source code, passwords, API keys, or sensitive personal information.

### 3. Change the accent color
At the top of `css/style.css`, edit the CSS variables in `:root`:
- `--accent` controls the lime accent.
- `--accent-2` controls the teal accent.
- `--bg` controls the page background.
- `--panel` controls the card background.

### 4. Edit your profile
All visible profile text is in `index.html`. Search for the section heading or text you want to update. Your skill tags, academic details, project descriptions, and hardware specifications are all editable there.

## Publish it online

For a simple static portfolio, you can publish this folder using GitHub Pages:
1. Create a GitHub repository (for example, `patrick-portfolio`).
2. Upload the contents of this folder. Make sure `index.html` is in the repository root.
3. In the repository, open **Settings → Pages**.
4. Under the build/deployment section, choose **Deploy from a branch**.
5. Select your main branch and the `/ (root)` folder, then save.
6. Wait for deployment and open the Pages URL shown in Settings → Pages.

You can also deploy the folder using Netlify or Cloudflare Pages.

## Notes
- Google Fonts are loaded from the internet. The site still works offline, but the typography will fall back to system fonts.
- The contact section is a mailto link, not a backend contact form.
- No framework or npm dependencies are required.
