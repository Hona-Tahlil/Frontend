import React, { useState } from "react";

import petBg from "@/assets/images/pet-profile-bg.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import petProfile from "@/assets/images/pet-profile.jpg";
import PetInfoCard from "@/components/Pet/PetInfoCard";
import EditableAvatar from "@/components/Custom/Avatar/EditableAvatar";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Redo, Redo2 } from "lucide-react";
import { Formik } from "formik";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPetByIdService,
  updatePetInfoByIdService,
} from "@/services/Pet/petService";
import CustomToast from "@/components/Custom/CustomToast";
import type { UpdatePetInfoResponse } from "@/types/Pet/petServiceTypes";
import type { AxiosError } from "axios";

type ApiError = {
  statusCode: number;
  message: string;
  data: null;
};

export default function Pet() {
  const isMobile = useMobile();
  const { petId } = useParams<{ petId: string }>();
  console.log("heyyyyyyyy   dsfjlakfdlkj     ", petId);

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pet", petId],
    queryFn: () => {
      if (!petId || isNaN(Number(petId))) {
        throw new Error("Invalid pet ID");
      }
      console.log("got pet!!");
      return getPetByIdService(Number(petId));
    },
  });

  const queryClient = useQueryClient();

  const updatePetMutation = useMutation({
    mutationFn: updatePetInfoByIdService,
    onSuccess: (response) => {
      console.log("success", response);
      queryClient.invalidateQueries({ queryKey: ["pet", petId] });
      setEditMode(false);
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error.response?.data?.message)
        CustomToast(error.response?.data?.message);
      else CustomToast("خطایی در ویرایش اطلاعت رخ داد.");
    },
  });

  const KIND_MAP: Record<number, string> = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
  };

  const GENDER_MAP: Record<number, string> = {
    1: "1",
    2: "2",
    3: "3",
  };

  const showToast = (message: string) => {
    CustomToast(message);
  };

  if (isLoading) return <p>Loading...</p>;
  else if (error) return <p>Error</p>;
  else {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full mb-5 overflow-x-clip">
        <Formik
          initialValues={{
            kind: KIND_MAP[data!.data.kind],
            species: data!.data.species.toString(),
            gender: GENDER_MAP[data!.data.gender],
            ...(({ kind, species, gender, ...rest }) => rest)(data!.data),
          }}
          onSubmit={(values) => {
            console.log("hereeeee");
            const formData = new FormData();
            formData.append("id", String(petId));
            formData.append("name", values.name);
            formData.append("kind", values.kind);
            formData.append("species", values.species);
            formData.append("gender", values.gender);

            if (values.aboutPet) {
              formData.append("aboutPet", values.aboutPet);
            }
            if (values.birthDate) {
              formData.append("birthDate", values.birthDate);
            }

            if (values.pictureLink) {
              formData.append("petprof", values.pictureLink);
            }

            if (values.weight) {
              formData.append("weight", String(values.weight));
            }

            updatePetMutation.mutate(formData);
          }}
        >
          {({ submitForm }) => (
            <Form>
              {isMobile && (
                <div
                  dir="rtl"
                  className="relative flex flex-col items-center w-full  pb-6 "
                >
                  <div
                    className=" aspect-square rounded-full w-[160%] -mt-[110%]"
                    style={{ backgroundImage: `url(${petBg})` }}
                  >
                    <div
                      onClick={() => {
                        navigate("/dashboard/pets");
                      }}
                      className=" p-2 bg-primary-100 aspect-square rounded-full absolute top-6 right-10 text-lg font-semibold flex items-center gap-2 text-gray-800"
                    >
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
                    <p className="text-lg mt-2 font-bold">{data!.data.name}</p>
                  </div>
                </div>
              )}

              <div className="flex h-full md:mx-25 lg:mx-35 xl:mx-45 mx-4 justify-center">
                {!isMobile && (
                  <aside
                    className="sticky top-20 h-full self-start w-[35%] p-2 pb-3 md:p-5 md:pb-6 lg:p-9 lg:pb-10 bg-cover rounded-xl flex flex-col items-center shadow-lg "
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
                    id={data!.data.id}
                    isAdult={data!.data.isAdult ?? null}
                    name={data!.data.name}
                    kind={data!.data.kind}
                    species={data!.data.species}
                    gender={
                      data!.data.gender == 1
                        ? "نر"
                        : data!.data.gender == 2
                        ? "ماده"
                        : "نمی‌دونم"
                    }
                    weight={data!.data.weight}
                    birthDate={data!.data.birthDate}
                    aboutPet={data!.data.aboutPet}
                    onSubmit={submitForm}
                    editingMode={editMode}
                    setEditingMode={setEditMode}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
