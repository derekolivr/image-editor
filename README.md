# Photo Editor

A modern, feature-rich web-based photo editor built with React, TypeScript, Vite, and Fabric.js. Developed with a focus on user experience, performance, and clean architecture.

![Photo Editor](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## ✨ Features

### Core Editing Tools

- **Image Upload** - Load images from your device with drag-and-drop support
- **Crop Tool** - Freeform cropping with visual guides and apply/cancel options
- **Rotate & Flip** - Rotate 90° left/right, flip horizontal/vertical (canvas auto-resizes to fit)
- **Undo/Redo** - Full history management with keyboard shortcuts (Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z)
- **Revert** - Instantly restore the original uploaded image
- **Dynamic Canvas** - Automatically resizes to fit rotated images with scrollable viewport

### Image Adjustments

- **Brightness** - Adjust image brightness from -100 to +100
- **Contrast** - Modify contrast levels from -100 to +100
- **Blur** - Apply Gaussian blur from 0 to 100
- **Grayscale** - Convert to black and white
- **Sepia** - Apply vintage sepia tone effect

### Drawing & Annotation Tools

- **Shapes** - Add circles, triangles, rectangles, and lines
- **Text** - Add editable text with default styling (Arial, 24px)
- **Selection Rectangle** - Create rectangular selection areas
- **Brush Selection** - Freehand selection with custom brush strokes

### Advanced Features

- **Delete Tool** - Remove shapes, text, and selections with Delete/Backspace/Escape keys
- **Performance Metrics** - Real-time FPS monitoring and filter performance analysis
- **Export** - Download edited images as high-quality PNG files
- **Keyboard Shortcuts** - Comprehensive keyboard support for power users

## 🛠️ Tech Stack

| Technology       | Purpose                                     |
| ---------------- | ------------------------------------------- |
| **React 18**     | UI framework with hooks and modern patterns |
| **TypeScript**   | Type-safe development                       |
| **Vite**         | Fast build tool and dev server with HMR     |
| **Fabric.js**    | Canvas manipulation and object management   |
| **Zustand**      | Lightweight state management                |
| **Tailwind CSS** | Utility-first styling                       |
| **Lucide React** | Modern icon library                         |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd image-editor
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📖 Usage Guide

### Getting Started

1. **Upload an Image** - Click the upload icon or use the file picker
2. **Select a Tool** - Active tools are highlighted in blue
3. **Make Edits** - Use toolbar tools and adjustment sliders
4. **Undo/Redo** - Step through your edit history
5. **Export** - Download your finished image

### Toolbar Organization

The toolbar is organized into logical groups:

**Image Operations**

- Upload - Load new images

**Transform Tools**

- Crop - Crop to selection
- Rotate - 90° rotations and flips

**History**

- Undo - Step backward
- Redo - Step forward
- Revert - Return to original

**Selection Tools**

- Rectangle - Create rectangular selections
- Brush - Freehand selection paths

**Drawing Tools**

- Shapes - Add geometric shapes
- Text - Add editable text
- Delete - Remove selected objects

**Export**

- Download - Save as PNG

### Keyboard Shortcuts

| Shortcut               | Action                                    |
| ---------------------- | ----------------------------------------- |
| `Ctrl/Cmd + Z`         | Undo                                      |
| `Ctrl/Cmd + Shift + Z` | Redo (also Ctrl+Y)                        |
| `Backspace`            | Delete selected object                    |
| `Delete`               | Delete selected object                    |
| `Escape`               | Delete selected object / Cancel operation |

### Adjustment Panel

Located on the right side of the screen:

- **Brightness** - Slider from -100 to 100
- **Contrast** - Slider from -100 to 100
- **Blur** - Slider from 0 to 100
- **Filters** - Toggle buttons for Grayscale and Sepia (mutually exclusive)

### Performance Metrics

Expandable panel showing:

- Real-time FPS counter
- Last filter operation time
- Average filter time
- Min/max performance bounds
- Recent operation history

Useful for identifying performance bottlenecks and optimizing workflows.

## 🏗️ Architecture

### Project Structure

```
src/
├── components/
│   ├── Canvas/         # Canvas container and initialization
│   ├── Panels/         # Adjustments and performance panels
│   └── Toolbar/        # All toolbar tools and buttons
├── store/              # Zustand state management
├── utils/              # Helpers for canvas, filters, debounce
└── App.tsx            # Main application component
```

### Key Design Patterns

**State Management**

- Zustand store for global state (canvas, image, history, performance)
- React hooks for local component state
- Event-driven updates for canvas changes

**History System**

- Canvas state serialization with `canvas.toJSON()`
- Automatic state restoration on undo/redo
- Image locking and z-order management
- Maximum 20 history entries (configurable)

**Performance Optimization**

- Debounced filter applications (100ms)
- RequestAnimationFrame for FPS monitoring
- Lazy loading and code splitting
- Fabric.js object caching

## 🔧 Configuration

### History Limit

Adjust in `src/store/editorStore.ts`:

```typescript
const HISTORY_LIMIT = 20; // Change to your preference
```

### Debounce Delay

Adjust in filter slider handlers:

```typescript
debounce((value: number) => applyFilter(value), 100); // Change delay
```

### Canvas Size

Set initial size in `src/components/Canvas/ImageCanvas.tsx`:

```typescript
width: 800,  // Default width
height: 600, // Default height
```

## 🐛 Known Limitations

1. **Region Filtering** - Currently disabled due to transform incompatibility. Filters apply to entire image.
2. **Export Format** - PNG only (JPG/WebP support planned)
3. **Mobile Support** - Optimized for desktop, mobile experience needs improvement
4. **Text Formatting** - Basic text only, no font selection or styling yet

## 🚧 Future Enhancements

- [ ] Advanced text formatting (fonts, colors, styles)
- [ ] Layers panel for object management
- [ ] More filters (sharpen, saturation, hue)
- [ ] Gradient and pattern fills
- [ ] Image resize and canvas dimension controls
- [ ] Export format options (JPG, WebP)
- [ ] Keyboard shortcut customization
- [ ] Dark/light theme toggle
- [ ] Touch/mobile optimization

## 📄 License

This project is part of a technical competition portfolio.

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

---

**Built with ❤️ using React, TypeScript, and Fabric.js**
