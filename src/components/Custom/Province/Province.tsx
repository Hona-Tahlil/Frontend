import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../Select/Select";
import { iranProvincesFa } from "@/utils/provinces";

import customStyles from "./Province.module.css";

import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type LocationContextType = {
	province: string;
	setProvince: (province: string) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(
	undefined,
);

type LocationSelectorProps = {
	children: ReactNode;
};

export const LocationSelector = ({ children }: LocationSelectorProps) => {
	const [province, setProvince] = useState("");

	return (
		<LocationContext.Provider value={{ province, setProvince }}>
			{children}
		</LocationContext.Provider>
	);
};

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
					{Array.from(Object.keys(iranProvincesFa)).map((province) => {
						return (
							<SelectItem
								style={{ fontSize: calculateFontSize(province.length) }}
								value={province}
							>
								{province}
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
						Array.from(iranProvincesFa[province]).map((province) => {
							return (
								<SelectItem
									className="text-[8px]"
									style={{ fontSize: calculateFontSize(province.length) }}
									value={province}
								>
									{province}
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

// --- Usage Example ---
// <LocationSelector>
//   <Province options={["California", "Texas", "Florida"]} />
//   <City citiesByProvince={{ California: ["LA","SF"], Texas: ["Austin","Dallas"], Florida: ["Miami","Orlando"] }} />
// </LocationSelector>
