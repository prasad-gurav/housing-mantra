"use client";
import React, { useState } from "react";
import MapPicker from "react-google-map-picker";

const DEFAULT_LOCATION = { lat: 10, lng: 106 };
const DEFAULT_ZOOM = 10;

interface Props {
	location: {
		lat: number;
		lng: number;
	};
	handleChangeLocation: (lat: number, lng: number) => void;
}

const LocationPicker: React.FC<Props> = ({ location, handleChangeLocation }) => {
	const [zoom, setZoom] = useState(DEFAULT_ZOOM);


	const handleChangeZoom = (newZoom: number) => {
		setZoom(newZoom);
	};

	const handleResetLocation = () => {
		handleChangeLocation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
		setZoom(DEFAULT_ZOOM);
	};

	return (
		<MapPicker
			defaultLocation={location}
			zoom={zoom}
			style={{ height: "400px", width: "100%" }}
			onChangeLocation={handleChangeLocation}
			onChangeZoom={handleChangeZoom}
			apiKey="YOUR_GOOGLE_MAPS_API_KEY"
		/>
	);
};

export default LocationPicker;
