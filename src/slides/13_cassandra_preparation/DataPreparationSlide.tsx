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
import { DetailedCassandraDbFlow } from './DetailedCassandraDbFlow.tsx';
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

const initialCassandraNodes: Node<CustomNodeData>[] = [
  { id: 'cassandra-0', position: { x: 0, y: 50 }, data: { num: 'O', label: <>предварительный<br/>анализ<br/>структуры</> }, type: 'custom' },
  { id: 'cassandra-1', position: { x: 300, y: -100 }, data: { num: '1', label: <>JSON → NDJSON</> }, type: 'custom' },
  { id: 'cassandra-2', position: { x: 750, y: -150 }, data: { num: '2', label: <>NDJSON<br/>flattening</> }, type: 'custom' },
  { id: 'cassandra-3', position: { x: 680, y: 30 }, data: { num: '3', label: <>создание таблицы <span className="flowchartHighlight">A</span> со<br/>структурированными<br/>колонками</> }, type: 'custom' },
  { id: 'cassandra-4', position: { x: 1260, y: -150 }, data: { num: '4', label: <>заполнение таблицы<br/><span className="flowchartHighlight">A</span> реальными<br/>данными<br/>через DSBulk</> }, type: 'custom' },
  { id: 'cassandra-5', position: { x: 300, y: 300 }, data: { num: '5', label: <>создание таблицы <span className="flowchartHighlight">B</span><br/>через YCSB</> }, type: 'custom' },
  { id: 'cassandra-6', position: { x: 1250, y: 250 }, data: { num: '6', label: <>заполнение таблицы<br/><span className="flowchartHighlight">B</span> реальными<br/>данными</> }, type: 'custom' },
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
      <SlideHeading size="small">Подготовка данных для Cassandra</SlideHeading>
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
              style={{ height: '50vh', minHeight: '400px' }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Общая схема подготовки</h3>
              </div>
              <div className={styles.flowchartContainer}>
                <Flowchart initialNodes={initialCassandraNodes} initialEdges={initialCassandraEdges} />
              </div>
            </motion.div>
            <motion.div
              variants={sectionVariants}
              className={styles.flowchartCard}
            >
              <div className={styles.flowchartContainer} style={{ overflowY: 'auto', padding: '1rem' }}>
                  <DetailedCassandraDbFlow stepsToShow={['4', '5']} />
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={sectionVariants} className={styles.detailsContainerWrapper}>
            <DetailedCassandraDbFlow stepsToShow={['1', '2', '3']} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export const DataPreparationSlide = forwardRef<HTMLDivElement>((_props, ref) => (
  <div ref={ref}>
    <_DataPreparationSlide />
  </div>
)); 