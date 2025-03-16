"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, CirclePlus } from "lucide-react";
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

const DefaultLocation = { lat: 10, lng: 106 };

interface ConnectivityItem {
	landmark: string;
	distance: string;
	description: string;
	latitude: string;
	longitude: string;
}

interface ConnectivityFormProps {
	connectivityItems: ConnectivityItem[];
	setConnectivityItems: React.Dispatch<
		React.SetStateAction<ConnectivityItem[]>
	>;
}

const ConnectivityForm: React.FC<ConnectivityFormProps> = ({
	connectivityItems,
	setConnectivityItems,
}) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [location, setLocation] = useState<{ lat: number; lng: number }>(
		DefaultLocation
	);

	const handleChangeLocation = (lat: number, lng: number) => {
		setLocation({ lat, lng });

		if (currentIndex !== null) {
			setConnectivityItems((prev) =>
				prev.map((item, i) =>
					i === currentIndex
						? { ...item, latitude: lat.toString(), longitude: lng.toString() }
						: item
				)
			);
		}
	};

	const handleConnectivityChange = <K extends keyof ConnectivityItem>(
		index: number,
		field: K,
		value: ConnectivityItem[K]
	) => {
		setConnectivityItems((prev) =>
			prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
		);
	};

	const openLocationModal = (index: number) => {
		setCurrentIndex(index);
		setIsModalOpen(true);
	};

	return (
		<div className="my-4 max-w-5xl px-8 shadow-lg">
			{connectivityItems.map((item, index) => (
				<div key={index} className="grid grid-cols-2 gap-4 mb-4">
					<div className="w-full space-y-2">
						<Label>Landmark</Label>
						<Select
							value={item.landmark}
							onValueChange={(value) =>
								handleConnectivityChange(index, "landmark", value)
							}
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
							onChange={(e) =>
								handleConnectivityChange(index, "distance", e.target.value)
							}
							placeholder="Enter distance"
						/>
					</div>
					<div className="col-span-2 space-y-2">
						<Label>Description</Label>
						<Textarea
							value={item.description}
							className="h-48"
							onChange={(e) =>
								handleConnectivityChange(index, "description", e.target.value)
							}
							placeholder="Add details"
						/>
					</div>
					<div className="flex items-center flex-wrap w-5xl gap-2">
						<div className="space-y-2 w-[40%]">
							<Label>Latitude</Label>
							<Input
								type="text"
								value={item.latitude}
								readOnly
								placeholder="Latitude"
							/>
						</div>
						<div className="space-y-2 w-[40%]">
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
};

export default ConnectivityForm;
