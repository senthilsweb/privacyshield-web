"use client"

import { useCallback, useRef, useEffect } from 'react'
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  Handle,
  Position,
  MarkerType,
  ReactFlowProvider,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Icon } from '@iconify/react'
import { toPng } from 'html-to-image'
import { Button } from "@/components/ui/button"

const CustomNode = ({ data }) => {
  return (
    <div className={`rounded-xl shadow-lg p-3 w-40 ${data.color}`}>
      <Handle type="target" position={Position.Left} className="!bg-gray-300" />
      <div className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-white">
          <Icon icon={data.icon} className="w-12 h-12" />
        </div>
        <div className="font-medium text-sm text-center">{data.label}</div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-gray-300" />
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

const Flow = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) => (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      attributionPosition="bottom-left"
    >
      <Background
        color="#2a2a2a"
        gap={16}
        size={1}
        className="bg-muted"
      />
      <Controls className="bg-background border border-border" />
    </ReactFlow>
  )
  
  const PipelineDiagram = ({ data }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const flowRef = useRef(null)
  
    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [setEdges]
    )
  
    const exportImage = useCallback(() => {
      if (flowRef.current === null) return
      const flowElement = flowRef.current.querySelector('.react-flow__renderer')
      if (!flowElement) return
  
      const scale = 2
      toPng(flowElement, { 
        backgroundColor: '#fff',
        pixelRatio: scale,
        width: flowElement.offsetWidth * scale,
        height: flowElement.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: 'top left'
        }
      })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'pipeline-diagram.png'
          link.href = dataUrl
          link.click()
        })
    }, [])
  
    useEffect(() => {
      if (!data) return

    // Create a map to store the level of each node
    const levels = new Map()
    const processed = new Set()

    // Helper function to calculate node levels
    const calculateLevel = (nodeId, level = 0) => {
      if (levels.has(nodeId)) {
        return levels.get(nodeId)
      }

      levels.set(nodeId, level)
      processed.add(nodeId)

      // Find all edges where this node is the source
      const nextNodes = data.edges
        .filter(edge => edge.source === nodeId)
        .map(edge => edge.target)

      nextNodes.forEach(targetId => {
        if (!processed.has(targetId)) {
          calculateLevel(targetId, level + 1)
        }
      })

      return level
    }

    // Find source nodes (nodes with no incoming edges)
    const sourceNodes = data.nodes
      .filter(node => !data.edges.some(edge => edge.target === node.id))
      .map(node => node.id)

    // Calculate levels starting from source nodes
    sourceNodes.forEach(nodeId => calculateLevel(nodeId))

    // Group nodes by level
    const nodesByLevel = new Map()
    levels.forEach((level, nodeId) => {
      if (!nodesByLevel.has(level)) {
        nodesByLevel.set(level, [])
      }
      nodesByLevel.get(level).push(nodeId)
    })

    // Calculate positions
    const xGap = 250
    const yGap = 120
    const positions = new Map()

    nodesByLevel.forEach((nodesInLevel, level) => {
      const x = level * xGap
      nodesInLevel.forEach((nodeId, index) => {
        const y = index * yGap
        positions.set(nodeId, { x, y })
      })
    })

    // Create nodes with calculated positions
    const newNodes = data.nodes.map(node => ({
      id: node.id,
      type: 'custom',
      position: positions.get(node.id) || { x: 0, y: 0 },
      data: {
        label: node.name,
        icon: node.icon,
        color: node.color,
        description: node.description,
        showAnnotation: node.show_annotation,
      },
    }))

    // Create edges with animation property
    const newEdges = data.edges.map((edge, index) => ({
      id: `e${index}`,
      source: edge.source,
      target: edge.target,
      animated: edge.animated ?? false, // Default to false if not specified
      style: { stroke: '#999', strokeWidth: 1.5, strokeDasharray: '5,5' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 16,
        height: 16,
        color: '#999',
      },
    }))

    setNodes(newNodes)
    setEdges(newEdges)
  }, [data, setNodes, setEdges])

  return (
    <div className="h-full relative" ref={flowRef}>
      <ReactFlowProvider>
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />
      </ReactFlowProvider>
      <Button
        onClick={exportImage}
        className="absolute top-2 right-2 z-10"
      >
        Export as Image
      </Button>
    </div>
  )
}

export default PipelineDiagram