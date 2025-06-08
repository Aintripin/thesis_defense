import React, { useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
  Handle,
  Position,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Database, GitBranch } from 'lucide-react';
import './DataPreparationSlide.scss';

interface CustomNodeData {
  num: string;
  label: React.ReactNode;
}

// Custom marker with dark grey color
const darkGreyMarker = {
  type: MarkerType.ArrowClosed,
  color: '#343a40',
  width: 20,
  height: 20
};

const CustomNode = ({ data }: NodeProps<CustomNodeData>) => (
  <div style={{ position: 'relative' }}>
    <Handle
      type="target"
      position={Position.Left}
      style={{ background: '#343a40', border: '2px solid #343a40' }}
    />
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: '#343a40', border: '2px solid #343a40' }}
    />
    
    <div className="flowchart-box">
      {data.label}
      <div className="box-number">{data.num}</div>
    </div>
  </div>
);

const nodeTypes = { custom: CustomNode };

// Animation variants for cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const initialCassandraNodes: Node<CustomNodeData>[] = [
  { id: 'cassandra-0', position: { x: -300, y: 50 }, data: { num: 'O', label: <>предварительный<br/>анализ<br/>структуры</> }, type: 'custom' },
  { id: 'cassandra-1', position: { x: 100, y: -150 }, data: { num: '1', label: <>JSON → NDJSON</> }, type: 'custom' },
  { id: 'cassandra-2', position: { x: 450, y: -150 }, data: { num: '2', label: <>NDJSON<br/>flattening</> }, type: 'custom' },
  { id: 'cassandra-3', position: { x: 180, y: 15 }, data: { num: '3', label: <>создание таблицы <span className="flowchartHighlight">A</span> со<br/>структурированными<br/>колонками</> }, type: 'custom' },
  { id: 'cassandra-4', position: { x: 680, y: -50 }, data: { num: '4', label: <>заполнение таблицы<br/><span className="flowchartHighlight">A</span> реальными<br/>данными<br/>через DSBulk</> }, type: 'custom' },
  { id: 'cassandra-5', position: { x: 100, y: 230 }, data: { num: '5', label: <>создание таблицы <span className="flowchartHighlight">B</span><br/>через YCSB</> }, type: 'custom' },
  { id: 'cassandra-6', position: { x: 650, y: 200 }, data: { num: '6', label: <>заполнение таблицы<br/><span className="flowchartHighlight">B</span> реальными<br/>данными</> }, type: 'custom' },
];

const initialCassandraEdges: Edge[] = [
  { id: 'e-c-0-1', source: 'cassandra-0', target: 'cassandra-1', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-1-2', source: 'cassandra-1', target: 'cassandra-2', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-0-3', source: 'cassandra-0', target: 'cassandra-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-2-4', source: 'cassandra-2', target: 'cassandra-4', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-3-4', source: 'cassandra-3', target: 'cassandra-4', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-0-5', source: 'cassandra-0', target: 'cassandra-5', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-5-6', source: 'cassandra-5', target: 'cassandra-6', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-4-6', source: 'cassandra-4', target: 'cassandra-6', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
];

interface FlowchartProps {
  initialNodes: Node<CustomNodeData>[];
  initialEdges: Edge[];
}

const Flowchart = ({ initialNodes, initialEdges }: FlowchartProps) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      defaultViewport={{ x: 300, y: 180, zoom: 0.8 }}
      proOptions={{ hideAttribution: true }}
      panOnDrag={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
    >
    </ReactFlow>
  );
};

