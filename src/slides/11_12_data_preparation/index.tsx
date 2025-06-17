import React from 'react';
import { useLocation } from 'react-router-dom';
import { DataPreparationSlide as MongoDbSlide } from './11_data_preparation';
import { DataPreparationSlide as PostgresDbSlide } from './12_data_preparation';
import { DataPreparationSlide as CassandraDbSlide } from '../13_cassandra_preparation';

export const DataPreparationSlides: React.FC = () => {
  const location = useLocation();

  if (location.pathname.includes('postgresql')) {
    return <PostgresDbSlide />;
  }
  
  if (location.pathname.includes('cassandra')) {
    return <CassandraDbSlide />;
  }

  return <MongoDbSlide />;
};

export default DataPreparationSlides; 