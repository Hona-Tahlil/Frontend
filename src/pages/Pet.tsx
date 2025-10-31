import React from "react";

import petBg from "@/assets/images/pet-profile-bg.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import petProfile from "@/assets/images/pet-profile.jpg";
import PetInfoCard from "@/components/Pet/PetInfoCard";
import EditableAvatar from "@/components/Custom/Avatar/EditableAvatar";

type PetProps = {
  name: string;
};

export default function Pet({ name = "فندق" }: PetProps) {
  return (
    <div className="flex h-full md:mx-25 lg:mx-35 xl:mx-45 mx-10 my-10 justify-center">
      <aside
        className="sticky top-4 h-full self-start w-[35%] p-2 pb-3 md:p-5 md:pb-6 lg:p-9 lg:pb-10 bg-cover rounded-xl flex flex-col items-center shadow-lg "
        style={{ backgroundImage: `url(${petBg})` }}
      >
        <div className="text-lg md:text-2xl lg:text-4xl font-bold mb-5 md:mb-10 lg:mb-15 mt-2 lg:mt-5">{name}</div>
        {/* <Avatar className="w-[60%] h-[60%] md:w-[100%] md:h-[100%] border-8 border-white">
          <AvatarImage
            className="object-cover"
            src={petProfile}
            loading="lazy"
            decoding="async"
          />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar> */}

        <EditableAvatar className="w-[60%] h-[60%] md:w-full md:h-full border-4 md:border-6 lg:border-8 border-white"/>
      </aside>

      <div className="w-full mr-6 ">
        <PetInfoCard
          name="فندق"
          type="گربه"
          breed="پرشین"
          gender="ماده"
          weight={1.2}
          birthDate="۱۲/۱۲"
          healthStatus="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد."
        />
      </div>
    </div>
  );
}
