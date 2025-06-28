'use client';
type Props = {
  selectedType: string;
  onChange: (type: string) => void;
};

const POKEMON_TYPES = [
  'all', 'fire', 'water', 'grass', 'electric', 'bug', 'normal',
  'poison', 'ground', 'fairy', 'psychic', 'rock', 'fighting', 'ghost'
];

export default function TypeFilter({ selectedType, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition
            ${selectedType === type
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