export const DataPreparationSlide = () => {
  return (
    <div className="data-preparation-slide">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .react-flow__edges {
              overflow: visible !important;
              z-index: 1 !important;
            }
            .react-flow__edge-path {
              stroke: #343a40 !important;
              stroke-width: 3px !important;
              fill: none !important;
            }
            .react-flow__arrowhead {
              fill: #343a40 !important;
              stroke: #343a40 !important;
            }
            /* Nuclear option for stubborn arrowheads */
            svg defs marker polygon {
              fill: #343a40 !important;
              stroke: #343a40 !important;
            }
            svg defs marker path {
              fill: #343a40 !important;
              stroke: #343a40 !important;
            }
            marker * {
              fill: #343a40 !important;
              stroke: #343a40 !important;
            }
            /* Target all possible arrowhead selectors */
            [id*="arrowclosed"] * {
              fill: #343a40 !important;
              stroke: #343a40 !important;
            }
            .react-flow__edge.selected .react-flow__edge-path {
              stroke: #343a40 !important;
            }
            /* Override any default marker colors */
            svg marker {
              color: #343a40 !important;
            }
            svg marker polygon,
            svg marker path {
              fill: #343a40 !important;
              stroke: #343a40 !important;
            }
            .react-flow__edge {
              pointer-events: all !important;
            }
            svg.react-flow__edges {
              overflow: visible !important;
            }
            
            /* FORCE HIGHLIGHT TEXT TO BE VISIBLE */
            .flowchartHighlight,
            span.flowchartHighlight,
            .flowchart-box .flowchartHighlight,
            .flowchart-box span.flowchartHighlight,
            .react-flow__node .flowchartHighlight,
            .react-flow__node span.flowchartHighlight,
            .react-flow__node-custom .flowchartHighlight,
            .react-flow__node-custom span.flowchartHighlight {
              background: #4285f4 !important;
              color: #ffffff !important;
              padding: 4px 8px !important;
              border-radius: 6px !important;
              font-weight: 700 !important;
              font-size: 28px !important;
              display: inline-block !important;
              font-family: 'ALS Sector Regular', sans-serif !important;
              line-height: 1.2 !important;
              opacity: 1 !important;
              visibility: visible !important;
              text-shadow: none !important;
              border: none !important;
              box-shadow: 0 2px 4px rgba(66, 133, 244, 0.3) !important;
              text-decoration: none !important;
              position: relative !important;
              z-index: 999 !important;
            }
            
            /* Debug: Make highlight super obvious */
            .flowchartHighlight::before {
              content: '' !important;
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              background: #4285f4 !important;
              z-index: -1 !important;
            }
          `,
        }}
      />

      {/* Title Container */}
      <motion.div
        className="slide-title-container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="slide-title">ПОДГОТОВКА ДАННЫХ ДЛЯ CASSANDRA</h1>
      </motion.div>

      {/* Content Container */}
      <div className="content-container">
        {/* Sidebar */}
        <motion.div 
          className="sidebar"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="sidebar-header">
            <div className="sidebar-icon-cluster">
              <Database size={40} className="sidebar-icon database" />
              <GitBranch size={36} className="sidebar-icon workflow" />
            </div>
            <h2 className="sidebar-title">Подготовка данных для Cassandra</h2>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="main-content-area-wrapper">
          <motion.div 
            className="main-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Cassandra Section */}
            <motion.div 
              className="flowchart-section cassandra-section"
              variants={sectionVariants}
              transition={{ delay: 0.4 }}
            >
              <div className="section-header">
                Apache Cassandra, многоэтапная трансформация
              </div>
              <div className="section-content">
                <div className="flowchart-container">
                  <Flowchart initialNodes={initialCassandraNodes} initialEdges={initialCassandraEdges} />
                </div>
              </div>
            </motion.div>

            {/* Key Differences Section */}
            <motion.div 
              className="key-differences-section"
              variants={sectionVariants}
              transition={{ delay: 0.7 }}
            >
              <div className="section-header">
                Ключевые различия
              </div>
              <div className="section-content">
                <motion.div 
                  className="differences-list"
                  variants={containerVariants}
                  transition={{ delay: 1.0 }}
                >
                  <motion.div className="difference-item" variants={itemVariants}>
                    <div className="db-badge mongodb">MongoDB:</div>
                    <span className="difference-text">естественная совместимость</span>
                  </motion.div>
                  <motion.div className="difference-item" variants={itemVariants}>
                    <div className="db-badge postgresql">PostgreSQL:</div>
                    <span className="difference-text">баланс между структурированностью и гибкостью</span>
                  </motion.div>
                  <motion.div className="difference-item" variants={itemVariants}>
                    <div className="db-badge cassandra">Cassandra:</div>
                    <span className="difference-text">требование полной денормализации</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* BMSTU Logo Emblem */}
          <motion.div 
            className="emblem-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <img 
              src="/assets/bmstu/bmstu-logo-white.png" 
              alt="BMSTU Logo" 
              className="bmstu-emblem"
              onError={(e) => {
                // Fallback to SVG if PNG fails
                const target = e.target as HTMLImageElement;
                target.src = "/assets/bmstu/bmstu-logo-white.svg";
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
