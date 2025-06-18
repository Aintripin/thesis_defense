import React, { useCallback, forwardRef } from 'react';
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
import { useTheme } from '../../contexts/ThemeContext';
import styles from './DataPreparationSlide.module.scss';
import { DetailedMongoDbFlow } from './DetailedMongoDbFlow.tsx';
import { SlideHeading } from '../../components/SlideHeading';

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
  { id: 'mongo-0', position: { x: -200, y: -250 }, data: { num: 'O', label: 'предварительный анализ структуры' }, type: 'custom' },
  { id: 'mongo-1', position: { x: 640, y: -250 }, data: { num: '1', label: 'импорт данных' }, type: 'custom' },
  { id: 'mongo-2', position: { x: -150, y: -100 }, data: { num: '2', label: 'создание таблицы ч/з YCSB' }, type: 'custom' },
  { id: 'mongo-3', position: { x: 550, y: -50 }, data: { num: '3', label: 'заполнение реальными данными' }, type: 'custom' },
  { id: 'mongo-4', position: { x: 350, y: 100 }, data: { num: '4', label: 'создание индексов' }, type: 'custom' },
];

const initialMongoEdges: Edge[] = [
  { id: 'e-m-0-1', source: 'mongo-0', target: 'mongo-1', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-1-3', source: 'mongo-1', target: 'mongo-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-0-2', source: 'mongo-0', target: 'mongo-2', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-2-3', source: 'mongo-2', target: 'mongo-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-m-3-4', source: 'mongo-3', target: 'mongo-4', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
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
      <style>
        {`
          .${styles.boxNumber} {
            background: #343a40 !important;
            color: white !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 24px !important;
            top: -20px !important;
            right: -20px !important;
          }
          .printTheme .${styles.stepDescription} code {
            background: white !important;
            color: black !important;
          }
          .${styles.stepDescription} b {
            font-size: 1.6rem !important;
            font-weight: 600 !important;
            color: #333 !important;
          }
          .${styles.stepTitle} {
            font-size: 1.8rem !important;
          }
          .${styles.flowchartBox} {
            font-size: 36px !important;
          }
          .${styles.codeBlock} {
            align-items: flex-start !important;
          }
          .${styles.codeBlock} pre {
            font-size: 1.4rem !important;
          }
        `}
      </style>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .${styles.flowchartHighlight},
            span.${styles.flowchartHighlight},
            .${styles.flowchartBox} .${styles.flowchartHighlight},
            .${styles.flowchartBox} span.${styles.flowchartHighlight},
            .react-flow__node .${styles.flowchartHighlight},
            .react-flow__node span.${styles.flowchartHighlight},
            .react-flow__node-custom .${styles.flowchartHighlight},
            .react-flow__node-custom span.${styles.flowchartHighlight} {
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
            
            .${styles.flowchartHighlight}::before {
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

      <SlideHeading size="small">Стратегии подготовки данных MongoDB</SlideHeading>

      {/* Main Content Area */}
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.mainContentGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column */}
          <div className={styles.leftColumn}>
            <motion.div
              variants={sectionVariants}
              className={styles.flowchartCard}
              style={{ flex: '0.25' }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Схема загрузки датасета в MongoDB</h3>
              </div>
              <div className={styles.flowchartContainer}>
                <Flowchart initialNodes={initialMongoNodes} initialEdges={initialMongoEdges} />
              </div>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              className={styles.flowchartCard}
              style={{ flex: '0.75' }}
            >
                <div className={styles.cardHeaderAlt}>
                    <h3 className={styles.cardTitle}>Этап 3: Замещение реальными данными</h3>
                </div>
                <div className={styles.flowchartContainer}>
                    <DetailedMongoDbFlow stepsToShow={['3']} />
                </div>
            </motion.div>
          </div>
          
          {/* Right Column */}
          <motion.div variants={sectionVariants} className={styles.detailsContainerWrapper}>
            <DetailedMongoDbFlow stepsToShow={['1', '2', '4']} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export const DataPreparationSlide = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}>
    <_DataPreparationSlide />
  </div>
)); 