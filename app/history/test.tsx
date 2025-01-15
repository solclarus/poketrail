import { GridCard } from "@/components/GridCard";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pokemon } from "@/types/db";
import { countPokemonsInDays, groupPokemonsByDate } from "@/app/data/pokemon";
import { format } from "date-fns";

export function GroupedSection({
  pokemons,
  dateKey,
  isShiny = false,
}: {
  pokemons: Pokemon[];
  dateKey: keyof Pokemon;
  isShiny?: boolean;
}) {
  const groupedPokemons = groupPokemonsByDate(pokemons, dateKey);

  if (!groupedPokemons) return;

  return Object.entries(groupedPokemons)
    .sort(([yearA], [yearB]) => (yearA > yearB ? -1 : 1))
    .map(([year, months]) => {
      return (
        <div key={year} className="space-y-6">
          <div className="sticky top-20 z-10 flex items-start py-4">
            <h3 className="text-2xl font-bold sticky top-20 z-10 hidden md:block">
              {year}
            </h3>
            <div className="flex-1">
              {Object.entries(months)
                .sort(([monthA], [monthB]) => (monthA > monthB ? -1 : 1))
                .map(([month, days]) => (
                  <div key={month} className="space-y-4">
                    <Popover>
                      <PopoverTrigger className="sticky top-20 z-10">
                        <div className="text-2xl font-bold flex">
                          <h3 className="md:hidden">{format(month, "yyyy")}</h3>
                          <h3 className="text-orange-500">
                            {format(month, "MM")}
                          </h3>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>{countPokemonsInDays(days)}</PopoverContent>
                    </Popover>
                    {Object.entries(days)
                      .sort(([dayA], [dayB]) => (dayA > dayB ? -1 : 1))
                      .map(([day, pokemons]) => {
                        return (
                          <div key={day} className="py-3">
                            <div className="grid-list">
                              {pokemons.map((pokemon) => (
                                <GridCard
                                  key={pokemon.id}
                                  pokemon={pokemon}
                                  isShiny={isShiny}
                                />
                              ))}
                            </div>
                            <div className="flex mt-3 text-muted-foreground">
                              {format(day, "MMM do")}
                              <p className="ml-1 text-green-400">
                                +{pokemons.length}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    });
}
