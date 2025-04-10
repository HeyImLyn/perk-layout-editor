import React, { useState } from 'react';

const perks = [
  { id: '1', name: 'Sprint Burst' },
  { id: '2', name: 'Dead Hard' },
  { id: '3', name: 'Borrowed Time' },
  { id: '4', name: 'Iron Will' },
  { id: '5', name: 'Kindred' },
];

export default function PerkGrid() {
  const [search, setSearch] = useState('');
  const [slots, setSlots] = useState([null, null, null, null]);

  const filtered = perks.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleDrop = (index, perk) => {
    if (!slots[index]) {
      const newSlots = [...slots];
      newSlots[index] = perk;
      setSlots(newSlots);
    }
  };

  const removePerk = (index) => {
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search perks..."
        className="mb-4 p-2 text-black"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-5 gap-2 mb-6">
        {filtered.map(perk => (
          <div
            key={perk.id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(perk))}
            className="p-2 bg-gray-700 rounded cursor-move"
          >
            {perk.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {slots.map((slot, idx) => (
          <div
            key={idx}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const data = JSON.parse(e.dataTransfer.getData('text/plain'));
              handleDrop(idx, data);
            }}
            className="h-24 bg-gray-800 rounded flex items-center justify-center"
          >
            {slot ? (
              <div className="text-center">
                <p>{slot.name}</p>
                <button onClick={() => removePerk(idx)} className="text-sm text-red-400 mt-2">Remove</button>
              </div>
            ) : (
              <p className="text-gray-500">Drop perk here</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
