import { viewPetsService } from "@/services/Pet/viewPetsService";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useQuery } from "@tanstack/react-query";
import type { GetAllPetsResponse } from "@/types/Pet/serviceTypes";
import DashboardPetCard from "@/components/Pet/DashboardPetCard";

const GENDER_MAP = [
    "Male", "Female", "DontKnow"
]

export default function Dashboard() {
  const { data, isLoading, error } = useQuery<GetAllPetsResponse>({
    queryKey: ["pets"],
    queryFn: () => {return viewPetsService()},
    staleTime: 1000 * 60,
  });

  

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading pets</p>;

  const pets = data?.data; 

  return (
    <div className="grid-cols-3 grid mx-10 mt-20 rtl">
      {pets?.map((pet) => (

        
        <DashboardPetCard  key={pet.id} id={pet.id} kind="جونده" species="خرگوش" isAdult={true} name={pet.name} gender={GENDER_MAP[pet.gender] } pictureLink={pet.pictureLink}></DashboardPetCard>
      ))}
    </div>
  );
}
