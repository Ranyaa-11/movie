# Movie Search App

A modern, responsive movie search application that lets you discover films by title, genre, and language with rich movie details.

## Features

- 🔍 **Search by Title** - Instantly find movies with live search results
- 🎬 **Movie Details** - View awards, cast, genre, language, and plot summaries
- 🎭 **Genre & Language Discovery** - Browse movies by genre and language preferences
- 🎨 **Modern UI** - Beautiful teal and emerald color scheme with smooth animations
- ⚡ **Fast Performance** - Optimized React app with efficient API integration

## Tools & Technologies Used

**Build & Development Tools:**
- **Webpack** - Module bundler for optimizing production builds
- **Node.js & npm** - JavaScript runtime and package manager for dependency management
- **CSS3** - Modern styling with gradients, flexbox, and grid layouts

**External API:**
- **OMDb API** - Open Movie Database API for fetching real-time movie data, details, awards, and cast information

**Styling & Design:**
- **CSS Gradients** - Vibrant teal and emerald color gradients for modern aesthetics
- **Flexbox & CSS Grid** - Responsive layout system for all device sizes
- **Custom CSS Animations** - Smooth transitions and hover effects for enhanced UX

**Version Control & Deployment:**
- **Git** - Version control for tracking changes
- **GitHub Pages** - Hosting and deployment platform (configured in package.json)

## Installation

```bash
npm install
```

## Development Server

```bash
npm start
```

Runs the app at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.js       # Movie search input component
│   ├── MovieCard.js       # Individual movie card display
│   └── MovieList.js       # Grid layout for movie results
├── styles/
│   ├── App.css            # Main app styling
│   ├── SearchBar.css      # Search bar styling
│   └── MovieCard.css      # Movie card styling
├── App.js                 # Main application component
├── api.js                 # OMDb API integration
└── index.js               # React entry point
```

## Tech Stack Summary

| Category | Technology |
|----------|-----------|
| Frontend | React 18 |
| Styling | CSS3 |
| API | OMDb |
| Build Tool | Webpack (via react-scripts) |
| Package Manager | npm |
| Version Control | Git |
| Deployment | GitHub Pages |

---

Built with ❤️ using modern React and web technologies.
