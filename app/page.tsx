import { GridCard } from "@/components/GridCard";
import { getPokemons } from "./data/pokemon";
import { Pokemon } from "@/types/db";
import { FilterPopover } from "@/components/FilterPopover";
import { SortPopover } from "@/components/SortPopover";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const pokemons = await getPokemons(searchParams);

  if (!pokemons) return <div>no content</div>;

  return (
    <main className="px-4 mt-10">
      <div className="my-4 flex gap-1">
        <FilterPopover />
        <SortPopover />
      </div>
      <div className="grid-list">
        {pokemons.map((pokemon: Pokemon) => {
          return <GridCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
    </main>
  );
}
