import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Input } from "@/components/Custom/Input/Input";
import {
	useDesktop,
	useDesktopTablet,
	useMobile,
	useTablet,
} from "@/hooks/ResponsiveHooks";
import adjustInputDirection from "@/utils/adjustInputDirection";

function Test() {
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(e.target.value);
	}
	const isDesktop = useDesktop();
	const isMobile = useMobile();
	const isTablet = useTablet();
	return (
		<div className="flex flex-col items-center">
			{isDesktop && <p> desktop mode</p>}
			{isMobile && <p> mobile mode</p>}
			{isTablet && <p> tablet mode</p>}

			<Button shadow={true} size={"giant"} bold={true}>
				ورود
			</Button>
			<br />
			<br />
			<Button
				isLoading={true}
				loadingSize={8}
				shadow={true}
				size={"giant"}
				bold={true}
			>
				ورود
			</Button>
			<br />
			<br />
			<Input
				className="w-80"
				onChange={onChange}
				shadow={true}
				placeholder="ایمیل"
			/>
			<br />
			<br />
			<Input
				className="w-80"
				onChange={adjustInputDirection(onChange)}
				shadow={true}
				placeholder="ایمیل"
			/>
			<br />
			<br />
			<Checkbox text={"آقا عشق"} />
			<br />
			<br />
			<Button variant={"link"} shadow={false} bold={true}>
				فراموشی رمز عبور
			</Button>
		</div>
	);
}

export default Test;
