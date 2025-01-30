import "server-only";

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";
import type { Pokemon } from "@/types/db";

export const getPokemon= cache(async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pokemons")
    .select()
    .eq("id", id)
    .single();

  if (error) console.error(error);

  return data;
});

type SearchParams = {
  implementedDate?: string;
  regions?: string;
  shapes?: string;
  isImplementeds?: string;
  isDefault?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export const getPokemons = cache(async (params: SearchParams = {}) => {
  const supabase = await createClient();

  let query  = supabase
  .from("pokemons")
  .select();

  if(params.regions) {
    const regions = params.regions.split(",").map((r) => r.trim());
    query = query.in("region", regions);
  }
  
  if(params.shapes) {
    const shapes = params.shapes.split(",").map((r) => r.trim());
    query = query.in("form", shapes);
  }
  
  // 実装済か否か
  if(params.isImplementeds === "true" || params.isImplementeds === "false") {
    const isImplemented = params.isImplementeds === "true";
    query = isImplemented ? query.not('implemented_date', 'is', null) : query.is("implemented_date", null);
  }

  // デフォルトか否か
  if(params.isDefault === "true" || params.isDefault === "false") {
    const isDefault = params.isDefault === "true";
    query = isDefault ? query.eq('is_default', true) : query.eq("is_default", false);
  }

  if(params.isDefault) {
    query = query.eq("is_default", params.isDefault);
  }

if(params.sort){
  query = query.order(params.sort, {ascending: params.order === "asc"});
}

  const { data, error } = await query.order("index", { ascending: true}).order("id", { ascending: true});

  if (error) console.error(error);

  return data;
});

export const groupPokemonsByDate = (
  pokemons: Pokemon[],
  dateKey: keyof Pokemon
) => {
  // 実装日が設定されたポケモンのみをフィルタリングし、年・月・日ごとにグループ化
  const groupedPokemons = pokemons
    .filter(
      (pokemon) =>
        pokemon[dateKey] 
    )
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

    return (
      pokemon[dateKey] &&
      new Date(pokemon[dateKey] as string) <= endDate
    );
  });

  // 各地域ごとのポケモンの数をカウント
  const regionCountMap = new Map<string, number>();
  filteredPokemons.forEach((pokemon) => {
    const currentCount = regionCountMap.get(pokemon.region) || 0;
    regionCountMap.set(pokemon.region, currentCount + 1);
  });

  return regionCountMap;
};
