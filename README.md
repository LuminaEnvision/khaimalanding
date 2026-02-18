# KHAIMA - Retreat Catering Landing Page

Mediterranean & Asian inspired food for yoga & wellness retreats on Koh Phangan.

## 🌴 Bold Aesthetic

The KHAIMA brand features a high-contrast, modern aesthetic:
- **Signature Color**: Neon Lemon-Yellow (`#E6FF00`)
- **Background**: Deep Onyx-Dark (`#0a0b09`)
- **Typography**: Plus Jakarta Sans (Modern Geometric Sans)

## 📁 Project Structure

```
Khaima/
├── index.html          # Main landing page (expanded with About & Process)
├── menu.html           # Menu page with course options
├── inquiry.html        # Contact/inquiry page with FAQ
├── css/
│   └── style.css       # Core design system & responsive styles
├── js/
│   └── main.js         # Parallax & interaction logic
├── images/             # Brand assets and food photography
└── videos/             # Cinematic background videos
```

## 🚀 How to Run

This is a static HTML website - no build process needed!

### Option 1: Direct Browser Opening
Simply open `index.html` in your browser.

### Option 2: Local Server (Recommended)
For a better development experience with live reload:

```bash
npx -y serve
```

Then visit: `http://localhost:3000` (or the port provided)

## 🎨 Design System

All design tokens are defined as CSS variables in `css/style.css`:
```css
:root {
    --color-highlight: #E6FF00;
    --color-bg-dark: #0a0b09;
    --font-main: 'Plus Jakarta Sans';
}
```

## 📱 Pages & Sections

- **Home** (`index.html`)
    - **Hero**: Cinematic video with floating parallax image
    - **About**: "The Art of Retreat Flow" philosophy
    - **Process**: Simple 4-step workflow (Inquiry to Delivery)
- **Menu** (`menu.html`)
    - **Nourish** (Single Course)
    - **Balance** (Two Courses)
    - **Abundance** (Three Courses)
- **Inquiry** (`inquiry.html`)
    - **Contact Form**: Interactive inquiry handling
    - **FAQ**: Common questions about booking and dietary needs

## 🎯 High-Performance Features

- ✅ **Responsive Design**: Mobile-first architecture
- ✅ **Cinematic Hero**: Autoplaying background video with overlay
- ✅ **Parallax Effects**: Vertical flow animations on scroll
- ✅ **Glassmorphism**: Subtle translucent UI elements
- ✅ **SEO Optimized**: Semantic HTML5 structure

## 📝 Integration Notes

- The inquiry form logs to the console. Connect it to an API endpoint or static form service (like Basin or Formspree) for production.
- Background videos are currently linked from Vimeo/External sources.

---

Made with ❤️ for KHAIMA Retreat Catering
