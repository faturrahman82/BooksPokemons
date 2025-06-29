"use client";

type Props = {
  nameFilter: string;
  onNameChange: (val: string) => void;
  typeFilter: string;
  onTypeChange: (val: string) => void;
  evolutionFilter: string;
  onEvolutionChange: (val: string) => void;
  onReset: () => void;
};

const POKEMON_TYPES = [
  "all",
  "fire",
  "water",
  "grass",
  "electric",
  "bug",
  "normal",
  "poison",
  "ground",
  "fairy",
  "psychic",
  "rock",
  "fighting",
  "ghost",
];

const EVOLUTION_OPTIONS = [
  { value: "all", label: "Semua Evolusi" },
  { value: "basic", label: "Basic" },
  { value: "middle", label: "Middle" },
  { value: "final", label: "Final" },
];

export default function FilterBar({
  nameFilter,
  onNameChange,
  typeFilter,
  onTypeChange,
  evolutionFilter,
  onEvolutionChange,
  onReset,
}: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:flex-row lg:items-center mb-4 sm:mb-6 lg:mb-8">
      <input
        type="text"
        placeholder="Cari nama Pokémon..."
        value={nameFilter}
        onChange={(e) => onNameChange(e.target.value.toLowerCase())}
        className="w-full md:w-full lg:w-1/3 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition duration-200 placeholder:text-gray-500 text-xs sm:text-sm md:text-base text-gray-800"
      />
      <select
        value={typeFilter}
        onChange={(e) => onTypeChange(e.target.value)}
        className="w-full md:w-full lg:w-1/3 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition duration-200 text-xs sm:text-sm md:text-base text-gray-800"
      >
        {POKEMON_TYPES.map((type) => (
          <option key={type} value={type}>
            {type === "all" ? "Semua Tipe" : type.toUpperCase()}
          </option>
        ))}
      </select>
      <select
        value={evolutionFilter}
        onChange={(e) => onEvolutionChange(e.target.value)}
        className="w-full md:w-full lg:w-1/3 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition duration-200 text-xs sm:text-sm md:text-base text-gray-800"
      >
        {EVOLUTION_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        onClick={onReset}
        className="w-full md:w-full lg:w-auto px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-md border border-gray-300  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm transition duration-200 text-xs sm:text-sm md:text-base text-gray-800"
      >
        Reset
      </button>
    </div>
  );
}