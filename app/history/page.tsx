import { getPokemons } from "@/app/data/pokemon";
import { GroupedSection } from "./test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterMenu } from "@/components/FilterMenu";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HistoryPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const pokemons = await getPokemons(searchParams);

  if (!pokemons) return <div>no content</div>;

  return (
    <div className="px-4 mt-10 flex flex-col md:flex-row gap-2">
      <aside className="w-60 flex md:flex-col gap-1">
        <FilterMenu />
      </aside>
      <main>
        <Tabs defaultValue="default" className="w-full">
          <TabsList>
            <TabsTrigger value="default">通常色</TabsTrigger>
            <TabsTrigger value="shiny">色違い</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <GroupedSection pokemons={pokemons} dateKey={"implemented_date"} />
          </TabsContent>
          <TabsContent value="shiny">
            <GroupedSection
              pokemons={pokemons}
              dateKey={"shiny_implemented_date"}
              isShiny
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
