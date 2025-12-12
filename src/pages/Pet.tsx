import React from "react";

import petBg from "@/assets/images/pet-profile-bg.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import petProfile from "@/assets/images/pet-profile.jpg";
import PetInfoCard from "@/components/Pet/PetInfoCard";
import EditableAvatar from "@/components/Custom/Avatar/EditableAvatar";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Redo, Redo2 } from "lucide-react";
import { Formik } from "formik";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPetByIdService } from "@/services/Pet/petService";

export default function Pet() {
  const isMobile = useMobile();
  const { petId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pets"],
    queryFn: () => {
      return getPetByIdService(Number(petId));
    },
  });

  if (isLoading) return <p>Loading...</p>;
  else if (error) return <p>Error</p>;
  else {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full mb-5 overflow-x-clip">
        <Formik
          

          initialValues={data!}
          onSubmit={(values) => console.log(values)}
        ></Formik>
        {isMobile && (
          <div
            dir="rtl"
            className="relative flex flex-col items-center w-full  pb-6 "
          >
            <div
              className=" aspect-square rounded-full w-[160%] -mt-[110%]"
              style={{ backgroundImage: `url(${petBg})` }}
            >
              <div className=" p-2 bg-primary-100 aspect-square rounded-full absolute top-6 right-10 text-lg font-semibold flex items-center gap-2 text-gray-800">
                <span>
                  <Redo2 />
                </span>
              </div>
            </div>

            <div className="w-[30%] h-[30%] flex flex-col justify-center items-center">
              <EditableAvatar
                name="pictureLink"
                className="border-white border-6 -mt-[60%]"
              ></EditableAvatar>
              <p className="text-lg mt-2 font-bold">فندق</p>
            </div>
          </div>
        )}

        <div className="flex h-full md:mx-25 lg:mx-35 xl:mx-45 mx-4 justify-center">
          {!isMobile && (
            <aside
              className="sticky top-4 h-full self-start w-[35%] p-2 pb-3 md:p-5 md:pb-6 lg:p-9 lg:pb-10 bg-cover rounded-xl flex flex-col items-center shadow-lg "
              style={{ backgroundImage: `url(${petBg})` }}
            >
              <div className="text-lg md:text-2xl lg:text-4xl font-bold mb-5 md:mb-10 lg:mb-15 mt-2 lg:mt-5"></div>
              {/* <Avatar className="w-[60%] h-[60%] md:w-[100%] md:h-[100%] border-8 border-white">
          <AvatarImage
            className="object-cover"
            src={petProfile}
            loading="lazy" f
            decoding="async"
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar> */}

              <EditableAvatar
                name="pictureLink"
                className="w-[60%] h-[60%] md:w-full md:h-full border-4 md:border-6 lg:border-8 border-white"
              />
            </aside>
          )}

          <div className="w-full md:mr-6 ">
            <PetInfoCard
              id={data!.id}
              isAdult={data!.isAdult}
              name={data!.name}
              kind={data!.kind}
              species={data!.species}
              gender={data!.gender}
              weight={data!.weight}
              birthDate={data!.birthDate}
              aboutPet={data!.aboutPet}
            />
          </div>
        </div>
      </div>
    );
  }
}
