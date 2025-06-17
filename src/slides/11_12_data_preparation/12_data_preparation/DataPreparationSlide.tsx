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
import { Database, GitBranch, Terminal } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import styles from './DataPreparationSlide.module.scss';
import { PostgresDbDetails } from './PostgresDbDetails';

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

const initialPostgresNodes: Node<CustomNodeData>[] = [
    { id: 'pg-0', position: { x: -350, y: 220 }, data: { num: 'O', label: <>предварительный<br/>анализ структуры</> }, type: 'custom' },
    { id: 'pg-1', position: { x: -20, y: -150 }, data: { num: '1', label: <>создание первичной<br/>таблицы <span className="flowchartHighlight">A</span> с колонками<br/><span className="flowchartHighlight">_id</span> и <span className="flowchartHighlight">data</span> (JSONB)</> }, type: 'custom' },
    { id: 'pg-2', position: { x: 50, y: 450 }, data: { num: '2', label: <>создание таблицы <span className="flowchartHighlight">B</span><br/>через YCSB</> }, type: 'custom' },
    { id: 'pg-3', position: { x: 250, y: 150}, data: { num: '3', label: <>создание таблицы <span className="flowchartHighlight">C</span> со<br/>структурированными<br/>колонками</> }, type: 'custom' },
    { id: 'pg-4', position: { x: 650, y: -100 }, data: { num: '4', label: <>импорт данных<br/>из mongoDB</> }, type: 'custom' },
    { id: 'pg-5', position: { x: 900, y: 100 }, data: { num: '5', label: <>парсинг данных и<br/>заполнение<br/>таблицы <span className="flowchartHighlight">C</span></> }, type: 'custom' },
    { id: 'pg-6', position: { x: 650, y: 450 }, data: { num: '6', label: <>заполнение таблицы<br/><span className="flowchartHighlight">B</span> реальными<br/>данными</> }, type: 'custom' },
];

const initialPostgresEdges: Edge[] = [
    { id: 'e-p-0-1', source: 'pg-0', target: 'pg-1', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-0-2', source: 'pg-0', target: 'pg-2', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
    { id: 'e-p-1-3', source: 'pg-1', target: 'pg-3', type: 'smoothstep', markerEnd: darkGreyMarker, style: { strokeWidth: 3, stroke: '#343a40' } },
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

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <motion.div variants={sectionVariants} className={styles.detailStep} style={{height: 'auto', display: 'flex', flexDirection: 'column', padding: 0, border: 'none', background: 'transparent'}}>
        <h4 className={styles.stepTitle} style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>{title}</h4>
        <div className={styles.stepDescription} style={{flexGrow: 1, display: 'flex', flexDirection: 'column', fontSize: '1.15rem', gap: '0.25rem', lineHeight: 1.4}}>
            {children}
        </div>
    </motion.div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
    <div className={styles.codeBlock} style={{flexGrow: 1, marginTop: '0.5rem'}}>
        <Terminal size={18} className={styles.codeIcon} />
        <pre style={{ fontSize: '1rem' }}>{children}</pre>
    </div>
);

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
              color: #343a40 !importan
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
              font-size: 40px !important;
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
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className={styles.slideTitle}>
          Стратегии подготовки данных
        </h2>
      </motion.div>

      {/* Main Content Area */}
      <div className={styles.contentContainer}>
        <motion.div
          className={styles.mainContentGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* PostgreSQL Section */}
          <motion.div variants={sectionVariants} className={styles.leftColumn}>
            <motion.div className={styles.flowchartCard} style={{flex: '0.6'}}>
              <div className={styles.cardHeader}>
                <Database size={24} className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>Схема загрузки датасета в PostgreSQL</h3>
              </div>
              <div className={styles.flowchartContainer}>
                <Flowchart initialNodes={initialPostgresNodes} initialEdges={initialPostgresEdges} />
              </div>
            </motion.div>
            <motion.div className={styles.flowchartCard} style={{flex: '0.4'}}>
                <div className={styles.flowchartContainer} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem'}}>
                    <Section title="Этап 5: Трансформация в реляционную структуру">
                        <Code>
                            {`INSERT INTO publications_structured (id, title, year, authors, abstract)
SELECT _id, data->>'title', (data->>'year')::integer, ...
FROM publications;`}
                        </Code>
                        <p className={styles.subheading} style={{marginTop: '0.5rem'}}>Результат:</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            <li>Извлечение данных из JSONB в типизированные колонки</li>
                            <li>Преобразование документной модели в реляционную</li>
                        </ul>
                    </Section>
                    <div style={{borderBottom: '1px solid #e0e0e0', margin: '0.25rem 0'}}></div>
                     <Section title="Этап 6: Замещение синтетических данных реальными">
                        <Code>
                            {`UPDATE usertable SET field0 = p.title, field1 = p.authors::text
FROM (SELECT ROW_NUMBER() OVER () as rn, * FROM publications_structured) p
WHERE usertable.ycsb_key = 'user' || (p.rn - 1);`}
                        </Code>
                        <p className={styles.subheading} style={{marginTop: '0.5rem'}}>Финальная структура:</p>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                            <li>Таблица <code>usertable</code> с реальными данными</li>
                            <li>YCSB-совместимые ключи (<code>user0...</code>)</li>
                        </ul>
                    </Section>
                </div>
            </motion.div>
          </motion.div>
          
          <motion.div variants={sectionVariants} className={styles.detailsContainerWrapper}>
            <PostgresDbDetails />
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
