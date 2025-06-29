import Image from "next/image";
import { Pokemon } from "../lib/api";

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const mainType = pokemon.types[0];
  const bgColor = typeColors[mainType] || "#e2e8f0";

  return (
    <div
      className="group rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem] lg:max-w-[30rem] mx-auto"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="text-white text-center py-1.5 sm:py-2 md:py-2.5"
        style={{
          backgroundColor: darkenColor(bgColor, 0.2), 
        }}
      >
        <h2 className="text-base sm:text-lg md:text-xl font-bold capitalize">{pokemon.name}</h2>
        <span className="text-xs sm:text-sm md:text-base">HP {pokemon.hp}</span>
      </div>

      <div className="p-3 sm:p-4 md:p-5">
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={144}
          height={144}
          className="mx-auto group-hover:scale-110 transition-transform duration-300 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-1.5 text-xs sm:text-sm md:text-base font-medium rounded-full text-white shadow-sm"
            style={{ backgroundColor: typeColors[type] || "#777" }}
          >
            {type.toUpperCase()}
          </span>
        ))}
      </div>

      <div className="bg-white bg-opacity-70 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-3 text-xs sm:text-sm md:text-base text-black">
        {pokemon.attacks.map((attack, idx) => (
          <div key={idx} className="mb-1.5 sm:mb-2 md:mb-3 bg-white bg-opacity-80 p-1.5 sm:p-2 md:p-3 rounded-md">
            <p className="font-semibold capitalize">{attack.name}</p>
            <p className="text-xs sm:text-sm italic text-gray-600">{attack.description}</p>
            <p className="text-xs sm:text-sm">Damage: {attack.damage}</p>
            <p className="text-xs sm:text-sm capitalize">Category: {attack.category}</p>
          </div>
        ))}
      </div>

      <div className="bg-white bg-opacity-70 text-xs sm:text-sm md:text-base text-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-3 text-black">
        <p>Stage: {pokemon.evolutionStage}</p>
        <p>Weakness: {pokemon.weakness}</p>
        <p>Resistance: {pokemon.resistance}</p>
        <p>Retreat: {pokemon.retreat}</p>
      </div>
    </div>
  );
}

const typeColors: Record<string, string> = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  ground: "#E0C068",
  fairy: "#EE99AC",
  psychic: "#F85888",
  rock: "#B8A038",
  fighting: "#C03028",
  ghost: "#705898",
};

function darkenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent * -100);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 0 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}