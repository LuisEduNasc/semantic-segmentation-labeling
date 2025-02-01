# semantic-segmentation-labeling

This front-end application project allows users to annotate semantic segmentation data interactively using brush tools or polygon drawing.

## Key features

- Annotation Options
- Class Management
- Editing Tools
- Export Features
- Canvas Management

## Folder structure

src
├── assets // Static assets such as SVG, PNG, and static JS files
├── components // Global components (e.g., UI folder, shared components)
├── store // Global state management with Zustand
├── data // Static data assets (e.g., JSON files)
├── features // Feature-based modules for specific application parts
├── pages // Main React pages for the application
├── lib // Library facades (e.g., Axios)
├── utils // Helper functions (e.g., formatters, pure functions)
├── hooks // Global custom hooks

## Development Setup

Prerequisites:

- Node.js version 16 or higher
- Package Manager: npm or yarn
  Installation:
- git clone <repository-url>
- cd semantic-segmentation-labeling
- npm install
  // To run locally
- npm run dev
  // To build for production
- npm run build
  // Preview production build
- npm run preview

## Tech Stack

- React 19.x

- TypeScript

- Vite for fast development builds

- Tailwind CSS for styling

- Zustand for state management

- Fabric.js for canvas manipulation

## COCO Format Export

This application supports exporting annotations in COCO format with the following structure:

Images: File names, height, and width.

Annotations: Segmentation information encoded in RLE.

Categories: Class names and IDs.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
