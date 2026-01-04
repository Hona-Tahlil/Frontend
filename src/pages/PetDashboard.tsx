import { viewPetsService } from "@/services/Pet/viewPetsService";
import { useQuery } from "@tanstack/react-query";
import type { GetAllPetsResponse } from "@/types/Pet/serviceTypes";
import DashboardPetCard from "@/components/Pet/DashboardPetCard";
import AddPetCard from "@/components/Pet/AddPetCard";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { PETS_QUERY_KEY } from "@/queryKeys/pets";
import { ageYearsMonths } from "@/utils/getYearMonthFromDate";
import LoadingPetCard from "@/components/Pet/LoadingPetCard";
import useUserStore from "@/store/userStore/userStore";
import OwnerDashboardSidebar from "@/components/Dashboard/OwnerDashboardSidebar";

export default function Dashboard() {
  const isMobile = useMobile();
  const {accessToken} = useUserStore();
  const { data, isLoading, error } = useQuery<GetAllPetsResponse>({
    queryKey: PETS_QUERY_KEY,
    queryFn: () => {
      return viewPetsService();
    },
    staleTime: 1000 * 60,
  });

  if (error) return <p>Error loading pets</p>;

  const pets = data?.data;

  console.log(accessToken);
  return (
    <div className="flex w-screen items-start justify-start px-8 gap-10">
      {!isMobile && <OwnerDashboardSidebar activeItem="pets" />}
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 grid mt-20 rtl px-10 space-y-6 w-full mb-6">
        <h1 className="col-span-full text-right text-2xl font-semibold text-[#2f2a28]">
          پت ها
        </h1>
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => <LoadingPetCard key={i} />)
        ) : (
          <>
            {pets?.map((pet) => (
              <DashboardPetCard
                key={pet.id}
                pet={{
                  id: pet.id,
                  kind: pet.kind,
                  species: pet.species,
                  isAdult: pet.isAdult,
                  name: pet.name,
                  gender: pet.gender,
                  pictureLink: pet.pictureLink,
                  age: ageYearsMonths(pet.birthDate),
                }}
              />
            ))}
            <AddPetCard/>
          </>
        )}
      </div>
    </div>
  );
}
