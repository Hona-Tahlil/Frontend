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
		<div className="w-80 rounded-xl border border-black/8 bg-secondary-200 flex flex-col py-5">
			<div className="flex gap-3 w-full items-center">
				<div className="w-2/10 p-1">
					<div className="w-full aspect-square rounded-md bg-secondary-900 flex items-center justify-center p-3">
						<Icon className="text-white" size={"auto"} />
					</div>
				</div>
				<div className="w-8/10">
					<p className="font-bold text-xl">{title}</p>
				</div>
			</div>
			<div className="flex gap-3 w-full items-center">
				<div className="w-2/10"></div>
				<div className="w-7/10">
					<p className="text-md">{text}</p>
				</div>
			</div>
		</div>
	);
}
