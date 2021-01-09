import React from 'react';
import { Navigate } from 'react-router-dom';

import { InputTestPage } from '@pages/InputTestPage';

export const routes = [
  {
    path: '/inputs',
    element: <InputTestPage />,
  },
  {
    path: '*',
    element: <Navigate to="/inputs" />,
  },
];
