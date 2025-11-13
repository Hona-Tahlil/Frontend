import React from "react";

import petBg from "@/assets/images/pet-profile-bg.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import petProfile from "@/assets/images/pet-profile.jpg";
import PetInfoCard from "@/components/Pet/PetInfoCard";
import EditableAvatar from "@/components/Custom/Avatar/EditableAvatar";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { Redo, Redo2 } from "lucide-react";

type PetProps = {
  name: string;
};

export default function Pet({ name = "فندق" }: PetProps) {
  const isMobile = useMobile();
  return (
    <div className="flex flex-col justify-center items-center w-full h-full mb-5 overflow-x-clip">
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
            <EditableAvatar className="border-white border-6 -mt-[60%]"></EditableAvatar>
            <p className="text-lg mt-2 font-bold">فندق</p>
          </div>
        </div>
      )}

      <div className="flex h-full md:mx-25 lg:mx-35 xl:mx-45 mx-10 justify-center">
        {!isMobile && (
          <aside
            className="sticky top-4 h-full self-start w-[35%] p-2 pb-3 md:p-5 md:pb-6 lg:p-9 lg:pb-10 bg-cover rounded-xl flex flex-col items-center shadow-lg "
            style={{ backgroundImage: `url(${petBg})` }}
          >
            <div className="text-lg md:text-2xl lg:text-4xl font-bold mb-5 md:mb-10 lg:mb-15 mt-2 lg:mt-5">
              {name}
            </div>
            {/* <Avatar className="w-[60%] h-[60%] md:w-[100%] md:h-[100%] border-8 border-white">
          <AvatarImage
            className="object-cover"
            src={petProfile}
            loading="lazy" f
            decoding="async"
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar> */}

            <EditableAvatar className="w-[60%] h-[60%] md:w-full md:h-full border-4 md:border-6 lg:border-8 border-white" />
          </aside>
        )}

        <div className="w-full sm:mr-6 ">
          <PetInfoCard
            name="امیر مربا"
            type="گربه"
            breed="پرشین"
            gender="ماده"
            weight={1.2}
            birthDate="۱۲/۱۲"
            healthStatus="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
          />
        </div>
      </div>
    </div>
  );
}
