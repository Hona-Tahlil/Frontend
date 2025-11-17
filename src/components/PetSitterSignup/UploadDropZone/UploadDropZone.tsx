import {
	Dropzone,
	DropzoneContent,
	DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { useField } from "formik";
import { UploadIcon } from "lucide-react";
import { useEffect, useState } from "react";

const UploadDropZone = ({ name }: { name?: string }) => {
	const [files, setFiles] = useState<File[] | undefined>();
	const [field, meta, helpers] = useField(name || "");
	const hasError = Boolean(meta.touched && meta.error);

	useEffect(() => {
		setFiles(field.value || undefined);
	}, []);

	const handleDrop = (files: File[]) => {
		console.log(files);
		setFiles(files);
		helpers.setValue(files);
	};

	return (
		<Dropzone
			accept={{ "image/*": [], "application/pdf": [] }}
			maxFiles={3}
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
					{hasError && <p className="text-red-500">{meta.error}</p>}
				</div>
			</DropzoneEmptyState>
			<DropzoneContent>
				<div className="flex flex-col w-full justify-center items-center gap-3 p-8">
					<div className="flex w-full justify-center items-center gap-1">
						{files &&
							files.map((file) => {
								return (
									<div className="flex flex-col w-auto items-center gap-1">
										<div className="flex items-center justify-center rounded-lg text-black">
											<UploadIcon size={24} />
										</div>
										<div className="flex items-center justify-center gap-1">
											<p>{file.name}</p>
										</div>
									</div>
								);
							})}
					</div>
					{hasError && <p className="text-red-500">{meta.error}</p>}
				</div>
			</DropzoneContent>
		</Dropzone>
	);
};

export default UploadDropZone;
