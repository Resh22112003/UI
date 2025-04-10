import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Form from './Form.jsx';
import DataTable from './DataTable.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/table" element={<DataTable />} />
    </Routes>
  );
}

export default App;
