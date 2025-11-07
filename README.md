# Web Photo Editor

A modern, web-based photo editor built with React, TypeScript, Vite, and Fabric.js. This project was developed as an application for a technical competition, focusing on frontend engineering and user experience.

## Features

- **Image Upload:** Upload images via a file dialog.
- **Crop:** Freeform cropping of images.
- **Rotate & Flip:** Rotate in 90-degree increments and flip horizontally or vertically.
- **Adjustments:** Real-time brightness, contrast, and blur adjustments with sliders.
- **Region Selection:** Select rectangular regions of the image.
- **Masked Effects:** Apply effects like blur to the selected region only.
- **Undo/Redo:** Full undo/redo support for all actions, with keyboard shortcuts (Cmd/Ctrl+Z, Cmd+Shift+Z/Ctrl+Y).
- **Export:** Export the edited image as a PNG file.

## Tech Stack

- **Core:** React 18, TypeScript, Vite
- **Canvas:** Fabric.js
- **UI:** Tailwind CSS
- **State Management:** Zustand

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd web-photo-editor
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Usage Guide

1.  **Upload an Image:** Click the "Upload Image" button to select an image from your computer.
2.  **Use the Tools:** Use the tools in the toolbar to crop, rotate, or select regions.
3.  **Adjust Filters:** Use the sliders in the right-hand panel to adjust brightness, contrast, and blur. If a region is selected, the effect will only be applied to that region.
4.  **Undo/Redo:** Use the Undo and Redo buttons or keyboard shortcuts to move through the edit history.
5.  **Export:** Click the "Export as PNG" button to download your edited image.
