import { useNavigate } from "react-router-dom";
import Image1 from "@/assets/landing/Image1.png";
import { ChevronLeft, Headset, IdCard, UserRoundCheckIcon } from "lucide-react";
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

function Landing() {
	return (
		<div
			className="w-full flex flex-col items-center justify-center mt-20"
			dir="rtl"
		>
			<div className="flex w-full h-180 px-7">
				<div className="w-1/2 flex justify-end">
					<div className="w-150 flex flex-col items-center gap-10">
						<div className="text-3xl font-bold">
							با عشق به حیوانات در آمد بساز
						</div>
						<div className="text-3xl text-center h-30">
							زمانهای آزادی که داری رو به مراقبت از پتها تبدیل کن.انعطاف کامل در
							ساعت کاری و درآمد شفاف و پشتیبانی مستمر.
						</div>
						<div className="flex items-center w-full mt-20">
							<IconWithText
								Icon={UserRoundCheckIcon}
								text="انعطاف در ساعت کاری"
							/>
							<IconWithText Icon={IdCard} text="پرداخت امن" />
							<IconWithText Icon={Headset} text="پشتیبانی 24 ساعته" />
						</div>
					</div>
				</div>
				<div className="w-1/2 flex">
					<div className="w-160 flex items-center justify-center">
						<img src={Image1} alt="Landing" className="w-auto h-auto" />
					</div>
				</div>
			</div>

			<div className="bg-secondary-200 w-full flex flex-col items-center gap-3 py-3">
				<div className="flex w-8/10 justify-between items-center">
					<p className="text-2xl font-bold">پتیار های برگزیده</p>
					<p className="text-lg flex items-center">
						مشاهده همه
						<ChevronLeft />
					</p>
				</div>
				<Carousel
					opts={{ loop: true, direction: "rtl" }}
					className="w-full flex"
				>
					<div className="w-1/10 flex items-center justify-center">
						<CarouselNext className="relative top-0 right-0 left-0 bottom-0 translate-y-0 size-15" />
					</div>
					<div className="w-8/10">
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
					<div className="w-1/10 flex items-center justify-center">
						<CarouselPrevious className="relative top-0 right-0 left-0 bottom-0 translate-y-0 size-15" />
					</div>
				</Carousel>
			</div>
		</div>
	);
}

export default Landing;
