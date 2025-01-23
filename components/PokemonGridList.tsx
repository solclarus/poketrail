import { Pokemon } from "@/types/db";
import { GridCard } from "./GridCard";

export const PokemonGridList = ({ pokemons }: { pokemons: Pokemon[] }) => {
  return (
    <div className="grid-list">
      {pokemons.map((pokemon: Pokemon) => {
        return <GridCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </div>
  );
};
