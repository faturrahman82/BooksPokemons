"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useMemo, useEffect } from "react";
import {
  fetchPokemons,
  fetchAllPokemonsInBackground,
  Pokemon,
} from "./lib/api";
import PokemonCard from "./components/PokemonCard";
import FilterBar from "./components/FilterBar";
import SkeletonCard from "./components/SkeletonCard";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function HomePage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["pokemons"],
      queryFn: ({ pageParam = 0 }) => fetchPokemons(Number(pageParam), 20),
      getNextPageParam: (_last, allPages) => allPages.length,
      initialPageParam: 0,
    });

  const [selectedType, setSelectedType] = useState("all");
  const [searchName, setSearchName] = useState("");
  const [evolutionFilter, setEvolutionFilter] = useState("all");

  const [allData, setAllData] = useState<Pokemon[] | null>(null);
  const [isFullLoading, setIsFullLoading] = useState(true);

  
  useEffect(() => {
    fetchAllPokemonsInBackground()
      .then((res) => setAllData(res))
      .finally(() => setIsFullLoading(false));
  }, []);


  const filteredPokemons = useMemo(() => {
    const source = allData ?? data?.pages.flat() ?? [];

    return source.filter((p) => {
      const matchType =
        selectedType === "all" || p.types.includes(selectedType);
      const matchName = p.name.toLowerCase().includes(searchName);
      const matchEvolution =
        evolutionFilter === "all" || p.evolutionStage === evolutionFilter;
      return matchType && matchName && matchEvolution;
    });
  }, [data, allData, selectedType, searchName, evolutionFilter]);

  const handleResetFilter = () => {
    setSelectedType("all");
    setSearchName("");
    setEvolutionFilter("all");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-sky-200 via-yellow-100 to-sky-50 overflow-x-hidden">
      <div
        className="absolute inset-0 bg-[radial-gradient(#cce3ff_1px,transparent_1px)] 
        [background-size:24px_24px] opacity-30 z-0"
      />
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        <h1
          className="text-4xl sm:text-5xl font-black text-yellow-400 text-center mb-8 
             drop-shadow-[4px_4px_0px_rgba(59,130,246,1)]"
        >
          Pokémon Explorer
        </h1>

        <FilterBar
          nameFilter={searchName}
          onNameChange={setSearchName}
          typeFilter={selectedType}
          onTypeChange={setSelectedType}
          evolutionFilter={evolutionFilter}
          onEvolutionChange={setEvolutionFilter}
          onReset={handleResetFilter}
        />

        {isLoading || (allData === null && isFullLoading) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredPokemons.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 9.75h.008v.008H9.75V9.75zm4.5 0h.008v.008h-.008V9.75zM6.75 15.75c.75-1.5 2.25-2.25 4.5-2.25s3.75.75 4.5 2.25M12 3.75a8.25 8.25 0 110 16.5 8.25 8.25 0 010-16.5z"
              />
            </svg>
            <p className="text-lg font-semibold">Pokémon tidak ditemukan</p>
            <p className="text-sm text-gray-400">
              Coba filter lain atau periksa ejaannya.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
              {filteredPokemons.map((p) => (
                <PokemonCard key={p.name} pokemon={p} />
              ))}
            </div>

            {!allData && hasNextPage && (
              <div className="text-center mt-6">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded"
                >
                  {isFetchingNextPage ? "Loading more..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <ScrollToTopButton />
    </div>
  );
}
