import type { ReactNode } from "react";

interface ResponsiveProviderProps {
	children: ReactNode;
	desktop?: boolean;
	mobile?: boolean;
	tablet?: boolean;
}
export default function ResponsiveProvider({
	children,
	desktop = false,
	mobile = false,
	tablet = false,
}: ResponsiveProviderProps) {
	const width = window.innerWidth;
	if (width < 768 && mobile) {
		return <>{children}</>;
	} else if (width >= 768 && width < 1024 && tablet) {
		return <>{children}</>;
	} else if (width >= 1024 && desktop) {
		return <>{children}</>;
	} else {
		return <></>;
	}
}
