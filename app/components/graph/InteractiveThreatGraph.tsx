'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw, 
  Layout, 
  Layers, 
  Activity, 
  ShieldAlert, 
  FileCheck2,
  Crosshair
} from 'lucide-react';
import { ThreatNode, ThreatEdge, GraphFilterState, PathSearchResult } from '@/app/types/graph';
import { GraphNodeCard } from './GraphNodeCard';

interface InteractiveThreatGraphProps {
  nodes: ThreatNode[];
  edges: ThreatEdge[];
  filters: GraphFilterState;
  selectedNode: ThreatNode | null;
  onSelectNode: (node: ThreatNode | null) => void;
  activePath: PathSearchResult | null;
}

export const InteractiveThreatGraph: React.FC<InteractiveThreatGraphProps> = ({
  nodes: initialNodes,
  edges,
  filters,
  selectedNode,
  onSelectNode,
  activePath,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Initialize node positions based on layout mode
  const layoutNodes = useCallback(() => {
    const pos: Record<string, { x: number; y: number }> = {};
    const mode = filters.layoutMode;

    if (mode === 'radial') {
      const centerX = 480;
      const centerY = 360;
      const radius = 280;
      initialNodes.forEach((node, idx) => {
        const angle = (idx / initialNodes.length) * 2 * Math.PI;
        pos[node.id] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        };
      });
    } else if (mode === 'tree') {
      const levels: Record<string, number> = {
        email: 100,
        sender: 240,
        domain: 380,
        ip: 520,
        url: 520,
        hosting: 660,
        location: 780,
        campaign: 900,
        organization: 380,
      };
      const counts: Record<string, number> = {};

      initialNodes.forEach((node) => {
        const y = levels[node.type] || 400;
        counts[y] = (counts[y] || 0) + 1;
        const x = counts[y] * 190 - 40;
        pos[node.id] = { x, y };
      });
    } else {
      // Default Force layout
      initialNodes.forEach((node) => {
        pos[node.id] = { x: node.x || 400, y: node.y || 300 };
      });
    }

    setNodePositions(pos);
  }, [initialNodes, filters.layoutMode]);

  useEffect(() => {
    layoutNodes();
  }, [layoutNodes]);

  // Compute filtered nodes
  const filteredNodeIds = useMemo(() => {
    return new Set(
      initialNodes
        .filter((node) => {
          if (filters.nodeType !== 'all' && node.type !== filters.nodeType) return false;
          if (filters.riskLevel !== 'all' && node.risk !== filters.riskLevel) return false;
          if (filters.searchQuery) {
            const q = filters.searchQuery.toLowerCase();
            const matchLabel = node.label.toLowerCase().includes(q);
            const matchSub = node.sublabel?.toLowerCase().includes(q);
            const matchType = node.type.toLowerCase().includes(q);
            const matchIp = node.metadata?.ipAddress?.toLowerCase().includes(q);
            const matchFile = node.metadata?.filename?.toLowerCase().includes(q);
            if (!matchLabel && !matchSub && !matchType && !matchIp && !matchFile) return false;
          }
          return true;
        })
        .map((n) => n.id)
    );
  }, [initialNodes, filters]);

  // Focus node on search query match
  useEffect(() => {
    if (filters.searchQuery) {
      const match = initialNodes.find((n) => filteredNodeIds.has(n.id));
      if (match) {
        onSelectNode(match);
      }
    }
  }, [filters.searchQuery, initialNodes, filteredNodeIds, onSelectNode]);

  // Highlighted connections calculation
  const connectedNodeIds = useMemo(() => {
    const activeId = selectedNode?.id || hoveredNodeId;
    if (!activeId) return new Set<string>();

    const set = new Set<string>([activeId]);
    edges.forEach((edge) => {
      if (edge.source === activeId) set.add(edge.target);
      if (edge.target === activeId) set.add(edge.source);
    });
    return set;
  }, [selectedNode, hoveredNodeId, edges]);

  // Canvas Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCanvas) {
      setTransform((prev) => ({
        ...prev,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }));
    } else if (draggedNodeId) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const clientX = (e.clientX - rect.left - transform.x) / transform.scale;
        const clientY = (e.clientY - rect.top - transform.y) / transform.scale;
        setNodePositions((prev) => ({
          ...prev,
          [draggedNodeId]: { x: clientX - 95, y: clientY - 35 },
        }));
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
    setDraggedNodeId(null);
  };

  // Zoom handlers
  const handleZoom = (delta: number) => {
    setTransform((prev) => {
      const newScale = Math.min(Math.max(0.4, prev.scale + delta), 2.2);
      return { ...prev, scale: newScale };
    });
  };

  const handleResetView = () => {
    setTransform({ scale: 1, x: 0, y: 0 });
    onSelectNode(null);
  };

  // Calculate cluster bounds for cluster view mode
  const clusterBounds = useMemo(() => {
    if (!filters.clusterView) return [];
    const clusters: Record<string, { minX: number; minY: number; maxX: number; maxY: number; count: number }> = {};

    initialNodes.forEach((node) => {
      if (!node.clusterId || !nodePositions[node.id]) return;
      const pos = nodePositions[node.id];
      if (!clusters[node.clusterId]) {
        clusters[node.clusterId] = { minX: pos.x, minY: pos.y, maxX: pos.x + 190, maxY: pos.y + 80, count: 1 };
      } else {
        const c = clusters[node.clusterId];
        c.minX = Math.min(c.minX, pos.x);
        c.minY = Math.min(c.minY, pos.y);
        c.maxX = Math.max(c.maxX, pos.x + 190);
        c.maxY = Math.max(c.maxY, pos.y + 80);
        c.count += 1;
      }
    });

    return Object.entries(clusters).map(([id, bounds]) => ({
      id,
      ...bounds,
      width: bounds.maxX - bounds.minX + 40,
      height: bounds.maxY - bounds.minY + 40,
      x: bounds.minX - 20,
      y: bounds.minY - 20,
    }));
  }, [filters.clusterView, initialNodes, nodePositions]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={() => onSelectNode(null)}
      className="relative h-[620px] w-full overflow-hidden rounded-3xl border border-slate-200/90 bg-[#F8FAFC] shadow-inner select-none cursor-grab active:cursor-grabbing"
      style={{
        backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }}
    >
      {/* Floating Canvas Overview Stats (Top-Left) */}
      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-md backdrop-blur-md">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-1.5 text-xs font-bold text-slate-800">
          <Activity className="h-4 w-4 text-blue-600 animate-pulse" />
          <span>Graph Overview</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px]">
          <div className="flex justify-between gap-2 text-slate-600">
            <span>Nodes:</span> <strong className="text-slate-900">58</strong>
          </div>
          <div className="flex justify-between gap-2 text-slate-600">
            <span>Relationships:</span> <strong className="text-slate-900">124</strong>
          </div>
          <div className="flex justify-between gap-2 text-slate-600">
            <span>Suspicious:</span> <strong className="text-rose-600 font-bold">37</strong>
          </div>
          <div className="flex justify-between gap-2 text-slate-600">
            <span>Campaigns:</span> <strong className="text-purple-600 font-bold">6</strong>
          </div>
        </div>
      </div>

      {/* Floating Graph Toolbar (Top-Right) */}
      <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-2xl border border-slate-200/80 bg-white/90 p-1.5 shadow-md backdrop-blur-md">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoom(0.15); }}
          title="Zoom In"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleZoom(-0.15); }}
          title="Zoom Out"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setTransform({ scale: 1, x: 0, y: 0 }); }}
          title="Fit Graph"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleResetView(); }}
          title="Reset View"
          className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Floating Legend (Bottom-Left) */}
      <div className="absolute left-4 bottom-4 z-20 rounded-2xl border border-slate-200/80 bg-white/90 p-3 shadow-md backdrop-blur-md text-[11px]">
        <div className="font-bold text-slate-700 mb-1.5 flex items-center gap-1">
          <Layers className="h-3.5 w-3.5 text-blue-600" /> Graph Legend
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-slate-600">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> 📧 Email</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-500" /> 🌐 Domain</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-purple-500" /> 🖥️ IP</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-cyan-500" /> 🔗 URL</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-teal-500" /> 🌍 Location</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-500" /> 🎯 Campaign</span>
        </div>
        <div className="mt-2 border-t border-slate-100 pt-1.5 flex items-center justify-between gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-4 bg-blue-500 inline-block" /> Solid = Direct
          </span>
          <span className="flex items-center gap-1">
            <span className="h-0.5 w-4 border-b border-dashed border-purple-500 inline-block" /> Dashed = Correlated
          </span>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div
        className="absolute inset-0 transition-transform duration-75 origin-top-left"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {/* SVG Edges Layer */}
        <svg className="absolute inset-0 h-[2000px] w-[2000px] pointer-events-none z-0">
          <defs>
            <marker id="arrow-solid" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" />
            </marker>
            <marker id="arrow-highlighted" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#2563EB" />
            </marker>
          </defs>

          {/* Cluster boundary envelopes */}
          {clusterBounds.map((c) => (
            <g key={c.id}>
              <rect
                x={c.x}
                y={c.y}
                width={c.width}
                height={c.height}
                rx={28}
                fill={c.id === 'CAMP-024' ? 'rgba(239, 68, 68, 0.04)' : 'rgba(168, 85, 247, 0.04)'}
                stroke={c.id === 'CAMP-024' ? 'rgba(239, 68, 68, 0.25)' : 'rgba(168, 85, 247, 0.25)'}
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              <text
                x={c.x + 16}
                y={c.y + 24}
                className="text-[11px] font-bold tracking-wider fill-slate-500 uppercase"
              >
                CLUSTER: {c.id}
              </text>
            </g>
          ))}

          {/* Curved Connections */}
          {edges.map((edge) => {
            const srcPos = nodePositions[edge.source];
            const tgtPos = nodePositions[edge.target];
            if (!srcPos || !tgtPos) return null;

            // Compute center points of cards
            const x1 = srcPos.x + 95;
            const y1 = srcPos.y + 35;
            const x2 = tgtPos.x + 95;
            const y2 = tgtPos.y + 35;

            // Bezier control points
            const dx = x2 - x1;
            const dy = y2 - y1;
            const cx1 = x1 + dx * 0.4;
            const cy1 = y1 + dy * 0.1;
            const cx2 = x1 + dx * 0.6;
            const cy2 = y1 + dy * 0.9;

            const pathString = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

            const isPathActive = activePath?.pathEdgeIds.includes(edge.id);
            const isNodeSelected = selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);
            const isHighlighted = isPathActive || isNodeSelected;

            return (
              <g key={edge.id} className="group">
                <path
                  d={pathString}
                  fill="none"
                  stroke={
                    isPathActive
                      ? '#2563EB'
                      : isHighlighted
                      ? '#3B82F6'
                      : edge.isCorrelated
                      ? '#A855F7'
                      : '#CBD5E1'
                  }
                  strokeWidth={isHighlighted ? 3 : edge.isCorrelated ? 1.5 : 2}
                  strokeDasharray={edge.isCorrelated ? '5 5' : 'none'}
                  markerEnd="url(#arrow-solid)"
                  className="transition-all duration-200"
                />
                
                {/* Edge relationship label pill */}
                <g transform={`translate(${(x1 + x2) / 2}, ${(y1 + y2) / 2})`}>
                  <rect
                    x="-32"
                    y="-10"
                    width="64"
                    height="20"
                    rx="10"
                    fill="#FFFFFF"
                    stroke={isHighlighted ? '#3B82F6' : '#E2E8F0'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    className={`text-[9px] font-bold ${
                      isHighlighted ? 'fill-blue-700' : 'fill-slate-500'
                    }`}
                  >
                    {edge.relationship}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Nodes Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {initialNodes.map((node) => {
            const pos = nodePositions[node.id];
            if (!pos) return null;

            const isFilteredIn = filteredNodeIds.has(node.id);
            const isSelected = selectedNode?.id === node.id;
            const isHighlighted =
              connectedNodeIds.has(node.id) ||
              (activePath ? activePath.pathNodeIds.includes(node.id) : false);

            const isDimmed = Boolean(
              !isFilteredIn ||
              ((selectedNode || hoveredNodeId || activePath) && !isSelected && !isHighlighted)
            );

            return (
              <div
                key={node.id}
                onMouseDown={() => setDraggedNodeId(node.id)}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                className="absolute pointer-events-auto transition-transform duration-75"
                style={{
                  left: pos.x,
                  top: pos.y,
                }}
              >
                <GraphNodeCard
                  node={node}
                  isSelected={isSelected}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  onSelect={(selected) => onSelectNode(selected)}
                />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
