import { getPokemons } from "@/app/data/pokemon";
import { GroupedSection } from "./test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SheetDemo } from "@/components/SheetDemo";
import { FilterPopover } from "@/components/FilterPopover";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HistoryPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const pokemons = await getPokemons(searchParams);

  if (!pokemons) return <div>no content</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 mt-10">
      <FilterPopover />
      <SheetDemo />
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
  );
}
