export default function FeatureCard({
	Icon,
	text,
	title,
}: {
	Icon: React.ComponentType<{ size?: string; className?: string }>;
	title: string;
	text: string;
}) {
	return (
		<div className="w-60 md:w-75 xl:w-80 rounded-4xl md:rounded-xl border border-black/8 bg-secondary-200 flex flex-col py-1 md:py-5">
			<div className="flex gap-3 w-full items-center">
				<div className="w-3/10 p-1">
					<div className="w-full aspect-square bg-secondary-900 flex items-center justify-center p-3 rounded-full md:rounded-md">
						<Icon className="text-white" size={"auto"} />
					</div>
				</div>
				<div className="w-8/10">
					<p className="font-bold text-md md:text-xl">{title}</p>
				</div>
			</div>
			<div className="flex gap-3 w-full items-center">
				<div className="w-2/10"></div>
				<div className="w-7/10">
					<p className="text-sm md:text-md">{text}</p>
				</div>
			</div>
		</div>
	);
}
