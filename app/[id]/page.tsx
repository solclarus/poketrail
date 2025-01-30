import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPokemon } from "@/app/data/pokemon";
import { ImageCard } from "@/components/ImageCard";
import { format } from "date-fns";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">基本情報</TabsTrigger>
          <TabsTrigger value="date">実装日</TabsTrigger>
          <TabsTrigger value="form">姿違い</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <p className="text-lg">{`全国図鑑番号: ${pokemon.index}`}</p>
        </TabsContent>
        <TabsContent value="date">
          <div>
            <p className="text-muted-foreground">
              {format(pokemon.implemented_date, "yyyy年M月d日")}
            </p>
            <p className="text-muted-foreground">
              {pokemon.shiny_implemented_date &&
                format(pokemon.shiny_implemented_date, "yyyy年M月d日")}
            </p>
          </div>
        </TabsContent>
        <TabsContent value="form">別の姿</TabsContent>
      </Tabs>
    </div>
  );
}
