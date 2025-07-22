


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const toHeaderLabel = (key) => {
  return key
    .replace(/\[.*?\]/g, '') 
    .replace(/\./g, ' ')     
    .replace(/_/g, ' ')     
    .replace(/\b\w/g, (l) => l.toUpperCase()); 
};

const QueryResults = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!endpoint) return;

    setLoading(true);
    axios.get(`http://localhost:5000/api/query/${endpoint}`)
      .then(res => {
        const result = Array.isArray(res.data) ? res.data : [res.data];
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [endpoint]);

 
  const flatten = (obj, prefix = '') => {
    let result = {};
    for (let key in obj) {
      const value = obj[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (typeof v === 'object') {
            Object.assign(result, flatten(v, fullKey));
          } else {
            result[fullKey] = JSON.stringify(value);
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        Object.assign(result, flatten(value, fullKey));
      } else {
        result[fullKey] = value;
      }
    }
    return result;
  };

  const renderTable = () => {
    if (!Array.isArray(data) || data.length === 0) {
      return <div className="text-gray-600">No data available.</div>;
    }

    const flattenedData = data.map(item => flatten(item));
    const allKeys = [...new Set(flattenedData.flatMap(item => Object.keys(item)))];
    const excluded = ['_id', '__v'];
    const columns = allKeys.filter(key => !excluded.includes(key));

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 border font-semibold text-left text-gray-700"
                >
                  {toHeaderLabel(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flattenedData.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 border text-gray-800">
                    {String(row[col] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Query: {toHeaderLabel(endpoint)}
      </h2>
      {loading ? (
        <div className="text-blue-500 font-medium">Loading...</div>
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default QueryResults;
