import React from 'react';
import { SharedDatasetSlideLayout } from './_SharedDatasetSlideLayout';

export const DatasetSlides: React.FC<{ subSlide: number }> = ({ subSlide }) => {
  return <SharedDatasetSlideLayout subSlide={subSlide} />;
}; 