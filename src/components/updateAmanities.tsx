"use client";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";


export function UpdateAmenitiesForm() {
	const amenities = [
		"School in vicinity",
		"Adjoining Metro Station",
		"Peaceful vicinity",
		"Near City Center",
		"Safe & Secure Locality",
		"Desperate Sale",
		"Breakthrough Price",
		"Quick Deal",
		"Investment Opportunity",
		"High Rental Yield",
		"Affordable",
		"Reputed Builder",
		"Well Ventilated",
		"Fully Renovated",
		"Vastu Compliant",
		"Spacious",
		"Ample Parking",
		"Free Hold",
		"Gated Society",
		"Tasteful Interior",
		"Prime Location",
		"Luxury Lifestyle",
		"Well Maintained",
		"Plenty of Sunlight",
		"Newly Built",
		"Family",
		"Bachelors",
		"Females Only",
	];

	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

	
	const toggleAmenity = (amenity: string) => {
		setSelectedAmenities((prev) =>
			prev.includes(amenity)
				? prev.filter((item) => item !== amenity)
				: [...prev, amenity]
		);
	};


	const toggleAllAmenities = () => {
		if (selectedAmenities.length === amenities.length) {
			setSelectedAmenities([]); 
		} else {
			setSelectedAmenities([...amenities]); 
		}
	};

	return (
		<div className="p-4 px-8 max-w-5xl">
			
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-4xl font-semibold">Update Amenities</h2>
			</div>
			<p className="my-4">
				Fill out the amenities below about this new project
			</p>
			
			<Progress
				value={(selectedAmenities.length / amenities.length) * 100}
				className="mb-4 bg-rose-50 [&>div]:bg-rose-500"
			/>
			<div className="flex items-center justify-between my-4">
			<h2 className="text-2xl font-bold">Amenities</h2>
			<Button
				onClick={toggleAllAmenities}
				className="bg-rose-500 text-white hover:bg-rose-600 transition"
			>
				{selectedAmenities.length === amenities.length
					? "Unselect All"
					: "Select All"}
			</Button>
			</div>
		
			<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
				{amenities.map((amenity) => (
					<label
						key={amenity}
						className="flex items-center space-x-2 transition-colors"
					>
						<Checkbox
							checked={selectedAmenities.includes(amenity)}
							onCheckedChange={() => toggleAmenity(amenity)}
							className="border-rose-300 text-rose-500 focus:ring-rose-200"
						/>
						<span>{amenity}</span>
					</label>
				))}
			</div>
		</div>
	);
}

export default UpdateAmenitiesForm;
