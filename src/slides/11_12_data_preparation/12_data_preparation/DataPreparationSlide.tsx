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
import styles from './DataPreparationSlide.module.scss';

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
    
    <div className={styles.flowchartBox}>
      {data.label}
      <div className={styles.boxNumber}>{data.num}</div>
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
  { id: 'cassandra-0', position: { x: 0, y: 50 }, data: { num: 'O', label: <>предварительный<br/>анализ<br/>структуры</> }, type: 'custom' },
  { id: 'cassandra-1', position: { x: 300, y: -50 }, data: { num: '1', label: <>JSON → NDJSON</> }, type: 'custom' },
  { id: 'cassandra-2', position: { x: 650, y: -100 }, data: { num: '2', label: <>NDJSON<br/>flattening</> }, type: 'custom' },
  { id: 'cassandra-3', position: { x: 680, y: 90 }, data: { num: '3', label: <>создание таблицы <span className="flowchartHighlight">A</span> со<br/>структурированными<br/>колонками</> }, type: 'custom' },
  { id: 'cassandra-4', position: { x: 1260, y: -50 }, data: { num: '4', label: <>заполнение таблицы<br/><span className="flowchartHighlight">A</span> реальными<br/>данными<br/>через DSBulk</> }, type: 'custom' },
  { id: 'cassandra-5', position: { x: 300, y: 250 }, data: { num: '5', label: <>создание таблицы <span className="flowchartHighlight">B</span><br/>через YCSB</> }, type: 'custom' },
  { id: 'cassandra-6', position: { x: 1100, y: 350 }, data: { num: '6', label: <>заполнение таблицы<br/><span className="flowchartHighlight">B</span> реальными<br/>данными</> }, type: 'custom' },
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
      defaultViewport={{ x: 50, y: 120, zoom: 1.0 }}
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
    <div className={styles.dataPreparationSlide}>
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
              padding: 6px 10px !important;
              border-radius: 6px !important;
              font-weight: 700 !important;
              font-size: 22px !important;
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
        className={styles.slideTitleContainer}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.slideTitle}>ПОДГОТОВКА ДАННЫХ ДЛЯ CASSANDRA</h1>
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        {/* Main Content */}
        <div className={styles.mainContentAreaWrapper}>
          <motion.div 
            className={styles.mainContent}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Cassandra Section */}
            <motion.div 
              className={styles.flowchartSection}
              variants={sectionVariants}
              transition={{ delay: 0.4 }}
            >
              <div className={styles.sectionHeader}>
                Схема загрузки датасета в Apache Cassandra
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.flowchartContainer}>
                  <Flowchart initialNodes={initialCassandraNodes} initialEdges={initialCassandraEdges} />
                </div>
              </div>
            </motion.div>

            {/* Key Differences Section */}
            <motion.div 
              className={styles.keyDifferencesSection}
              variants={sectionVariants}
              transition={{ delay: 0.7 }}
            >
              <div className={styles.sectionHeader}>
                Ключевые различия
              </div>
              <div className={styles.sectionContent}>
                <motion.div 
                  className={styles.differencesList}
                  variants={containerVariants}
                  transition={{ delay: 1.0 }}
                >
                  <motion.div className={styles.differenceItem} variants={itemVariants}>
                    <div className={`${styles.dbBadge} ${styles.mongodb}`}>MongoDB:</div>
                    <span className={styles.differenceText}>естественная совместимость</span>
                  </motion.div>
                  <motion.div className={styles.differenceItem} variants={itemVariants}>
                    <div className={`${styles.dbBadge} ${styles.postgresql}`}>PostgreSQL:</div>
                    <span className={styles.differenceText}>баланс между структурированностью и гибкостью</span>
                  </motion.div>
                  <motion.div className={styles.differenceItem} variants={itemVariants}>
                    <div className={`${styles.dbBadge} ${styles.cassandra}`}>Cassandra:</div>
                    <span className={styles.differenceText}>требование полной денормализации</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* BMSTU Logo Emblem */}
          <motion.div 
            className={styles.emblemContainer}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <img 
              src="/assets/bmstu/bmstu-logo-white.png" 
              alt="BMSTU Logo" 
              className={styles.bmstuEmblem}
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
