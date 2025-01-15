"use client";

import { Pokemon } from "@/types/db";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { ImageCard } from "@/components/ImageCard";

export const GridCard = ({
  pokemon,
  isShiny = false,
}: {
  pokemon: Pokemon;
  isShiny?: boolean;
}) => {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger>
        <ImageCard pokemon={pokemon} isShiny={isShiny} />
      </PopoverTrigger>
      <PopoverContent
        className="w-full cursor-pointer"
        onClick={() => router.push(`/${pokemon.id}`)}
      >
        <div className="text-center">
          <p className="font-bold">{pokemon.name}</p>
          <p className="text-sm text-muted-foreground">No. {pokemon.index}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
