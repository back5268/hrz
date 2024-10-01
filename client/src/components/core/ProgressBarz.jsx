import { ProgressBar } from 'primereact/progressbar';
import React from 'react';

export const ProgressBarz = ({ value = 50 }) => {
  return <ProgressBar value={value}></ProgressBar>;
};
