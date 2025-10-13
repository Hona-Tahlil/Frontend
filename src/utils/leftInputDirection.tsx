const adjustInputDirectionOnChange = (
	e: React.ChangeEvent<HTMLInputElement>,
) => {
	const value = e.currentTarget.value;
	if (value === "") {
		e.currentTarget.dir = "rtl";
	} else {
		e.currentTarget.dir = "ltr";
	}
};

export default function leftInputDirection(
	fn: (e: React.ChangeEvent<HTMLInputElement>) => void,
) {
	return (e: React.ChangeEvent<HTMLInputElement>) => {
		adjustInputDirectionOnChange(e);
		return fn(e);
	};
}
