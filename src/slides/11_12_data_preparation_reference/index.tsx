import React from 'react';
import { Outlet } from 'react-router-dom';
import { DataPreparationSlide as MongoPostgresSlide } from './11_data_preparation/DataPreparationSlide';
import CassandraSlide from './12_data_preparation/DataPreparationSlide';

const DataPreparationLayout: React.FC = () => (
  <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <Outlet />
  </div>
);

export default DataPreparationLayout;

export const DataPreparationSlides: React.FC<{ subSlide: number }> = ({ subSlide }) => {
  if (subSlide === 1) {
    return <CassandraSlide />;
  }
  return <MongoPostgresSlide />;
}; 