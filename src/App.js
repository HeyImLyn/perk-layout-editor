import React, { useState } from 'react';
import PerkGrid from './components/PerkGrid';

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Perk Layout Editor</h1>
      <PerkGrid />
    </div>
  );
}

export default App;
