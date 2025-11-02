import {
	Dropzone,
	DropzoneContent,
	DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { UploadIcon } from "lucide-react";
import { useState } from "react";

const UploadDropZone = () => {
	const [files, setFiles] = useState<File[] | undefined>();

	const handleDrop = (files: File[]) => {
		console.log(files);
		setFiles(files);
	};

	return (
		<Dropzone
			onDrop={handleDrop}
			onError={console.error}
			src={files}
			className="border-2 border-black/20 border-dashed bg-transparent"
		>
			<DropzoneEmptyState>
				<div className="flex flex-col w-full items-center gap-1 p-8">
					<div className="flex items-center justify-center rounded-lg text-black">
						<UploadIcon size={24} />
					</div>
					<p>فایل خود را اینجا رها کنید یا کلیک کنید.</p>
				</div>
			</DropzoneEmptyState>
			<DropzoneContent>
				<div className="flex flex-col w-full items-center gap-1 p-8">
					<div className="flex items-center justify-center rounded-lg text-black">
						<UploadIcon size={24} />
					</div>
					<p>{files ? files[0].name : "false"}</p>
				</div>
			</DropzoneContent>
		</Dropzone>
	);
};

export default UploadDropZone;
