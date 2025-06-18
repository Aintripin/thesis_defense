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
import { useTheme } from '../../contexts/ThemeContext';
import styles from './DataPreparationSlide.module.scss';
import { DetailedPostgresDbFlow } from './DetailedPostgresDbFlow.tsx';
import { SlideHeading } from '../../components/SlideHeading';

interface CustomNodeData {
  num: string;
  label: React.ReactNode;
}

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const initialPostgresNodes: Node<CustomNodeData>[] = [
    { id: 'pg-0', position: { x: -350, y: 220 }, data: { num: 'O', label: <>предварительный<br/>анализ структуры</> }, type: 'custom' },
    { id: 'pg-1', position: { x: -20, y: -80 }, data: { num: '1', label: <>создание первичной<br/>таблицы <span className={styles.flowchartHighlight}>A</span> с колонками<br/><span className={styles.flowchartHighlight}>_id</span> и <span className={styles.flowchartHighlight}>data</span> (JSONB)</> }, type: 'custom' },
    { id: 'pg-2', position: { x: 50, y: 350 }, data: { num: '2', label: <>создание таблицы <span className={styles.flowchartHighlight}>B</span><br/>через YCSB</> }, type: 'custom' },
    { id: 'pg-3', position: { x: 350, y: 100}, data: { num: '3', label: <>создание таблицы <span className={styles.flowchartHighlight}>C</span> со<br/>структурированными<br/>колонками</> }, type: 'custom' },
    { id: 'pg-4', position: { x: 550, y: -50 }, data: { num: '4', label: <>импорт данных<br/>из mongoDB</> }, type: 'custom' },
    { id: 'pg-5', position: { x: 900, y: 100 }, data: { num: '5', label: <>парсинг данных и<br/>заполнение<br/>таблицы <span className={styles.flowchartHighlight}>C</span></> }, type: 'custom' },
    { id: 'pg-6', position: { x: 650, y: 350 }, data: { num: '6', label: <>заполнение таблицы<br/><span className={styles.flowchartHighlight}>B</span> реальными<br/>данными</> }, type: 'custom' },
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
    />
  );
};

export const _DataPreparationSlide = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.dataPreparationSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <SlideHeading size="small">Стратегии подготовки данных PostgreSQL</SlideHeading>
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.mainContentGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.leftColumn}>
            <motion.div
              variants={sectionVariants}
              className={styles.flowchartCard}
              style={{ height: '50vh', minHeight: '450px' }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Схема загрузки датасета в PostgreSQL</h3>
              </div>
              <div className={styles.flowchartContainer}>
                <Flowchart initialNodes={initialPostgresNodes} initialEdges={initialPostgresEdges} />
              </div>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              className={styles.flowchartCard}
            >
              <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>Этапы 5-6: Трансформация и замещение</h3>
              </div>
              <div className={styles.flowchartContainer} style={{ overflowY: 'auto', padding: '1rem' }}>
                  <DetailedPostgresDbFlow stepsToShow={['5', '6']} />
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={sectionVariants} className={styles.detailsContainerWrapper}>
            <DetailedPostgresDbFlow stepsToShow={['1', '2', '3', '4']} />
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