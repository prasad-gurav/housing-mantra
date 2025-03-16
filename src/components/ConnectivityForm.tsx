"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";
import { LocationPickerModal } from "@/components/LocationPickerModal";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const landmarks = [
	"Hospital",
	"School",
	"Mall",
	"Park",
	"Airport",
	"Bus Stop",
	"Metro Station",
];
import { CirclePlus } from "lucide-react";

const DefaultLocation = { lat: 10, lng: 106 };
export function ConnectivityForm() {
	const [connectivityItems, setConnectivityItems] = useState([
		{
			landmark: "",
			distance: "",
			description: "",
			latitude: "",
			longitude: "",
		},
	]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [location, setLocation] = useState(DefaultLocation);

	const handleChangeLocation = (lat: number, lng: number) => {
		setLocation({ lat, lng });
	};

	const handleChange = (index: number, field: string, value: string) => {
		setConnectivityItems((prev) =>
			prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
		);
	};

	const openLocationModal = (index: number) => {
		setCurrentIndex(index);
		setIsModalOpen(true);
	};

	return (
		<div className="my-4 max-w-5xl px-8">
			{connectivityItems.map((item, index) => (
				<div key={index} className="grid grid-cols-2 gap-4 mb-4">
					<div className="w-full space-y-2">
						<Label>Landmark</Label>
						<Select
							onValueChange={(value) => handleChange(index, "landmark", value)}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a landmark" />
							</SelectTrigger>
							<SelectContent>
								{landmarks.map((landmark) => (
									<SelectItem key={landmark} value={landmark}>
										{landmark}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="space-y-2">
						<Label>Distance</Label>
						<Input
							type="number"
							value={item.distance}
							onChange={(e) => handleChange(index, "distance", e.target.value)}
							placeholder="Enter distance"
						/>
					</div>
					<div className="col-span-2 space-y-2">
						<Label>Description</Label>
						<Textarea
							value={item.description}
							className="h-48"
							onChange={(e) =>
								handleChange(index, "description", e.target.value)
							}
							placeholder="Add details"
						/>
					</div>
					<div className="flex items-center flex-wrap w-5xl gap-2">
						<div className="space-y-2 w-[44%]">
							<Label>Latitude</Label>
							<Input
								type="text"
								value={item.latitude}
								readOnly
								placeholder="Latitude"
							/>
						</div>
						<div className="space-y-2 w-[44%]">
							<Label>Longitude</Label>
							<Input
								type="text"
								value={item.longitude}
								readOnly
								placeholder="Longitude"
							/>
						</div>
						<div className="relative top-2.5">
							<Button
								size="icon"
								className="bg-background border border-black"
								onClick={() => openLocationModal(index)}
							>
								<MapPin className="text-foreground" />
							</Button>
						</div>
					</div>
				</div>
			))}

			<LocationPickerModal
				location={location}
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				handleChangeLocation={handleChangeLocation}
			/>
			<div>
				<Button className="flex items-center ">
					<CirclePlus /> Add connectivity item
				</Button>
				<div className="my-4 flex items-center justify-between">
					<Button>Previous</Button>
					<Button type="submit">Submit</Button>
				</div>
			</div>
		</div>
	);
}
