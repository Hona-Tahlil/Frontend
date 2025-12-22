import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../Select/Select";

import customStyles from "./Province.module.css";

import { useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LocationContext } from "@/types/locationSelectorTypes";
import { fetchCitiesService } from "@/services/provinceService";
import type { City as CityType } from "@/types/addressInfoTypes";
export const City = ({
	className,
	name,
}: {
	className?: string;
	name?: string;
}) => {
	const context = useContext(LocationContext);
	if (!context) throw new Error("City must be used within a LocationSelector");

	const { province } = context;

	const ref = useRef<HTMLButtonElement>(null);
	const [width, setWidth] = useState(0);

	const [cities, setCities] = useState<CityType[]>([]);

	useEffect(() => {
		fetchCitiesService(parseInt(province)).then((data) => {
			setCities(data.data);
		});
	}, [province]);

	useEffect(() => {
		if (ref.current) {
			setWidth(ref.current.clientWidth); // gets the width in pixels
		}
	}, []);
	useEffect(() => {
		console.log(width);
	}, [width]);

	function calculateFontSize(length: number) {
		const fontSize = (width - 20) / (length * 0.8);
		const maxFontSize = 15;
		return fontSize > maxFontSize ? maxFontSize : fontSize;
	}

	return (
		<Select name={name || "City"}>
			<SelectTrigger
				ref={ref}
				style={
					{
						"--fs": `${calculateFontSize(province.length || 5)}px`,
					} as React.CSSProperties
				}
				className={cn(
					"w-30 border-1 border-gray-400/20",
					className,
					customStyles.dynamicSize,
				)}
			>
				<SelectValue placeholder="شهر" />
			</SelectTrigger>
			<SelectContent className="">
				<SelectGroup>
					{province &&
						Array.from(cities).map((province) => {
							return (
								<SelectItem
									className="text-[8px]"
									style={{ fontSize: calculateFontSize(province.name.length) }}
									value={province.num.toString()}
								>
									{province.name}
								</SelectItem>
							);
						})}
					<SelectItem className="text-[8px]" value={"nothing"}>
						استان را انتخاب کنید
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
