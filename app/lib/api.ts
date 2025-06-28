export interface Attack {
  name: string;
  description: string;
  damage: string;
  category: string; // physical, special, status
}

export interface Pokemon {
  name: string;
  image: string;
  hp: number;
  types: string[];
  attacks: Attack[];
  weakness: string;
  resistance: string;
  retreat: number;
  evolutionStage: 'basic' | 'middle' | 'final';
}

export async function fetchPokemons(page = 0, limit = 20): Promise<Pokemon[]> {
  const offset = page * limit;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await res.json();

  const results: Pokemon[] = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const detail = await fetch(pokemon.url).then((res) => res.json());
      const species = await fetch(detail.species.url).then((res) => res.json());
      const evoChain = await fetch(species.evolution_chain.url).then((res) => res.json());

      const evolutionStage = getEvolutionStage(detail.name, evoChain.chain);

      const attackDetails = await Promise.all(
        detail.moves.slice(0, 2).map(async (moveObj: any) => {
          const moveRes = await fetch(moveObj.move.url).then((res) => res.json());
          return {
            name: moveRes.name,
            description:
              moveRes.effect_entries?.find((e: any) => e.language.name === 'en')?.short_effect || 'No description',
            damage: moveRes.power !== null ? `${moveRes.power}` : '—',
            category: moveRes.damage_class?.name || 'unknown',
          };
        })
      );

      return {
        name: detail.name,
        image: detail.sprites.other['official-artwork'].front_default,
        hp: detail.stats[0].base_stat,
        types: detail.types.map((t: any) => t.type.name),
        attacks: attackDetails,
        weakness: 'Fighting',
        resistance: 'None',
        retreat: 1,
        evolutionStage,
      };
    })
  );

  return results;
}


function getEvolutionStage(name: string, chain: any): 'basic' | 'middle' | 'final' {
  const flatChain = flattenEvolutionChain(chain);
  const index = flatChain.findIndex((n) => n === name);
  if (index === 0) return 'basic';
  if (index === flatChain.length - 1) return 'final';
  return 'middle';
}

function flattenEvolutionChain(chain: any): string[] {
  const names = [chain.species.name];
  let current = chain;
  while (current.evolves_to?.length > 0) {
    current = current.evolves_to[0];
    names.push(current.species.name);
  }
  return names;
}
