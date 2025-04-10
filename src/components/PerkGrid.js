import React, { useEffect, useState } from 'react';

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_FuVOyJgwaHzl4Oq7IMOk_j2PEnsuz_2Bru6WURcPDy0VOq_rst5a1zaHzCPP7u1I0S798oO2XJHp/pub?output=csv";

export default function PerkGrid() {
  const [perks, setPerks] = useState([]);
  const [search, setSearch] = useState('');
  const [slots, setSlots] = useState([null, null, null, null]);

  useEffect(() => {
    fetch(SHEET_CSV_URL)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          return {
            name: values[1],
            tab: values[2],
            group: values[3],
            imageUrl: values[5],
            filename: values[0],
          };
        }).filter(row => row.tab === "Perks");
        setPerks(data);
      });
  }, []);

  const filtered = perks.filter(p => p.name?.toLowerCase().includes(search.toLowerCase()));

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
            key={perk.filename}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify(perk))}
            className="p-2 bg-gray-700 rounded cursor-move flex flex-col items-center"
          >
            <img
              src={perk.imageUrl}
              alt={perk.name}
              referrerPolicy="no-referrer"
              className="w-[256px] h-[256px] mb-1 object-contain"
            />
            <span className="text-sm text-center">{perk.name}</span>
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
            className="h-[270px] bg-gray-800 rounded flex items-center justify-center"
          >
            {slot ? (
              <div className="text-center">
                <img
                  src={slot.imageUrl}
                  alt={slot.name}
                  referrerPolicy="no-referrer"
                  className="w-[256px] h-[256px] mx-auto mb-1 object-contain"
                />
                <p className="text-sm">{slot.name}</p>
                <button onClick={() => removePerk(idx)} className="text-xs text-red-400 mt-1">Remove</button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Drop perk here</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
