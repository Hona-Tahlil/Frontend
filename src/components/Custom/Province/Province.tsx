import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../Select/Select";

function Province() {
	const [province, setProvince] = useState("");
	return (
		<Select name="Province">
			<SelectTrigger className="w-full border-1 border-gray-400/20">
				<SelectValue
					placeholder="استان"
					style={{ fontSize: 15 - province.length / 3 }}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{Array.from(Object.keys(iranProvincesFa)).map((province) => {
						return (
							<SelectItem
								style={{ fontSize: 15 - province.length / 3 }}
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
