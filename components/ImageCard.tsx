"use client";

import { Pokemon } from "@/types/db";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ImageCard = ({
  pokemon,
  isShiny = false,
}: {
  pokemon: Pokemon;
  isShiny?: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (pokemon.asset_id) {
          setImageUrl(
            `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon%20-%20256x256/Addressable%20Assets/${
              pokemon.asset_id
            }${isShiny ? ".s" : ""}.icon.png`
          );
        } else {
          const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon-form/";
          const response = await fetch(`${POKEAPI_URL}${pokemon.id}`);
          const data = await response.json();
          setImageUrl(
            isShiny
              ? data.sprites.front_shiny
              : data.sprites.front_default || null
          );
        }
      } catch (error) {
        console.error("Failed to fetch image:", error);
        setImageUrl(null);
      }
    };

    fetchImage();
  }, [pokemon, isShiny]);

  return (
    <div
      className={
        "aspect-square border rounded-md grid place-items-center p-4 backdrop-blur-sm"
      }
    >
      {imageUrl ? (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            className="object-contain"
            fill
            unoptimized
          />
        </div>
      ) : (
        <span>NO IMAGE</span>
      )}
    </div>
  );
};
