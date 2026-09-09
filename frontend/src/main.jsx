/**
 * @fileoverview Application entry point mounting the React root component tree.
 */

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './app-routes';
import './index.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);