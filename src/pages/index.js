import Image from "next/image";
import { useState } from "react"; // Import useState
import useContentful from '../lib/useContentful'; // Import your custom hook
import "../partials/home.css";
import Loading from '../app/components/Loading';

export default function Home() {
    const { records, loading, projects, loadingProjects } = useContentful(); // Fetch records and loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const [modalImageUrl, setModalImageUrl] = useState(''); // Store the clicked image URL

    // Handle loading state
    if (loadingProjects) {
        return <Loading projects={projects} />; // Pass project images to Loading component
    }

    // Function to open the modal with the specific image URL
    const openModal = (imageUrl) => {
        setModalImageUrl(imageUrl); // Set the image URL for the modal
        setIsModalOpen(true); // Open the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mainSec sliderMain">
            <div className="slider-container scroll-smooth">
                {records.map((record, index) => {
                    const imageUrl = record.image 
                        ? `https:${record.image}`
                        : '/placeholder.jpg'; // Fallback image if URL is missing

                    return (
                        <div 
                            key={index} 
                            className={`slider-item ${index === 0 ? 'pl-16 md:pl-0' : 'pl-0'}`} // Add left padding for the first item only on small screens
                        >
                            <Image
                                src={imageUrl}
                                alt={record.title || "Home Image"}
                                fill // This replaces layout="fill"
                                className="object-cover homeImage cursor-pointer"
                                onClick={() => openModal(imageUrl)} 
                            />
                            <p 
                                className={`absolute bottom-0 left-0 right-0 z-10 text-xs text-left text-white ${index === 0 ? 'pl-20 md:pl-0' : ''} px-6 lg:px-16 py-4`} // Add padding for the first title only on small screens
                            >
                                {record.title}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed modalBox inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative w-full max-w-3xl">
                        <Image
                            src={modalImageUrl}
                            alt="Modal Image"
                            width={800}
                            height={500}
                            className="object-contain"
                        />
                        <button 
                            className="absolute top-0 right-2 text-3xl text-red-700 p-2 rounded-full" 
                            onClick={closeModal}
                        >
                            &times; {/* Close button */}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
