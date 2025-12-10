import { viewPetsService } from "@/services/Pet/viewPetsService";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import type { GetAllPetsResponse } from "@/types/Pet/serviceTypes";


export default function Dashboard() {
  const { data, isLoading, error } = useQuery<GetAllPetsResponse>({
    queryKey: ["pets"],
    queryFn: () => {return viewPetsService()},
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading pets</p>;

  const pets = data?.data; // ⭐ THIS is your Pet[] array

  return (
    <div>
      {pets?.map((pet) => (
        <div key={pet.id}>
          <h3>{pet.name}</h3>
          <img src={pet.pictureLink} width={80} />
        </div>
      ))}
    </div>
  );
}
