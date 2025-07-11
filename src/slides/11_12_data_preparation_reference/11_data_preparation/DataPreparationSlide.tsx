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
import { useTheme } from '../../../contexts/ThemeContext';
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

const initialMongoNodes: Node<CustomNodeData>[] = [
  { id: 'mongo-0', position: { x: -200, y: -150 }, data: { num: 'O', label: 'предварительный анализ структуры' }, type: 'custom' },
  { id: 'mongo-1', position: { x: 540, y: -150 }, data: { num: '1', label: 'импорт данных' }, type: 'custom' },
  { id: 'mongo-2', position: { x: -150, y: -30 }, data: { num: '2', label: 'создание таблицы ч/з YCSB' }, type: 'custom' },
  { id: 'mongo-3', position: { x: 430, y: -15 }, data: { num: '3', label: 'заполнение реальными данными' }, type: 'custom' },
  { id: 'mongo-4', position: { x: 300, y: 75 }, data: { num: '4', label: 'создание индексов' }, type: 'custom' },
];

const initialMongoEdges: Edge[] = [
  { id: 'e-m-0-1', source: 'mongo-0', target: 'mongo-1', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-1-3', source: 'mongo-1', target: 'mongo-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-0-2', source: 'mongo-0', target: 'mongo-2', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-2-3', source: 'mongo-2', target: 'mongo-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-3-4', source: 'mongo-3', target: 'mongo-4', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
];

const initialPostgresNodes: Node<CustomNodeData>[] = [
    { id: 'pg-0', position: { x: -350, y: 220 }, data: { num: 'O', label: <>предварительный<br/>анализ структуры</> }, type: 'custom' },
    { id: 'pg-1', position: { x: -20, y: 50 }, data: { num: '1', label: <>создание первичной<br/>таблицы <span className="flowchartHighlight">A</span> с колонками<br/><span className="flowchartHighlight">_id</span> и <span className="flowchartHighlight">data</span> (JSONB)</> }, type: 'custom' },
    { id: 'pg-2', position: { x: 50, y: 350 }, data: { num: '2', label: <>создание таблицы <span className="flowchartHighlight">B</span><br/>через YCSB</> }, type: 'custom' },
    { id: 'pg-3', position: { x: 350, y: 150}, data: { num: '3', label: <>создание таблицы <span className="flowchartHighlight">C</span> со<br/>структурированными<br/>колонками</> }, type: 'custom' },
    { id: 'pg-4', position: { x: 550, y: 0 }, data: { num: '4', label: <>импорт данных<br/>из mongoDB</> }, type: 'custom' },
    { id: 'pg-5', position: { x: 900, y: 100 }, data: { num: '5', label: <>парсинг данных и<br/>заполнение<br/>таблицы <span className="flowchartHighlight">C</span></> }, type: 'custom' },
    { id: 'pg-6', position: { x: 650, y: 350 }, data: { num: '6', label: <>заполнение таблицы<br/><span className="flowchartHighlight">B</span> реальными<br/>данными</> }, type: 'custom' },
];

const initialPostgresEdges: Edge[] = [
    { id: 'e-p-0-1', source: 'pg-0', target: 'pg-1', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-0-2', source: 'pg-0', target: 'pg-2', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-0-3', source: 'pg-0', target: 'pg-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-1-4', source: 'pg-1', target: 'pg-4', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-2-6', source: 'pg-2', target: 'pg-6', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-3-5', source: 'pg-3', target: 'pg-5', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-4-5', source: 'pg-4', target: 'pg-5', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-5-6', source: 'pg-5', target: 'pg-6', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
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
      fitView
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

export const _DataPreparationSlide = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.dataPreparationSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
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
              background: ${isPrintTheme ? '#000' : '#4285f4'} !important;
              color: ${isPrintTheme ? '#fff' : '#ffffff'} !important;
              padding: 4px 8px !important;
              border-radius: 6px !important;
              font-weight: 700 !important;
              font-size: 18px !important;
              display: inline-block !important;
              font-family: 'ALS Sector Regular', sans-serif !important;
              line-height: 1.2 !important;
              opacity: 1 !important;
              visibility: visible !important;
              text-shadow: none !important;
              border: ${isPrintTheme ? '1px solid #000' : 'none'} !important;
              box-shadow: ${isPrintTheme ? 'none' : '0 2px 4px rgba(66, 133, 244, 0.3)'} !important;
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
              background: ${isPrintTheme ? '#000' : '#4285f4'} !important;
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
        <h1 className={styles.slideTitle}>СТРАТЕГИИ ПОДГОТОВКИ ДАННЫХ</h1>
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
            {/* MongoDB Section */}
            <motion.div 
              className={styles.flowchartSection}
              variants={sectionVariants}
              transition={{ delay: 0.4 }}
            >
              <div className={styles.sectionHeader}>
                Схема загрузки датасета в mongoDB
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.flowchartContainer}>
                  <Flowchart initialNodes={initialMongoNodes} initialEdges={initialMongoEdges} />
                </div>
              </div>
            </motion.div>

            {/* PostgreSQL Section */}
            <motion.div 
              className={styles.flowchartSection}
              variants={sectionVariants}
              transition={{ delay: 0.7 }}
            >
              <div className={styles.sectionHeader}>
                Схема загрузки датасета в PostgreSQL
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.flowchartContainer}>
                  <Flowchart initialNodes={initialPostgresNodes} initialEdges={initialPostgresEdges} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component that provides theme context
export const DataPreparationSlide = () => {
  const { isPrintTheme } = useTheme();
  
  return <_DataPreparationSlide />;
};
