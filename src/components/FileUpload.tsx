"use client";
import { useState, useRef } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUp, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";

export function FileUpload() {
	const [images, setImages] = useState<
		{ src: string; description: string; isPrimary: boolean }[]
	>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			Array.from(files).forEach((file) => {
				if (file.type.startsWith("image/")) {
					const reader = new FileReader();
					reader.onloadend = () => {
						setImages((prev) => [
							...prev,
							{
								src: reader.result as string,
								description: "",
								isPrimary: prev.length === 0,
							},
						]);
					};
					reader.readAsDataURL(file);
				}
			});
		}
	};

	const handleRemoveImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};

	const handleDescriptionChange = (index: number, description: string) => {
		setImages((prev) =>
			prev.map((img, i) => (i === index ? { ...img, description } : img))
		);
	};

	const handleSetPrimary = (index: number) => {
		console.log(index)
		setImages((prev) =>
			prev.map((img, i) => ({ ...img, isPrimary: i === index }))
		);
	};

	const handleClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="px-8 min-h-56">
			<h2 className="text-xl font-semibold text-rose-500 mb-2">Images</h2>
			<div
				className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer max-w-5xl"
				onClick={handleClick}
			>
				<p className="flex items-center justify-center flex-col px-8">
					<FileUp />
					Click or drop here to upload images
				</p>
				<Input
					id="file-upload"
					type="file"
					accept="image/*"
					multiple
					ref={fileInputRef}
					onChange={handleFileChange}
					className="hidden"
				/>
			</div>
			{images.length > 0 && (
				<>
					<h2 className="text-xl font-semibold my-8">Uploaded Images</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4  max-w-6xl">
						{images.map((image, index) => (
							<Card key={index} className="border-rose-200 relative">
								<Button
									onClick={() => handleRemoveImage(index)}
									className="absolute top-2 right-2  text-white p-1 rounded-full"
								>
									<Trash size={16} className="text-rose-500" />
								</Button>
								<CardHeader>
									<CardTitle>Preview</CardTitle>
								</CardHeader>
								<CardContent>
									<img
										src={image.src}
										alt="Uploaded"
										className="rounded-lg w-full h-48 max-h-96 object-cover"
									/>
								</CardContent>
								<CardFooter>
									<div className="flex flex-col items-start gap-2">
										<Label className="block mt-2">Description</Label>
										<Input
											type="text"
											placeholder="Add label"
											value={image.description}
											onChange={(e) =>
												handleDescriptionChange(index, e.target.value)
											}
										/>
									</div>

									<div className="flex items-center flex-col space-y-2">
										<Label htmlFor="set-primary">Set Primary</Label>
										<Switch
											id={`set-primary-${index}`}
											checked={image.isPrimary}
											onCheckedChange={() => handleSetPrimary(index)}
											className={`transition-all ${
												image.isPrimary ? "bg-rose-500" : "bg-gray-300"
											  }`}
										/>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				</>
			)}
			<p className="text-rose-500 my-4">Add at least one media</p>
		</div>
	);
}

export default FileUpload;
