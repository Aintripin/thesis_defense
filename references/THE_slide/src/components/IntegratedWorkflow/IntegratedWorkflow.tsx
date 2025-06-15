import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Text, Circle, Line, Arrow, Group, Path } from 'react-konva';
import { motion } from 'framer-motion';
import { 
  FileText, Database, Play, BarChart3, RefreshCw, RotateCcw, 
  Zap, Users, Clock 
} from 'lucide-react';
import styles from './IntegratedWorkflow.module.scss';

const IntegratedWorkflow: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const stageRef = useRef<any>(null);

  // State for draggable positions
  const [positions, setPositions] = useState({
    dataPrep: { x: 20, y: 60 },
    workflow: { x: 0, y: 0 }, // Will be calculated based on dimensions
    workloads: { x: 0, y: 0 }, // Will be calculated based on dimensions
    metrics: { x: 0, y: 60 },
    stats: { x: 0, y: 0 }
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update positions based on dimensions
  useEffect(() => {
    setPositions(prev => ({
      ...prev,
      workflow: { x: dimensions.width * 0.25, y: dimensions.height * 0.25 },
      workloads: { x: dimensions.width * 0.05, y: dimensions.height * 0.5 },
      metrics: { x: dimensions.width - 320, y: 60 },
      stats: { x: dimensions.width - 320, y: dimensions.height - 200 }
    }));
  }, [dimensions]);

  const databases = [
    { name: 'PostgreSQL', process: 'JSONB→Tables', color: '#336791', x: 80, y: 120 },
    { name: 'MongoDB', process: 'Direct Import', color: '#4db33d', x: 80, y: 180 },
    { name: 'Cassandra', process: 'NDJSON→DSBulk', color: '#ff6b35', x: 80, y: 240 }
  ];

  const workflowSteps = [
    { label: 'Cold Start', color: '#64748b', x: dimensions.width * 0.3, y: dimensions.height * 0.3 },
    { label: 'YCSB Load', color: '#3b82f6', x: dimensions.width * 0.4, y: dimensions.height * 0.3 },
    { label: 'YCSB Run', color: '#1e40af', x: dimensions.width * 0.5, y: dimensions.height * 0.3 },
    { label: 'Collect Metrics', color: '#2563eb', x: dimensions.width * 0.6, y: dimensions.height * 0.3 },
    { label: 'Restart', color: '#64748b', x: dimensions.width * 0.7, y: dimensions.height * 0.3 }
  ];

  const workloads = [
    { letter: 'A', name: 'Update Heavy', ops: '50% READ / 50% UPDATE', color: '#3b82f6', x: dimensions.width * 0.15, y: dimensions.height * 0.6 },
    { letter: 'B', name: 'Read Heavy', ops: '95% READ / 5% UPDATE', color: '#1e40af', x: dimensions.width * 0.3, y: dimensions.height * 0.6 },
    { letter: 'C', name: 'Read Only', ops: '100% READ', color: '#2563eb', x: dimensions.width * 0.45, y: dimensions.height * 0.6 },
    { letter: 'D', name: 'Read Latest', ops: '95% READ / 5% INSERT', color: '#1d4ed8', x: dimensions.width * 0.6, y: dimensions.height * 0.6 },
    { letter: 'E', name: 'Scan Heavy', ops: '95% SCAN / 5% INSERT', color: '#60a5fa', x: dimensions.width * 0.75, y: dimensions.height * 0.6 },
    { letter: 'F', name: 'Read-Modify-Write', ops: '50% READ / 50% RMW', color: '#93c5fd', x: dimensions.width * 0.9, y: dimensions.height * 0.6 }
  ];

  const metrics = [
    { category: 'YCSB', items: ['Throughput', 'Avg Latency', 'P95 Latency', 'P99 Latency'], color: '#3b82f6', x: dimensions.width - 280, y: 120 },
    { category: 'System', items: ['CPU Usage', 'Memory', 'Disk I/O', 'Network'], color: '#1e40af', x: dimensions.width - 280, y: 220 },
    { category: 'DB-Specific', items: ['Connections', 'Cache Hit', 'Queries', 'Locks'], color: '#2563eb', x: dimensions.width - 280, y: 320 }
  ];

  // Helper function to create curved arrow path
  const createCurvedArrowPath = (startX: number, startY: number, endX: number, endY: number, curvature: number = 0.3) => {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate control point for curve
    const controlX = midX + (-dy / distance) * curvature * distance;
    const controlY = midY + (dx / distance) * curvature * distance;
    
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  };

  // Handle drag events
  const handleDragEnd = (section: string, e: any) => {
    const newPos = { x: e.target.x(), y: e.target.y() };
    setPositions(prev => ({
      ...prev,
      [section]: newPos
    }));
  };

  return (
    <div className={styles.integratedWorkflow}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Stage width={dimensions.width} height={dimensions.height} ref={stageRef}>
          <Layer>
            {/* Background */}
            <Rect
              x={0}
              y={0}
              width={dimensions.width}
              height={dimensions.height}
              fill="#f8fafc"
            />

            {/* Curved Connection Lines */}
            {/* Data Preparation to Workflow */}
            <Path
              data={createCurvedArrowPath(
                positions.dataPrep.x + 300, 
                positions.dataPrep.y + 150,
                positions.workflow.x, 
                positions.workflow.y + 50,
                0.2
              )}
              stroke="#3b82f6"
              strokeWidth={4}
              fill="none"
              opacity={0.8}
              shadowColor="rgba(59, 130, 246, 0.3)"
              shadowBlur={6}
              shadowOffset={{ x: 0, y: 2 }}
              lineCap="round"
              lineJoin="round"
            />

            {/* Workflow to YCSB Run */}
            <Path
              data={createCurvedArrowPath(
                positions.workflow.x + (dimensions.width * 0.25), 
                positions.workflow.y + 100,
                positions.workloads.x + (dimensions.width * 0.45), 
                positions.workloads.y,
                0.15
              )}
              stroke="#3b82f6"
              strokeWidth={4}
              fill="none"
              opacity={0.8}
              shadowColor="rgba(59, 130, 246, 0.3)"
              shadowBlur={6}
              shadowOffset={{ x: 0, y: 2 }}
              lineCap="round"
              lineJoin="round"
            />

            {/* Workflow to Metrics */}
            <Path
              data={createCurvedArrowPath(
                positions.workflow.x + (dimensions.width * 0.5), 
                positions.workflow.y + 50,
                positions.metrics.x, 
                positions.metrics.y + 150,
                -0.2
              )}
              stroke="#3b82f6"
              strokeWidth={4}
              fill="none"
              opacity={0.8}
              shadowColor="rgba(59, 130, 246, 0.3)"
              shadowBlur={6}
              shadowOffset={{ x: 0, y: 2 }}
              lineCap="round"
              lineJoin="round"
            />

            {/* Data Preparation Section - Draggable */}
            <Group
              x={positions.dataPrep.x}
              y={positions.dataPrep.y}
              draggable
              onDragEnd={(e) => handleDragEnd('dataPrep', e)}
            >
              <Rect
                x={0}
                y={0}
                width={300}
                height={300}
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#3b82f6"
                strokeWidth={2}
                cornerRadius={16}
                shadowColor="rgba(59, 130, 246, 0.2)"
                shadowBlur={10}
                shadowOffset={{ x: 0, y: 4 }}
              />
              
              <Text
                x={20}
                y={20}
                text="Data Preparation"
                fontSize={18}
                fontFamily="Inter, sans-serif"
                fontStyle="bold"
                fill="#1e293b"
              />

              {/* JSON Dataset */}
              <Rect
                x={20}
                y={50}
                width={260}
                height={60}
                fill="white"
                stroke="#e2e8f0"
                strokeWidth={1}
                cornerRadius={12}
                shadowColor="rgba(0, 0, 0, 0.1)"
                shadowBlur={4}
                shadowOffset={{ x: 0, y: 2 }}
              />
              
              <Text
                x={40}
                y={65}
                text="JSON Dataset"
                fontSize={14}
                fontFamily="Inter, sans-serif"
                fontStyle="bold"
                fill="#1e293b"
              />
              
              <Text
                x={40}
                y={85}
                text="12GB • 4.8M records"
                fontSize={12}
                fontFamily="Inter, sans-serif"
                fill="#64748b"
              />

              {/* Database Items */}
              {databases.map((db, index) => (
                <Group key={db.name}>
                  <Rect
                    x={20}
                    y={db.y}
                    width={260}
                    height={50}
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    cornerRadius={10}
                    shadowColor="rgba(0, 0, 0, 0.05)"
                    shadowBlur={4}
                    shadowOffset={{ x: 0, y: 2 }}
                  />
                  
                  <Rect
                    x={20}
                    y={db.y}
                    width={4}
                    height={50}
                    fill={db.color}
                    cornerRadius={2}
                  />
                  
                  <Text
                    x={40}
                    y={db.y + 12}
                    text={db.name}
                    fontSize={13}
                    fontFamily="Inter, sans-serif"
                    fontStyle="bold"
                    fill={db.color}
                  />
                  
                  <Text
                    x={40}
                    y={db.y + 30}
                    text={db.process}
                    fontSize={11}
                    fontFamily="Inter, sans-serif"
                    fill="#64748b"
                  />
                </Group>
              ))}
            </Group>

            {/* Main Workflow Chain - Draggable */}
            <Group
              x={positions.workflow.x}
              y={positions.workflow.y}
              draggable
              onDragEnd={(e) => handleDragEnd('workflow', e)}
            >
              <Rect
                x={0}
                y={0}
                width={dimensions.width * 0.5}
                height={100}
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#3b82f6"
                strokeWidth={3}
                cornerRadius={16}
                shadowColor="rgba(59, 130, 246, 0.3)"
                shadowBlur={15}
                shadowOffset={{ x: 0, y: 8 }}
              />

              {workflowSteps.map((step, index) => (
                <Group key={step.label}>
                  <Rect
                    x={index * (dimensions.width * 0.1) + 20}
                    y={15}
                    width={90}
                    height={70}
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    cornerRadius={12}
                    shadowColor="rgba(0, 0, 0, 0.1)"
                    shadowBlur={6}
                    shadowOffset={{ x: 0, y: 3 }}
                  />
                  
                  <Circle
                    x={index * (dimensions.width * 0.1) + 65}
                    y={40}
                    radius={18}
                    fill={step.color}
                    shadowColor="rgba(0, 0, 0, 0.2)"
                    shadowBlur={4}
                    shadowOffset={{ x: 0, y: 2 }}
                  />
                  
                  <Text
                    x={index * (dimensions.width * 0.1) + 65}
                    y={65}
                    text={step.label}
                    fontSize={11}
                    fontFamily="Inter, sans-serif"
                    fontStyle="bold"
                    fill="#1e293b"
                    align="center"
                    offsetX={step.label.length * 3}
                  />

                  {/* Curved arrows between steps */}
                  {index < workflowSteps.length - 1 && (
                    <Path
                      data={createCurvedArrowPath(
                        index * (dimensions.width * 0.1) + 110,
                        50,
                        (index + 1) * (dimensions.width * 0.1) + 20,
                        50,
                        0.1
                      )}
                      stroke="#3b82f6"
                      strokeWidth={3}
                      fill="none"
                      opacity={0.8}
                      lineCap="round"
                      lineJoin="round"
                    />
                  )}
                </Group>
              ))}
            </Group>

            {/* YCSB Workloads Section - Draggable */}
            <Group
              x={positions.workloads.x}
              y={positions.workloads.y}
              draggable
              onDragEnd={(e) => handleDragEnd('workloads', e)}
            >
              <Rect
                x={0}
                y={0}
                width={dimensions.width * 0.9}
                height={200}
                fill="rgba(255, 255, 255, 0.8)"
                stroke="#3b82f6"
                strokeWidth={1}
                cornerRadius={16}
                shadowColor="rgba(59, 130, 246, 0.15)"
                shadowBlur={8}
                shadowOffset={{ x: 0, y: 4 }}
              />
              
              <Text
                x={30}
                y={25}
                text="YCSB Run"
                fontSize={18}
                fontFamily="Inter, sans-serif"
                fontStyle="bold"
                fill="#1e293b"
              />

              {workloads.map((workload, index) => (
                <Group key={workload.letter} draggable>
                  <Rect
                    x={index * 140 + 40}
                    y={60}
                    width={120}
                    height={80}
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    cornerRadius={12}
                    shadowColor="rgba(0, 0, 0, 0.08)"
                    shadowBlur={6}
                    shadowOffset={{ x: 0, y: 3 }}
                  />
                  
                  <Rect
                    x={index * 140 + 40}
                    y={60}
                    width={4}
                    height={80}
                    fill={workload.color}
                    cornerRadius={2}
                  />
                  
                  <Circle
                    x={index * 140 + 65}
                    y={85}
                    radius={20}
                    fill={workload.color}
                    shadowColor="rgba(0, 0, 0, 0.2)"
                    shadowBlur={4}
                    shadowOffset={{ x: 0, y: 2 }}
                  />
                  
                  <Text
                    x={index * 140 + 65}
                    y={85}
                    text={workload.letter}
                    fontSize={16}
                    fontFamily="Inter, sans-serif"
                    fontStyle="bold"
                    fill="white"
                    align="center"
                    offsetX={4}
                    offsetY={6}
                  />
                  
                  <Text
                    x={index * 140 + 90}
                    y={75}
                    text={workload.name}
                    fontSize={12}
                    fontFamily="Inter, sans-serif"
                    fontStyle="bold"
                    fill="#1e293b"
                  />
                  
                  <Text
                    x={index * 140 + 90}
                    y={95}
                    text={workload.ops}
                    fontSize={10}
                    fontFamily="Inter, sans-serif"
                    fill="#64748b"
                  />
                </Group>
              ))}

              {/* Thread Levels */}
              <Text
                x={30}
                y={170}
                text="Thread Levels: 4, 8, 16, 32, 64, 128, 256"
                fontSize={14}
                fontFamily="Inter, sans-serif"
                fill="#64748b"
              />
            </Group>

            {/* Metrics Collection Section - Draggable */}
            <Group
              x={positions.metrics.x}
              y={positions.metrics.y}
              draggable
              onDragEnd={(e) => handleDragEnd('metrics', e)}
            >
              <Rect
                x={0}
                y={0}
                width={300}
                height={300}
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#3b82f6"
                strokeWidth={2}
                cornerRadius={16}
                shadowColor="rgba(59, 130, 246, 0.2)"
                shadowBlur={10}
                shadowOffset={{ x: 0, y: 4 }}
              />
              
              <Text
                x={20}
                y={20}
                text="Metrics Collection"
                fontSize={18}
                fontFamily="Inter, sans-serif"
                fontStyle="bold"
                fill="#1e293b"
              />

              {metrics.map((metric, index) => (
                <Group key={metric.category}>
                  <Rect
                    x={20}
                    y={60 + index * 100}
                    width={260}
                    height={80}
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    cornerRadius={12}
                    shadowColor="rgba(0, 0, 0, 0.05)"
                    shadowBlur={4}
                    shadowOffset={{ x: 0, y: 2 }}
                  />
                  
                  <Rect
                    x={20}
                    y={60 + index * 100}
                    width={4}
                    height={80}
                    fill={metric.color}
                    cornerRadius={2}
                  />
                  
                  <Text
                    x={40}
                    y={75 + index * 100}
                    text={metric.category}
                    fontSize={14}
                    fontFamily="Inter, sans-serif"
                    fontStyle="bold"
                    fill={metric.color}
                  />
                  
                  {metric.items.map((item, itemIndex) => (
                    <Text
                      key={item}
                      x={40}
                      y={95 + index * 100 + itemIndex * 12}
                      text={`• ${item}`}
                      fontSize={11}
                      fontFamily="Inter, sans-serif"
                      fill="#64748b"
                    />
                  ))}
                </Group>
              ))}
            </Group>

            {/* Statistics Panel - Draggable */}
            <Group
              x={positions.stats.x}
              y={positions.stats.y}
              draggable
              onDragEnd={(e) => handleDragEnd('stats', e)}
            >
              <Rect
                x={0}
                y={0}
                width={300}
                height={180}
                fill="rgba(255, 255, 255, 0.9)"
                stroke="#3b82f6"
                strokeWidth={2}
                cornerRadius={16}
                shadowColor="rgba(59, 130, 246, 0.2)"
                shadowBlur={10}
                shadowOffset={{ x: 0, y: 4 }}
              />
              
              <Text
                x={20}
                y={20}
                text="Testing Statistics"
                fontSize={16}
                fontFamily="Inter, sans-serif"
                fontStyle="bold"
                fill="#1e293b"
              />

              {[
                { value: '3', label: 'Databases', x: 20, y: 50 },
                { value: '6', label: 'Workloads', x: 80, y: 50 },
                { value: '7', label: 'Thread Levels', x: 140, y: 50 },
                { value: '126', label: 'Total Tests', x: 200, y: 50 },
                { value: '189', label: 'Hours', x: 260, y: 50 }
              ].map((stat, index) => (
                <Group key={stat.label}>
                  <Rect
                    x={stat.x - 15}
                    y={stat.y - 15}
                    width={50}
                    height={60}
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth={1}
                    cornerRadius={8}
                    shadowColor="rgba(0, 0, 0, 0.05)"
                    shadowBlur={3}
                    shadowOffset={{ x: 0, y: 1 }}
                  />
                  
                  <Text
                    x={stat.x + 10}
                    y={stat.y}
                    text={stat.value}
                    fontSize={18}
                    fontFamily="Inter, sans-serif"
                    fontStyle="bold"
                    fill="#1e293b"
                    align="center"
                    offsetX={stat.value.length * 5}
                  />
                  
                  <Text
                    x={stat.x + 10}
                    y={stat.y + 25}
                    text={stat.label}
                    fontSize={10}
                    fontFamily="Inter, sans-serif"
                    fill="#64748b"
                    align="center"
                    offsetX={stat.label.length * 2.5}
                  />
                </Group>
              ))}

              <Text
                x={150}
                y={140}
                text="3 × 6 × 7 = 126 tests"
                fontSize={12}
                fontFamily="Inter, sans-serif"
                fill="#64748b"
                align="center"
                offsetX={80}
              />
            </Group>
          </Layer>
        </Stage>
      </motion.div>
    </div>
  );
};

export default IntegratedWorkflow; 