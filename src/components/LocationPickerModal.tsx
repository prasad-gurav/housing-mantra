"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import LocationPicker from "./LocationPicker";

interface LocationPickerProps {
	isOpen: boolean;
	onClose: () => void;
	location: {
		lat: number;
		lng: number;
	};
	handleChangeLocation: (lat: number, lng: number) => void;
}

const DEFAULT_LOCATION = { lat: 10, lng: 106 };

export const LocationPickerModal: React.FC<LocationPickerProps> = ({
	isOpen,
	onClose,
	location,
	handleChangeLocation
}) => {
	// const [location, setLocation] = useState(DEFAULT_LOCATION);

	const handleConfirm = () => {
		handleChangeLocation(location.lat, location.lng);
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Pick a Location</DialogTitle>
				</DialogHeader>

				<LocationPicker
					location={location}
					handleChangeLocation={handleChangeLocation}
				/>

				<Button onClick={handleConfirm} className="mt-4 w-full bg-primary">
					Confirm Location
				</Button>
			</DialogContent>
		</Dialog>
	);
};
