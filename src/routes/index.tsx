import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const Rotas: React.FC = () => (
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/repositories" element={<Repository/>} />
    </Routes>
)

export default Rotas;
