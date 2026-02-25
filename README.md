# Chatbot Flow Builder

A visual chatbot flow builder built with **React.js** and the **React Flow** library. This application allows users to create chatbot conversation flows by dragging and dropping message nodes onto a canvas, connecting them with edges, and editing their content — all through an intuitive UI.

## Features

- **Visual Flow Canvas** — Drag-and-drop interface powered by React Flow with pan, zoom, minimap, and controls.
- **Text Message Nodes** — Custom nodes with a "Send Message" header, source/target connection handles, and editable text content.
- **Nodes Panel** — A sidebar listing available node types. Drag a node from the panel and drop it onto the canvas to add it.
- **Settings Panel** — Click any node on the canvas to open the settings panel, where you can edit the node's message text in real time. Click the back arrow (←) or click on an empty area of the canvas to return to the nodes panel.
- **Edge Connections** — Connect nodes by dragging from a source handle to a target handle. Each source handle can only have **one outgoing edge** (attempting a second connection shows a warning).
- **Save Validation** — Click **Save Changes** to validate the flow:
  - Error if fewer than 2 nodes exist.
  - Error if more than one node has an empty target handle (i.e., no incoming edge), ensuring all nodes are connected.
  - Success toast on valid flow.
- **Delete Nodes/Edges** — Select a node or edge and press `Backspace` or `Delete` to remove it.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js (Vite) | UI framework & dev server |
| @xyflow/react (React Flow v12) | Flow canvas, nodes, edges, handles |
| react-toastify | Toast notifications for save feedback |

## Getting Started

### Prerequisites

- **Node.js** >= 16
- **npm** >= 8

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd chatbot-flow-builder

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **(https://chatbot-flow-builder-app.vercel.app/)**.

### Build for Production

```bash
npm run build
```

The optimized output will be in the `dist/` folder, ready for deployment.

## How to Use

1. **Add Nodes** — Drag the **Message** block from the right-side Nodes Panel and drop it onto the canvas.
2. **Connect Nodes** — Hover over the right edge (source handle) of a node, then click and drag to the left edge (target handle) of another node to create a connection.
3. **Edit a Node** — Click on any node on the canvas. The right panel switches to the **Settings Panel** where you can modify the message text.
4. **Go Back to Nodes Panel** — Click the **← back** button in the settings panel header, or click on an empty area of the canvas.
5. **Delete** — Select a node or edge and press `Backspace` / `Delete`.
6. **Save** — Click the **Save Changes** button in the header. The app validates:
   - At least 2 nodes must exist.
   - All nodes (except one entry point) must have an incoming connection.
   - A success or error toast will appear accordingly.

## Project Structure

```
chatbot-flow-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── FlowBuilder.jsx      # Main flow canvas & orchestration
│   │   ├── FlowBuilder.css
│   │   ├── TextNode.jsx          # Custom text message node
│   │   ├── TextNode.css
│   │   ├── NodesPanel.jsx        # Draggable node types sidebar
│   │   ├── NodesPanel.css
│   │   ├── SettingsPanel.jsx     # Node text editing panel
│   │   └── SettingsPanel.css
│   ├── App.jsx                   # Root component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Hosted Application

🔗 **[Live Demo](https://chatbot-flow-builder-app.vercel.app/)** — *(Update this link after deployment)*

## License

This project is open source and available under the [MIT License](LICENSE).
