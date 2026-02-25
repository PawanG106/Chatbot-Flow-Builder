import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { toast } from "react-toastify";

import TextNode from "./TextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import "./FlowBuilder.css";

const nodeTypes = { textNode: TextNode };

let id = 0;
const getId = () => `node_${id++}`;

const FlowBuilderInner = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isInteractive, setIsInteractive] = useState(true);

  const onConnect = useCallback(
    (params) => {
      if (!isInteractive) return;
      // Only allow one edge from a source handle
      const sourceHasEdge = edges.some(
        (edge) => edge.source === params.source
      );
      if (sourceHasEdge) {
        toast.warn("A source handle can only have one outgoing edge.");
        return;
      }
      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [edges, setEdges, isInteractive]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = isInteractive ? "move" : "none";
  }, [isInteractive]);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!isInteractive) return;

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: "New Message" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, isInteractive]
  );

  const onNodeClick = useCallback((_event, node) => {
    if (!isInteractive) return;
    setSelectedNode(node);
  }, [isInteractive]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onNodeUpdate = useCallback(
    (nodeId, newText) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newText } }
            : node
        )
      );
      setSelectedNode((prev) =>
        prev && prev.id === nodeId
          ? { ...prev, data: { ...prev.data, label: newText } }
          : prev
      );
    },
    [setNodes]
  );

  const handleBack = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const handleSave = useCallback(() => {
    if (nodes.length < 2) {
      toast.error("Cannot save: Add at least 2 nodes to create a flow.");
      return;
    }

    // Find nodes with empty target handles (no incoming edge)
    const nodesWithIncoming = new Set(edges.map((e) => e.target));
    const nodesWithoutIncoming = nodes.filter(
      (node) => !nodesWithIncoming.has(node.id)
    );

    // If there are more than one node without an incoming edge, the flow is invalid
    if (nodesWithoutIncoming.length > 1) {
      toast.error("Cannot save: More than one node has empty target handles.");
      return;
    }

    toast.success("Flow saved successfully!");
  }, [nodes, edges]);

  return (
    <div className="flow-builder">
      <div className="flow-builder-header">
        <div className="flow-builder-title">Chatbot Flow Builder</div>
        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
      <div className="flow-builder-body">
        <div className="flow-canvas" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            nodesDraggable={isInteractive}
            nodesConnectable={isInteractive}
            elementsSelectable={isInteractive}
            fitView
            deleteKeyCode={isInteractive ? ["Backspace", "Delete"] : null}
          >
            <Controls
              onInteractiveChange={(interactive) => setIsInteractive(interactive)}
            />
            <Background variant="dots" gap={16} size={1} color="#ddd" />
            <MiniMap
              nodeColor="#6366f1"
              maskColor="rgba(0,0,0,0.08)"
              style={{ borderRadius: 8 }}
            />
          </ReactFlow>
        </div>
        <div className="sidebar">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              onUpdate={onNodeUpdate}
              onBack={handleBack}
            />
          ) : (
            <NodesPanel />
          )}
        </div>
      </div>
    </div>
  );
};

const FlowBuilder = () => (
  <ReactFlowProvider>
    <FlowBuilderInner />
  </ReactFlowProvider>
);

export default FlowBuilder;
