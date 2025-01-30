import type { Pokemon } from "@/types";
import { useEffect, useState } from "react";

const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon-form/";
const POKEMINERS_URL = "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/Addressable%20Assets";

export const usePokemonImage = (pokemon: Pokemon, isShiny: boolean = false) => { 
    const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!pokemon) return;

      try {
        if (pokemon.asset_id) {
          const shinySuffix = isShiny ? ".s" : "";
          setImageUrl(`${POKEMINERS_URL}/${pokemon.asset_id}${shinySuffix}.icon.png`);
          return;
        }

        const response = await fetch(`${POKEAPI_URL}${pokemon.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for Pokemon ID: ${pokemon.id}`);
        }

        const data = await response.json();
        setImageUrl(
          isShiny
            ? data.sprites.front_shiny
            : data.sprites.front_default || null
        );
      } catch (error) {
        console.error("Error fetching Pokemon image:", error);
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [pokemon, isShiny]);

  return imageUrl;
 };