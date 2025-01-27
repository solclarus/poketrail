import { getPokemons } from "./data/pokemon";
import { FilterMenu } from "@/components/FilterMenu";
import { SortMenu } from "@/components/SortMenu";
import { PokemonGridList } from "@/components/PokemonGridList";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const pokemons = await getPokemons(searchParams);

  if (!pokemons) return <div>no content</div>;

  return (
    <div className="px-4 mt-10 flex flex-col md:flex-row gap-2">
      <aside className="md:w-64 lg:w-80 flex md:flex-col gap-3 px-3">
        <SortMenu />
        <FilterMenu />
      </aside>
      <main className="flex-1">
        <PokemonGridList pokemons={pokemons} />
      </main>
    </div>
  );
}
