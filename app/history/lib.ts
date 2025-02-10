import "server-only";

import type { Pokemon } from "@/types/db";

export const groupPokemonsByDate = (
  pokemons: Pokemon[],
  dateKey: keyof Pokemon
) => {
  // 実装日が設定されたポケモンのみをフィルタリングし、年・月・日ごとにグループ化
  const groupedPokemons = pokemons
    .filter((pokemon) => pokemon[dateKey])
    .reduce<Record<string, Record<string, Record<string, Pokemon[]>>>>(
      (yearGroups, pokemon) => {
        const implementedDate = pokemon[dateKey] as string;
        const [year, month, day] = [
          implementedDate.slice(0, 4),
          implementedDate.slice(0, 7),
          implementedDate.slice(0, 10),
        ];

        // 年・月・日ごとのオブジェクトを初期化
        yearGroups[year] = yearGroups[year] || {};
        yearGroups[year][month] = yearGroups[year][month] || {};
        yearGroups[year][month][day] = yearGroups[year][month][day] || [];

        // 対応する日にポケモンを追加
        yearGroups[year][month][day].push(pokemon);
        return yearGroups;
      },
      {}
    );

  return groupedPokemons;
};

export const countPokemonsInDays = (days: Record<string, Pokemon[]>) => {
  // 各日のポケモンのリストをフラットにし、全体数をカウント
  const totalCount = Object.values(days).flat().length;

  return totalCount;
};

export const countPokemonsByRegion = (
  pokemons: Pokemon[],
  year: string,
  dateKey: keyof Pokemon
) => {
  // 指定した年までに実装されたポケモンをフィルタリング
  // 年の途中の場合はその日までに実装されたポケモンをフィルタリング
  const filteredPokemons = pokemons.filter((pokemon) => {
    const endOfYear = new Date(`${year}-12-31`);
    const today = new Date();

    const endDate = today < endOfYear ? today : endOfYear;

    return pokemon[dateKey] && new Date(pokemon[dateKey] as string) <= endDate;
  });

  // 各地域ごとのポケモンの数をカウント
  const regionCountMap = new Map<string, number>();
  filteredPokemons.forEach((pokemon) => {
    const currentCount = regionCountMap.get(pokemon.region) || 0;
    regionCountMap.set(pokemon.region, currentCount + 1);
  });

  return regionCountMap;
};
