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
import type { Province } from "@/types/addressInfoTypes";
import { fetchProvincesService } from "@/services/provinceService";

export function Province({
	className,
	name,
}: {
	className?: string;
	name?: string;
}) {
	const context = useContext(LocationContext);
	if (!context)
		throw new Error("Province must be used within a LocationSelector");

	const { province, setProvince } = context;

	const ref = useRef<HTMLButtonElement>(null);
	const [width, setWidth] = useState(0);

	const [provinces, setProvinces] = useState<Province[]>([]);

	useEffect(() => {
		fetchProvincesService().then((data) => {
			setProvinces(data.data);
		});
	}, []);
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
		<Select name={name || "Province"} onValueChange={setProvince}>
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
				<SelectValue placeholder="استان" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{Array.from(Array.from(provinces)).map((city) => {
						return (
							<SelectItem
								style={{ fontSize: calculateFontSize(city.name.length) }}
								value={city.num.toString()}
							>
								{city.name}
							</SelectItem>
						);
					})}
					<SelectItem className="text-sm" value="asdf">
						بهترین ها
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
