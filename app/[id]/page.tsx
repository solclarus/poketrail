import { getPokemon } from "@/app/data/pokemon";
import { ImageCard } from "@/components/ImageCard";
import { DetailTabs } from "@/components/DetailTabs";

type DetailPageProps = { params: Promise<{ id: string }> };

export default async function DetailPage({ params }: DetailPageProps) {
  const id = (await params).id;
  const pokemon = await getPokemon(id);

  if (!pokemon) return <div>no content</div>;

  return (
    <div className="mx-auto mt-10 max-w-sm md:max-w-md">
      <div className="w-full">
        <ImageCard pokemon={pokemon} />
      </div>
      <div className="items-center justify-center w-full mt-4">
        <h2 className="text-xl font-bold text-center">{pokemon.name}</h2>
      </div>
      <DetailTabs pokemon={pokemon} />
    </div>
  );
}
