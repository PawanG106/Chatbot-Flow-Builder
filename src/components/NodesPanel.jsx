import "./NodesPanel.css";

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="nodes-panel">
      <div
        className="dnd-node"
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
      >
        <span className="dnd-node-icon">💬</span>
        <span className="dnd-node-label">Message</span>
      </div>
    </div>
  );
};

export default NodesPanel;
