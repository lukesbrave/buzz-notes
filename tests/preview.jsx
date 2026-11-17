import React from 'react';
import {createRoot} from 'react-dom/client';
import {apply} from '../dist/plugin.js';
apply({react:React,pages:{register:page=>createRoot(document.getElementById('root')).render(<page.component/>)}});
