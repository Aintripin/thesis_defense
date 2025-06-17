import React from 'react';
import ReactFlow, { useNodesState, useEdgesState, MarkerType, type Node, type Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './DataPreparationSlide.module.scss';

const MappingNode = () => (
    <div className={styles.greenNode} style={{ width: 200 }}>
        <strong>Маппинг полей</strong>
        <ul className={styles.mappingList}>
            <li><code>doc["title"] → field0</code></li>
            <li><code>doc["authors"] → field1</code></li>
            <li><code>doc["venue.raw"] → field2</code></li>
            <li><code>doc["year"] → field3</code></li>
            <li><code>doc["n_citation"] → field4</code></li>
        </ul>
    </div>
);

const nodeTypes = { mapping: MappingNode };

const initialStep3Nodes: Node[] = [
    { id: '3-1', data: { label: 'START' }, position: { x: 250, y: 20 }, className: `${styles.greenNode} ${styles.oval}` },
    { id: '3-2', data: { label: 'Итерация по документам в dblp' }, position: { x: 175, y: 100 }, className: styles.greenNode },
    { id: '3-3', data: { label: 'Генерация YCSB-ключа' }, position: { x: 175, y: 180 }, className: styles.greenNode },
    { id: '3-4', type: 'mapping', data: {}, position: { x: 150, y: 260 } },
    { id: '3-5', data: { label: 'Обновление записи в usertable' }, position: { x: 175, y: 430 }, className: styles.greenNode },
    { id: '3-6', data: { label: 'END' }, position: { x: 250, y: 510 }, className: `${styles.greenNode} ${styles.oval}` },
];
  
const initialStep3Edges: Edge[] = [
    { id: 'e3-1-2', source: '3-1', target: '3-2', markerEnd: { type: MarkerType.ArrowClosed, color: '#28a745' }, style: { stroke: '#28a745' } },
    { id: 'e3-2-3', source: '3-2', target: '3-3', markerEnd: { type: MarkerType.ArrowClosed, color: '#28a745' }, style: { stroke: '#28a745' } },
    { id: 'e3-3-4', source: '3-3', target: '3-4', markerEnd: { type: MarkerType.ArrowClosed, color: '#28a745' }, style: { stroke: '#28a745' } },
    { id: 'e3-4-5', source: '3-4', target: '3-5', markerEnd: { type: MarkerType.ArrowClosed, color: '#28a745' }, style: { stroke: '#28a745' } },
    { id: 'e3-5-6', source: '3-5', target: '3-6', markerEnd: { type: MarkerType.ArrowClosed, color: '#28a745' }, style: { stroke: '#28a745' } },
];

export const Step3Flowchart = () => {
    const [nodes, , onNodesChange] = useNodesState(initialStep3Nodes);
    const [edges, , onEdgesChange] = useEdgesState(initialStep3Edges);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
        >
        </ReactFlow>
    );
} 