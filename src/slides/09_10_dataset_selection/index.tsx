import React from 'react';
import { SharedDatasetSlideLayout } from './_SharedDatasetSlideLayout';
// Note: We will need a Slide10 component later.
// For now, the layout will render the correct content based on subSlide prop.

export const DatasetSlides: React.FC<{ subSlide: number }> = ({ subSlide }) => {
  return <SharedDatasetSlideLayout subSlide={subSlide} />;
}; 