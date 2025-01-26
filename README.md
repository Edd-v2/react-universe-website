# Universe Navigation Website

## Description
A web application where users explore a universe with planets, each containing unique content. The application features animations, 3D graphics, and responsive design for both PC and mobile.

## Features
- Loading page with animation.
- Interactive 3D space scene.
- Animated transitions when navigating planets.
- Different content for each planet.

## Technology Stack
- React (Frontend framework)
- React-Three-Fiber (3D graphics)
- Framer Motion (Animations)
- TailwindCSS / Styled-Components (Styling)
- ESLint & Prettier (Code quality)

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the development server with `npm start`.

## Folder Structure
- `src/assets`: Static files like images and icons.
- `src/components`: Reusable components, including loading page, universe scene, planets, and content types.
- `src/styles`: CSS or styled components for styling.

## To-Do
- Optimize performance for mobile devices.
- Add more content types and interactivity.

root/
├── public/
│   ├── index.html
│   ├── logo.png
├── src/
│   ├── assets/             # Static files (e.g., images, icons)
│   ├── components/
│   │   ├── LoadingPage.jsx
│   │   ├── UniverseScene.jsx
│   │   ├── Planet.jsx
│   │   ├── Content/
│   │   │   ├── TextContent.jsx
│   │   │   ├── CarouselContent.jsx
│   │   │   ├── IconContent.jsx
│   ├── styles/             # CSS or Styled-Components
│   │   ├── global.css
│   ├── App.jsx
│   ├── index.js
├── package.json
├── README.md
