import React, { useState } from 'react';
import QueryResults from './components/QueryResults';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">MERN Query Dashboard</h1>

      <div className="max-w-md mx-auto mb-6">
        <select
          className="w-full p-2 rounded border border-gray-300"
          onChange={(e) => setQuery(e.target.value)}
        >
          <option value="">-- Select Query --</option>
          <option value="join">1. Join Drug & Item</option>
          <option value="swap-rates">2. Swap Rates</option>
          <option value="second-largest-purchase">3. Second Largest Purchase</option>
          <option value="sum-rates">4. Sum of Rates</option>
          <option value="common">5. Common Data</option>
        </select>
      </div>

      {query && (
        <div className="max-w-6xl mx-auto">
          <QueryResults endpoint={query} />
        </div>
      )}
    </div>
  );
}

export default App;
