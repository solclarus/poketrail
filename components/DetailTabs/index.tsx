import { getPokemonFormDetail } from "@/app/data/pokemon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Pokemon } from "@/types/db";
import { format } from "date-fns";
import Image from "next/image";

type DetailTabsProps = { pokemon: Pokemon };

// type TypeData = {
//   slot: number;
//   type: { name: string; url: string };
// };

export const DetailTabs = async ({ pokemon }: DetailTabsProps) => {
  const { height, weight, image } = await getPokemonFormDetail(
    pokemon.pokeapi_id
  );
  //   const types = await data.types.map(async (type: TypeData) => {
  //     const res = await fetch(type.type.url);
  //     const typedata = await res.json();
  //     const name = typedata.names[0].name;
  //     return name;
  //   });

  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList>
        <TabsTrigger value="info">基本情報</TabsTrigger>
        <TabsTrigger value="date">実装日</TabsTrigger>
        <TabsTrigger value="form">姿違い</TabsTrigger>
      </TabsList>
      <TabsContent value="info">
        <div className="flex flex-col gap-4">
          {/* {types && <p>タイプ: {types}</p>} */}
          {height && <p>たかさ: {height / 10}m</p>}
          {weight && <p>おもさ: {weight / 10}kg</p>}
        </div>
        <Image src={image} alt={pokemon.name} height={100} width={100}></Image>
      </TabsContent>
      <TabsContent value="date">
        <div>
          <p className="text-muted-foreground">
            {pokemon.implemented_date &&
              format(pokemon.implemented_date, "yyyy年M月d日")}
          </p>
          <p className="text-muted-foreground">
            {pokemon.shiny_implemented_date &&
              format(pokemon.shiny_implemented_date, "yyyy年M月d日")}
          </p>
        </div>
      </TabsContent>
      <TabsContent value="form">別の姿</TabsContent>
    </Tabs>
  );
};
