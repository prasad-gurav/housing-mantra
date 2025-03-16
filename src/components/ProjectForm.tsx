"use client";
import AppBreadcrumb from "@/components/app-breadcrumb";
import { ConnectivityForm } from "@/components/ConnectivityForm";
import { FileUpload } from "@/components/FileUpload";
import LocationPicker from "@/components/LocationPicker";
import UpdateAmenitiesForm from "@/components/updateAmanities";
import YouTubeURLForm from "@/components/YoutubeUrls";

const ProjectForm = () => {
	
	return (
		<div>
			<AppBreadcrumb />
			<UpdateAmenitiesForm />
			<FileUpload />
			<YouTubeURLForm />
			<ConnectivityForm />
	
		</div>
	);
};

export default ProjectForm;
