# Nehal Jain - Professional Portfolio Website 🚀

A modern, responsive, and interactive personal portfolio website designed for **Nehal Jain**, pursuing **B.Tech in Computer Science & Artificial Intelligence (CS & AI)** at **Rishihood University (Newton School of Technology)**, Class of 2030.

---

## 🌟 Highlights & Features

- **Personalized Profile:** Tailored with your details (Kota roots, 17-year-old student, B.Tech CS & AI, Class of 2030).
- **Hobbies & Mindset Showcase:** Highlighting **Competitive Chess** (strategy, calculation, algorithms) and **Swimming** (endurance, focus, discipline).
- **Modern Tech Aesthetic:** Glassmorphism UI, glowing accents, clean typography, responsive design.
- **Dark / Light Mode:** Built-in theme switcher remembering user preference.
- **Dynamic Typewriter:** Eye-catching animated headline cycling through your skills and interests.
- **Fully Responsive:** Looks great across desktops, tablets, and smartphones.
- **Zero Heavy Dependencies:** Written in vanilla HTML5, CSS3, and JavaScript — lightning fast and works right out of the box!

---

## 📁 File Structure

```text
thefolder/
├── index.html        # Main HTML structure with semantic sections
├── style.css         # Modern styling, dark/light themes, animations
├── script.js         # Typewriter effect, theme toggling, interactive forms
├── thefile           # Personal quick notes & profile summary
└── README.md         # Documentation and setup guide
```

---

## 🖥️ How to Preview Locally

### Option 1: Double-Click
Simply open `index.html` in any web browser (Google Chrome, Safari, Edge, Firefox).

### Option 2: Local Python Server (Recommended)
Open your terminal in this directory and run:
```bash
python3 -m http.server 8000
```
Then visit: [http://localhost:8000](http://localhost:8000)

---

## ✏️ Quick Customizations

1. **Email & Social Links:**
   - In `index.html`, replace `nehaljain@example.com` with your real email address.
   - Replace `https://github.com` and `https://linkedin.com` with your exact GitHub username and LinkedIn profile URLs.

2. **Add Your Own Projects:**
   - Scroll to the `#projects` section in `index.html`.
   - Update project titles, descriptions, and GitHub repositories with projects you build during your coursework.

3. **Avatar / Photo:**
   - By default, a sleek glowing monogram `NJ` is displayed.
   - If you want to use your actual photo, replace the `<span class="avatar-initials">NJ</span>` inside `.avatar-inner` with:
     ```html
     <img src="your-photo.jpg" alt="Nehal Jain" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />
     ```

---

## 🌐 How to Deploy for Free (GitHub Pages)

1. Make sure your changes are committed to git:
   ```bash
   git add .
   git commit -m "Add professional portfolio website"
   git push origin main
   ```
2. Go to your repository on [GitHub](https://github.com).
3. Click on **Settings** > **Pages** (under "Code and automation").
4. Under **Branch**, select `main` and root folder `/`, then click **Save**.
5. In 1–2 minutes, your website will be live at `https://<your-username>.github.io/<repo-name>/`!

