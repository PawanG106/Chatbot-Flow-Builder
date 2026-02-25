import { useState, useEffect } from "react";
import "./SettingsPanel.css";

const SettingsPanel = ({ node, onUpdate, onBack }) => {
  const [text, setText] = useState(node?.data?.label || "");

  useEffect(() => {
    setText(node?.data?.label || "");
  }, [node]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    onUpdate(node.id, newText);
  };

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <button className="back-btn" onClick={onBack}>
          ←
        </button>
        <span className="settings-title">Message</span>
      </div>
      <div className="settings-body">
        <label className="settings-label" htmlFor="node-text">
          Text
        </label>
        <textarea
          id="node-text"
          className="settings-textarea"
          value={text}
          onChange={handleChange}
          rows={4}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
