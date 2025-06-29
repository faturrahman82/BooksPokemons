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
    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 lg:mb-8">
      {POKEMON_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition-colors duration-200
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