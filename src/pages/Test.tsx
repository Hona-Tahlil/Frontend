import { Checkbox } from "@/components/Custom/Checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Test() {
	return (
		<>
			<Input
				className="w-100"
				shadow={true}
				onChange={() => {
					console.log("fsdaf");
				}}
				placeholder="ایمیل"
			/>
			<br />
			<Checkbox text={"من را به خاطر بسپار"} />
			<br />
			<Button bold={true} size={"giant"} shadow={true}>
				ورود
			</Button>
			<br />
			<br />
			<Button bold={true} size={"giant"}>
				ورود
			</Button>
			<br />
			<br />
			<Button bold={true} size={"giant"} disabled>
				ورود
			</Button>
			<br />
			<br />
			<Button bold={true} size={"giant"} disabled shadow={true}>
				ورود
			</Button>
		</>
	);
}

export default Test;
