import { viewPetsService } from "@/services/Pet/viewPetsService";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import type { GetAllPetsResponse } from "@/types/Pet/serviceTypes";
import DashboardPetCard from "@/components/Pet/DashboardPetCard";
import AddPetCard from "@/components/Pet/AddPetCard";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { PETS_QUERY_KEY } from "@/queryKeys/pets";



const GENDER_MAP = ["Male", "Female", "DontKnow"];

export default function Dashboard() {
  const isMobile = useMobile();
  const { data, isLoading, error } = useQuery<GetAllPetsResponse>({
    queryKey: PETS_QUERY_KEY,
    queryFn: () => {
      return viewPetsService();
    },
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading pets</p>;

  const pets = data?.data;

  return (

    <div className="flex justify-center items-center w-screen ml-5">
      {!isMobile && <aside className="sticky w-2/5 bg-white h-40"></aside>}
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-x-6 grid mt-20 rtl px-6 space-y-6 w-full mb-6">
        {pets?.map((pet) => (
          <DashboardPetCard
            key={pet.id}
            id={pet.id}
            kind={pet.kind}
            species={pet.species}
            isAdult={pet.isAdult}
            name={pet.name}
            gender={pet.gender}
            pictureLink={pet.pictureLink}
            age={pet.birthDate}
          />
        ))}
        <AddPetCard ></AddPetCard>
      </div>
    </div>
  );
}
