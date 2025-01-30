"use client";

import { usePokemonImage } from "@/hooks";
import type { Pokemon } from "@/types/db";
import Image from "next/image";

export const ImageCard = ({
  pokemon,
  isShiny = false,
}: {
  pokemon: Pokemon;
  isShiny?: boolean;
}) => {
  const imageUrl = usePokemonImage(pokemon, isShiny);

  return (
    <div className={"aspect-square grid place-items-center p-4"}>
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
