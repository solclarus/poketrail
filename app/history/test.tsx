import { GridCard } from "@/components/GridCard";
import { Pokemon } from "@/types/db";
import { groupPokemonsByDate } from "./lib";
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
                    <div className="sticky top-20 z-10 text-2xl font-bold flex">
                      <h3 className="md:hidden">
                        {format(new Date(month), "yyyy")}
                      </h3>
                      <h3 className="text-orange-500">
                        {format(new Date(month), "MM")}
                      </h3>
                    </div>
                    <div className="relative border-l ml-3 border-orange-500">
                      {Object.entries(days)
                        .sort(([dayA], [dayB]) => (dayA > dayB ? -1 : 1))
                        .map(([day, pokemons]) => {
                          return (
                            <div key={day} className="py-3">
                              <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-orange-500 text-orange-500 bg-orange-500"></div>
                              <div className="flex ms-6 mb-3 text-muted-foreground">
                                {format(new Date(day), "MMMM d")}
                                <p className="ml-1 text-green-500">
                                  +{pokemons.length}
                                </p>
                              </div>
                              <div className="ml-6 grid-list ">
                                {pokemons.map((pokemon) => (
                                  <GridCard
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                    isShiny={isShiny}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      );
    });
}
