import { Handle, Position } from "@xyflow/react";
import "./TextNode.css";

const TextNode = ({ data, selected }) => {
  return (
    <div className={`text-node ${selected ? "selected" : ""}`}>
      <Handle
        type="target"
        position={Position.Left}
        className="handle"
      />
      <div className="text-node-header">
        <span className="text-node-icon">💬</span>
        <span className="text-node-title">Send Message</span>
      </div>
      <div className="text-node-body">
        <p className="text-node-content">{data.label}</p>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="handle"
      />
    </div>
  );
};

export default TextNode;
