import { Pokemon } from "@/types/db";
import { GridCard } from "./GridCard";

export const PokemonGridList = ({ pokemons }: { pokemons: Pokemon[] }) => {
  if (pokemons.length === 0) {
    return (
      <div className="border rounded-lg backdrop-blur-sm p-6">
        NO CONTENT
      </div>
    );
  }

  return (
    <div className="grid-list">
      {pokemons.map((pokemon: Pokemon) => {
        return <GridCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
};
