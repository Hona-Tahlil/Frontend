import { useEffect, useState } from "react";
import {
	LocationContext,
	type LocationSelectorProps,
} from "@/types/locationSelectorTypes";

export const LocationSelector = ({
	children,
	initialProvince = "",
}: LocationSelectorProps) => {
	const [province, setProvince] = useState(initialProvince);

	useEffect(() => {
		setProvince(initialProvince);
	}, [initialProvince]);

	return (
		<LocationContext.Provider value={{ province, setProvince }}>
			{children}
		</LocationContext.Provider>
	);
};
