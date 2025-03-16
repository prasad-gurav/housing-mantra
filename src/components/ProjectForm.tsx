"use client";
import { useState, useMemo } from "react";
import AppBreadcrumb from "@/components/app-breadcrumb";
import ConnectivityForm from "@/components/ConnectivityForm";
import FileUpload from "@/components/FileUpload";

import UpdateAmenitiesForm from "@/components/updateAmanities";
import YouTubeURLForm from "@/components/YoutubeUrls";

const ProjectForm = () => {
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
	const [images, setImages] = useState<
		{ src: string; description: string; isPrimary: boolean }[]
	>([]);
	const [youtubeURLs, setYoutubeURLs] = useState([""]);
	const [connectivityItems, setConnectivityItems] = useState([
		{
			landmark: "",
			distance: "",
			description: "",
			latitude: "",
			longitude: "",
		},
	]);

	const isSectionComplete = useMemo(() => {
		return {
			amenities: selectedAmenities.length > 0,
			images: images.length > 0,
			youtube: youtubeURLs.some((url) => url.trim() !== ""),
			connectivity: connectivityItems.some(
				(item) =>
					item.landmark.trim() !== "" &&
					item.distance.trim() !== "" &&
					item.latitude.trim() !== "" &&
					item.longitude.trim() !== ""
			),
		};
	}, [selectedAmenities, images, youtubeURLs, connectivityItems]);

	const progressPercentage = useMemo(() => {
		const totalSections = Object.keys(isSectionComplete).length;
		const completedSections =
			Object.values(isSectionComplete).filter(Boolean).length;
		return (completedSections / totalSections) * 100;
	}, [isSectionComplete]);

	return (
		<div className="space-y-6 p-6 max-w-5xl ">
			<AppBreadcrumb />

			<UpdateAmenitiesForm
				selectedAmenities={selectedAmenities}
				setSelectedAmenities={setSelectedAmenities}
				progressPercentage={progressPercentage}
			/>

			<FileUpload images={images} setImages={setImages} />
			<YouTubeURLForm
				youtubeURLs={youtubeURLs}
				setYoutubeURLs={setYoutubeURLs}
			/>
			<ConnectivityForm
				connectivityItems={connectivityItems}
				setConnectivityItems={setConnectivityItems}
			/>
		</div>
	);
};

export default ProjectForm;
