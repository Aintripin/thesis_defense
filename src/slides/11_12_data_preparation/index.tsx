import React from 'react';
import { useLocation } from 'react-router-dom';
import { DataPreparationSlide as MongoPostgresSlide } from './11_data_preparation/DataPreparationSlide';
import { DataPreparationSlide as CassandraSlide } from './12_data_preparation/DataPreparationSlide';

export const DataPreparationSlides: React.FC<{ subSlide: number }> = ({ subSlide }) => {
  if (subSlide === 1) {
    return <CassandraSlide />;
  }
  return <MongoPostgresSlide />;
};

export default DataPreparationSlides; 