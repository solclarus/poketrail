import "server-only";

import { createClient } from "@/lib/supabase/server";
import { cache } from "react";

export const getPokemon = cache(async (id: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pokemons")
    .select()
    .eq("id", id)
    .single();

  if (error) console.error(error);

  return data;
});

export const getPokemonFormDetail = cache(async (id: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}`);
  const data = await response.json();

  const pokemon = getPokemonDetail(data.pokemon.url);

  return pokemon;
});

const getPokemonDetail = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  const { height, weight } = data;
  const image = data.sprites.front_default;

  return { height, weight, types: data.types, image };
};

type SearchParams = {
  implementedDate?: string;
  regions?: string;
  shapes?: string;
  isImplemented?: string;
  isDefault?: string;
  sort?: string;
  order?: "asc" | "desc";
  indexMin?: string;
  indexMax?: string;
  implementedDateStart?: string;
  implementedDateEnd?: string;
};

export const getPokemons = cache(async (params: SearchParams = {}) => {
  const supabase = await createClient();

  let query = supabase.from("pokemons").select();

  if (params.regions) {
    const regions = params.regions.split(",").map((r) => r.trim());
    query = query.in("region", regions);
  }

  if (params.shapes) {
    const shapes = params.shapes.split(",").map((r) => r.trim());
    query = query.in("form", shapes);
  }

  // 実装済か否か
  if (params.isImplemented === "true" || params.isImplemented === "false") {
    const isImplemented = params.isImplemented === "true";
    query = isImplemented
      ? query.not("implemented_date", "is", null)
      : query.is("implemented_date", null);
  }

  // デフォルトか否か
  if (params.isDefault === "true" || params.isDefault === "false") {
    const isDefault = params.isDefault === "true";
    query = isDefault
      ? query.eq("is_default", true)
      : query.eq("is_default", false);
  }

  if (params.isDefault) {
    query = query.eq("is_default", params.isDefault);
  }

  if (params.indexMin) {
    query = query.gte('index', parseInt(params.indexMin));
  }
  if (params.indexMax) {
    query = query.lte('index', parseInt(params.indexMax));
  }

  // 実装日の範囲指定
  if (params.implementedDateStart) {
    query = query.gte('implemented_date', params.implementedDateStart);
  }
  if (params.implementedDateEnd) {
    // 終了日は23:59:59まで含める
    query = query.lte('implemented_date', `${params.implementedDateEnd}T23:59:59`);
  }

  if (params.sort) {
    query = query.order(params.sort, { ascending: params.order === "asc" });
  }

  const { data, error } = await query
    .order("index", { ascending: true })
    .order("id", { ascending: true });

  if (error) console.error(error);

  return data;
});
