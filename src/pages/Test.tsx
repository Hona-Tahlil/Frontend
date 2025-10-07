import { Button } from "@/components/Custom/Button/Button";
import { Checkbox } from "@/components/Custom/Checkbox/Checkbox";
import { Input } from "@/components/Custom/Input/Input";

function Test() {
	return (
		<>
			<Button shadow={true} size={"giant"} bold={true}>
				ورود
			</Button>
			<br />
			<br />
			<Input className="w-80" shadow={true} placeholder="ایمیل" />
			<br />
			<br />
			<Checkbox text={"آقا عشق"} />
			<br />
			<br />
			<Button variant={"link"} shadow={false} bold={true}>
				فراموشی رمز عبور
			</Button>
		</>
	);
}

export default Test;
