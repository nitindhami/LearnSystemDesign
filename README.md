# System Design Masterclass

A modern, interactive, modular learning portal for mastering System Design, from foundations to advanced interview-ready architectures.

## Features
- **Step-by-Step Roadmap**: Clear progression from beginner to advanced.
- **Progress Tracking**: Mark topics as done and track your learning journey (saved locally).
- **Interactive Dashboard**: Search, filter, and discover topics based on difficulty and relevance.
- **Learning Paths**: Specialized paths for Product Companies, Service Companies, and Big Tech.
- **Interview Ready**: Deep dives into real-world design problems and interview frameworks.
- **Dark Mode**: Professional dark/light theme toggle.

## Local Development
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. No build step required!

## Deployment to GitHub Pages
1. Push this code to a GitHub repository.
2. Go to **Settings > Pages**.
3. Select the `main` branch as the source.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Project Structure
- `index.html`: Main dashboard and landing page.
- `roadmap.html`: Visual learning progression.
- `glossary.html`: Dictionary of technical terms.
- `checklist.html`: Revision and interview preparation checklist.
- `interview-guide.html`: Framework for approaching system design interviews.
- `styles.css`: Custom styling and theme variables.
- `js/data.js`: The "brain" of the site containing all topic content.
- `js/script.js`: Core logic for interactivity and state management.

## Adding New Topics
To add a new topic, simply open `js/data.js` and add a new object to the `topics` array. The UI will automatically update to include the new card and include it in search/filters.

---
Built with ❤️ for the engineering community.
