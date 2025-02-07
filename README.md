# Semantic Segmentation Labeling

This project is a front-end application designed for semantic segmentation labeling. It allows users to annotate images using interactive tools such as brush and polygon drawing, supporting efficient and detailed data annotation workflows.

---

## Key Features

- **Annotation Options:**
  - Brush annotation with customizable brush sizes.
  - Polygon annotation for precise segment drawing.
- **Class Management:**
  - Define class names and assign unique colors to each class.
  - Ensure that pixel overlaps are avoided.
- **Editing Tools:**
  - Eraser tool to remove annotations.
  - Undo functionality to reverse the last action.
- **Export Features:**
  - Export annotations in the COCO format.
- **Canvas Management:**
  - Responsive layout suitable for smaller screens.
  - Interactive annotation using the Fabric.js library.

---

## Folder Structure

```
src
├── assets      // Static assets such as SVG, PNG, and static JS files
├── components   // Global components (e.g., UI folder, shared components)
├── store        // Global state management with Zustand
├── data         // Static data assets (e.g., JSON files)
├── features     // Feature-based modules for specific application parts
├── pages        // Main React pages for the application
├── lib          // Library facades (e.g., Axios)
├── utils        // Helper functions (e.g., formatters, pure functions)
├── hooks        // Global custom hooks
```

---

## Development Setup

### Prerequisites

- **Node.js** version 16 or higher
- **Package Manager:** npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/LuisEduNasc/semantic-segmentation-labeling.git
   cd semantic-segmentation-labeling
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## Linting and Formatting

### Linting

To run ESLint:

```bash
npm run lint
```

To fix lint issues:

```bash
npm run lint:fix
```

### Formatting

To format code with Prettier:

```bash
npm run format
```

---

## Available Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Run ESLint to check for code issues.
- **`npm run lint:fix`**: Automatically fix linting issues.
- **`npm run format`**: Format code using Prettier.

---

## Tech Stack

- **React 19.x**
- **TypeScript**
- **Vite** for fast development builds
- **Tailwind CSS** for styling
- **Zustand** for state management
- **Fabric.js** for canvas manipulation (https://fabricjs.com/docs/)

---

## Expanding ESLint Configuration

If you need to enhance ESLint for production development:

### Update TypeScript-Aware Rules

1. Configure the top-level `parserOptions` in the ESLint configuration:

   ```js
   export default tseslint.config({
     languageOptions: {
       parserOptions: {
         project: ['./tsconfig.node.json', './tsconfig.app.json'],
         tsconfigRootDir: import.meta.dirname,
       },
     },
   });
   ```

2. Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`.
3. Optionally add `...tseslint.configs.stylisticTypeChecked`.
4. Install `eslint-plugin-react` and configure it as follows:

   ```js
   import react from 'eslint-plugin-react';

   export default tseslint.config({
     settings: { react: { version: '18.3' } },
     plugins: { react },
     rules: {
       ...react.configs.recommended.rules,
       ...react.configs['jsx-runtime'].rules,
     },
   });
   ```

---

## COCO Format Export

This application supports exporting annotations in COCO format with the following structure:

- **Images:** File names, height, and width.
- **Annotations:** Segmentation information encoded in RLE.
- **Categories:** Class names and IDs.

---

## Contribution

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

---

## License

This project is licensed under the MIT License.

### Future Improvements:

- \*\*Improve the behavior of the eraser for brush drawing.
- \*\*Enhance the undo functionality to only undo visible drawings.
