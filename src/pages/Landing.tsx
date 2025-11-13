import Image1 from "@/assets/landing/Image1.png";
import Image2 from "@/assets/landing/Image2.png";
import Image3 from "@/assets/landing/Image3.png";
import {
	ChevronLeft,
	Cross,
	Dumbbell,
	Footprints,
	Headset,
	House,
	IdCard,
	Scissors,
	UserRoundCheckIcon,
	Volleyball,
} from "lucide-react";
import IconWithText from "@/components/Landing/IconWithText";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Rating, RatingButton } from "@/components/Custom/Rating/Rating";
import { Button } from "@/components/Custom/Button/Button";
import FeatureCard from "@/components/Landing/FeatureCard";
import { useDesktop, useTabletMobile } from "@/hooks/ResponsiveHooks";

function Landing() {
	const isDesktop = useDesktop();
	return (
		<div
			className="w-full flex flex-col items-center justify-center mt-20"
			dir="rtl"
		>
			<div className="flex flex-col items-center lg:items-stretch lg:flex-row w-full h-180 px-7">
				<div className="lg:w-1/2 flex justify-end">
					<div className="w-150 flex flex-col items-center gap-1">
						<div className="text-3xl text-center mt-5">
							پتیار، پلتفرم امن برای مراقبت از پت شما
						</div>
						<div className="text-3xl font-bold text-center">
							به سادگی پرستاری را در نزدیکی خود پیدا کنید، مستقیما چت کنید و با
							اطمینان رزرو کنید.
						</div>
						{isDesktop && (
							<div className="flex items-center w-full mt-20">
								<IconWithText
									Icon={UserRoundCheckIcon}
									text="انعطاف در ساعت کاری"
								/>
								<IconWithText Icon={IdCard} text="پرداخت امن" />
								<IconWithText Icon={Headset} text="پشتیبانی 24 ساعته" />
							</div>
						)}
					</div>
				</div>
				<div className="lg:w-1/2 flex">
					<div className="w-160 flex items-center justify-center">
						<img src={Image1} alt="Landing" className="w-auto h-auto" />
					</div>
				</div>
			</div>

			<div className="bg-secondary-200 w-full flex flex-col items-center gap-3 py-3">
				<div className="flex w-9/10 lg:w-8/10 justify-between items-center">
					<p className="text-2xl font-bold">پتیار های برگزیده</p>
					<p className="text-lg flex items-center">
						مشاهده همه
						<ChevronLeft />
					</p>
				</div>
				<Carousel
					opts={{ loop: true, direction: "rtl" }}
					className="w-full flex justify-center"
				>
					<div className="w-1/10 hidden lg:flex items-center justify-center">
						<CarouselNext className="relative top-0 right-0 left-0 bottom-0 translate-y-0 size-15" />
					</div>
					<div className="w-9/10 lg:w-8/10">
						<CarouselContent>
							{Array.from({ length: 10 }).map((_, index) => (
								<CarouselItem className="basis-55 w-full" key={index}>
									<div className="w-full h-auto max-w-50 min-w-50 bg-white shadow-sm rounded-2xl px-3 pt-3 pb-2 flex flex-col">
										<div className="w-full h-36 bg-secondary-700 rounded-t-2xl"></div>
										<p className="font-bold">نام</p>
										<p className="text-sm">خدمات</p>
										<Rating defaultValue={3} readOnly>
											{Array.from({ length: 5 }).map((_, index) => (
												<RatingButton
													className="text-primary"
													key={index}
													size={10}
												/>
											))}
										</Rating>
										<div className="flex justify-end mt-2">
											<Button
												shadow={false}
												className="bg-secondary-700 w-20 h-8 py-0"
											>
												درخواست
											</Button>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</div>
					<div className="w-1/10 hidden lg:flex items-center justify-center">
						<CarouselPrevious className="relative top-0 right-0 left-0 bottom-0 translate-y-0 size-15" />
					</div>
				</Carousel>
			</div>
			<div className="w-full h-auto flex flex-col items-center">
				<p className="text-5xl font-bold mt-35">خدمات محبوب پتیار</p>
				<p className="text-xl mt-5">
					مجموعهای از سرویسهای کاربردی برای مراقبت بهتر از پتها
				</p>

				<div className="flex flex-col sm:flex-row lg:flex-col gap-5 lg:gap-0 mt-20 sm:mt-0">
					<div className="flex flex-col lg:flex-row gap-5 xl:gap-15 sm:mt-20">
						<FeatureCard
							Icon={Scissors}
							text="حمام، کوتاهی مو و ناخن با مراقبین حرفهای."
							title="آرایشگاه"
						/>
						<FeatureCard
							Icon={Cross}
							text="ویزیت، واکسن و چکاپ در خانه یا کلینیک."
							title="دامپزشکی"
						/>
						<FeatureCard
							Icon={Volleyball}
							text="پلیدیت و تحرک سالم برای انرژیسوزی."
							title="بازی و اجتماع سازی"
						/>
					</div>
					<div className="flex flex-col lg:flex-row gap-5 xl:gap-15 sm:mt-20">
						<FeatureCard
							Icon={Footprints}
							text="قدمزدن روزانه با گزارش مسیر و زمان."
							title="پیاده روی"
						/>
						<FeatureCard
							Icon={House}
							text="مراقبت شبانه روزی در خانه یا پانسیون."
							title="پتنشینی/پانسیون"
						/>
						<FeatureCard
							Icon={Dumbbell}
							text="فرمانپذیری و اصلاح رفتار با مربی مجرب."
							title="آموزش"
						/>
					</div>
				</div>
			</div>
			<div className="w-full h-auto flex flex-col items-center px-8 mt-50">
				<div className="flex w-full max-w-300">
					<div className="flex justify-end w-1/2">
						<img src={Image2} className="w-full h-auto object-contain" />
					</div>
					<div className="flex justify-start w-1/2">
						<div className="w-full flex flex-col items-start justify-center">
							<div className="max-w-115 ">
								<div className="w-full">
									<p className="font-bold text-2xl">
										توهم چالش پیدا کردن مراقب برای پت داری؟
									</p>
								</div>
								<p className="text-justify mt-5">
									پیدا کردن پرستار مناسب برای پت، میتونه کلی استرس داشته باشه…
									<br />
									شاید مهمترین چیزی که مانعت میشه با خیال راحت سفر کنی یا ساعتها
									تو کارت غرق بشی، اینه که نمیدونی چجوری یک پرستار حرفهای و
									دلسوز، که با نیازهای پتت هماهنگ باشه پیدا کنی.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full h-auto flex flex-col items-center px-15 mt-50">
				<div className="flex w-full max-w-300">
					<div className="flex justify-end w-1/2">
						<div className="max-w-150 flex flex-col items-end justify-center">
							<div className="max-w-115 ">
								<div className="w-full">
									<p className="font-bold text-2xl">
										آگاهانه پرستار مناسب رو پیدا کن.
									</p>
								</div>
								<p className="text-justify mt-5">
									ما پلتفرمی هستیم که به تو کمک میکنه در کمترین زمان، به جامعهای
									از پرستاران تأییدشده و عاشق حیوانات دسترسی پیدا کنی. پرستارانی
									که پروفایل، سوابق و نظرات کاربران قبلیشون رو میبینی و میتونی
									مستقیما باهاشون چت کنی تا درنهایت، با اعتماد کامل انتخاب کنی.
									<br />
									<br />
									همین حالا جستجو رو شروع کن!
								</p>
								<Button className="px-7">جستجو</Button>
							</div>
						</div>
					</div>
					<div className="flex justify-start w-1/2">
						<img src={Image3} className="w-full h-auto object-contain" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Landing;
