export default function IconWithText({
	Icon,
	text,
}: {
	Icon: React.ComponentType<{ size?: string }>;
	text: string;
}) {
	return (
		<div className="w-full flex flex-col items-center justify-center gap-3">
			<div className="size-20 bg-secondary-300 rounded-md flex items-center justify-center p-4">
				<Icon size={"auto"} />
			</div>
			<div className="text-center h-10 text-xl font-bold">{text}</div>
		</div>
	);
}
