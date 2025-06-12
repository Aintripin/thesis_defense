import React from 'react';
import { SharedDatasetSlideLayout } from './_SharedDatasetSlideLayout';
import { DatasetSelectionSlide } from './10_dataset_selection';

export const DatasetSlides: React.FC<{ subSlide: number }> = ({ subSlide }) => {
  // Use standalone component for slide 10, shared layout for slide 9
  if (subSlide === 1) {
    return <DatasetSelectionSlide />;
  }
  
  return <SharedDatasetSlideLayout subSlide={subSlide} />;
}; 