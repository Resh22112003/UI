import React, { useEffect, useState } from 'react';
import { fetchFormData } from './api.jsx';
import './DataTable.css';

const TABLE_COLUMNS = ['neid', 'timestamp', 'portname', 'description', 'direction', 'kpis', 'location', 'unit'];

function DataTable() {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetchFormData()
      .then((data) => setJsonData(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const downloadTable = () => {
    if (jsonData.length === 0) return;

    const csvRows = [
      TABLE_COLUMNS.join(','), // Header row
      ...jsonData.map(row =>
        TABLE_COLUMNS.map(col => `"${row[col] || ''}"`).join(',')
      )
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'form-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="json-table-container">
      <h2>Performance Data Table</h2>
      {jsonData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="json-table">
            <thead>
              <tr>
                {TABLE_COLUMNS.map((key) => (
                  <th key={key}>{key.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {TABLE_COLUMNS.map((col, i) => (
                    <td key={i}>{row[col] || ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button className="download-btn" onClick={downloadTable}>
            Download CSV
          </button>
        </>
      )}
    </div>
  );
}


export default DataTable;
