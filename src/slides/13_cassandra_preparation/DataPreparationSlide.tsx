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
import { Database, Terminal } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './DataPreparationSlide.module.scss';
import { CassandraDbDetails } from './CassandraDbDetails';

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
    <Handle type="target" position={Position.Left} style={{ background: '#343a40', border: '2px solid #343a40' }} />
    <Handle type="source" position={Position.Right} style={{ background: '#343a40', border: '2px solid #343a40' }} />
    <div className={styles.flowchartBox}>{data.label}<div className={styles.boxNumber}>{data.num}</div></div>
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
  { id: 'c-0', position: { x: 0, y: 50 }, data: { num: 'O', label: <>предварительный<br/>анализ<br/>структуры</> }, type: 'custom' },
  { id: 'c-1', position: { x: 300, y: -50 }, data: { num: '1', label: <>JSON → NDJSON</> }, type: 'custom' },
  { id: 'c-2', position: { x: 650, y: -100 }, data: { num: '2', label: <>NDJSON<br/>flattening</> }, type: 'custom' },
  { id: 'c-3', position: { x: 680, y: 90 }, data: { num: '3', label: <>создание таблицы <span className="flowchartHighlight">A</span></> }, type: 'custom' },
  { id: 'c-4', position: { x: 1260, y: -50 }, data: { num: '4', label: <>заполнение<br/>через DSBulk</> }, type: 'custom' },
  { id: 'c-5', position: { x: 300, y: 250 }, data: { num: '5', label: <>создание таблицы <span className="flowchartHighlight">B</span><br/>через YCSB</> }, type: 'custom' },
  { id: 'c-6', position: { x: 1100, y: 350 }, data: { num: '6', label: <>заполнение<br/>таблицы <span className="flowchartHighlight">B</span></> }, type: 'custom' },
];

const initialCassandraEdges: Edge[] = [
  { id: 'e-c-0-1', source: 'c-0', target: 'c-1', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-1-2', source: 'c-1', target: 'c-2', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-0-3', source: 'c-0', target: 'c-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-2-4', source: 'c-2', target: 'c-4', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-3-4', source: 'c-3', target: 'c-4', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-0-5', source: 'c-0', target: 'c-5', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-5-6', source: 'c-5', target: 'c-6', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
  { id: 'e-c-4-6', source: 'c-4', target: 'c-6', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
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
      nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
      onConnect={onConnect} nodeTypes={nodeTypes} fitView proOptions={{ hideAttribution: true }}
      panOnDrag={false} zoomOnScroll={false} zoomOnPinch={false}
      zoomOnDoubleClick={false} nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
    />
  );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <motion.div variants={sectionVariants} className={styles.detailStep} style={{height: 'auto', display: 'flex', flexDirection: 'column', padding: 0, border: 'none', background: 'transparent'}}>
        <h4 className={styles.stepTitle} style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>{title}</h4>
        <div className={styles.stepDescription} style={{flexGrow: 1, display: 'flex', flexDirection: 'column', fontSize: '1.15rem', gap: '0.25rem', lineHeight: 1.4}}>
            {children}
        </div>
    </motion.div>
);

const Code = ({ children, lang = 'bash' }: { children: React.ReactNode, lang?: string }) => (
    <div className={styles.codeBlock} style={{flexGrow: 1, marginTop: '0.5rem'}}>
        <Terminal size={18} className={styles.codeIcon} />
        <pre style={{ fontSize: '1rem' }}><code className={`language-${lang}`}>{children}</code></pre>
    </div>
);

export const _DataPreparationSlide = () => {
  const { isPrintTheme } = useTheme();

  return (
    <div className={`${styles.dataPreparationSlide} ${isPrintTheme ? styles.printTheme : ''}`}>
      <style dangerouslySetInnerHTML={{ __html: `
            .react-flow__edge-path, .react-flow__arrowhead, marker * {
              stroke: #343a40 !important; fill: #343a40 !important; stroke-width: 3px !important;
            }
            .flowchartHighlight {
              background: ${isPrintTheme ? '#000' : '#4285f4'} !important;
              color: ${isPrintTheme ? '#fff' : '#ffffff'} !important;
              padding: 4px 8px !important; border-radius: 6px !important;
              font-weight: 700 !important; font-size: 40px !important;
            }`
        }} />

      <motion.div className={styles.slideTitleContainer} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <h2 className={styles.slideTitle}>Стратегии подготовки данных</h2>
      </motion.div>

      <div className={styles.contentContainer}>
        <motion.div className={styles.mainContentGrid} variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={sectionVariants} className={styles.leftColumn}>
            <motion.div className={styles.flowchartCard} style={{flex: '0.6'}}>
              <div className={styles.cardHeader}>
                <Database size={24} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Схема загрузки датасета в Cassandra</h3>
              </div>
              <div className={styles.flowchartContainer}>
                <Flowchart initialNodes={initialCassandraNodes} initialEdges={initialCassandraEdges} />
              </div>
            </motion.div>
            <motion.div className={styles.flowchartCard} style={{flex: '0.4'}}>
                <div className={styles.flowchartContainer} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem'}}>
                    <Section title="Этап 2: Выравнивание структуры данных">
                        <p>Python-скрипт <code>flatten_data.py</code>:</p>
                        <Code lang="python">
                            {`# Преобразование вложенной структуры в плоскую
def flatten_record(record):
  flat_record["venue_raw"] = record["venue"]["raw"]
  flat_record["authors"] = json.dumps(record["authors"])`}
                        </Code>
                    </Section>
                    <div style={{borderBottom: '1px solid #e0e0e0', margin: '0.25rem 0'}}></div>
                     <Section title="Этап 3: Массовая загрузка через DSBulk">
                        <p>CQL-команда создания таблицы:</p>
                        <Code lang="sql">
                            {`CREATE TABLE ycsb.papers_full (
    id text PRIMARY KEY, title text, 
    authors text, year int, ...
);`}
                        </Code>
                    </Section>
                </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={sectionVariants} className={styles.detailsContainerWrapper}>
            <CassandraDbDetails />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export const DataPreparationSlide = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}><_DataPreparationSlide /></div>
));