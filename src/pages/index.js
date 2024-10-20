import Image from "next/image";
import useContentful from '../lib/useContentful'; // Import your custom hook
import "../partials/home.css";
import Loading from '../app/components/Loading';

export default function Home() {
    const { records, loading } = useContentful(); // Fetch records and loading state

    // Handle loading state
    if (loading) {
        return <Loading />; 
    }

    // Utility function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    // Shuffle records for random display
    const shuffledRecords = shuffleArray([...records]);

    return (
        <>
            {/* Slider Container */}
            <div className="overflow-x-auto relative">
                <div className="flex space-x-4" style={{ minHeight: '300px' }}>
                    {shuffledRecords.map((record, index) => {
                        const imageUrl = record.image 
                            ? `https:${record.image}`
                            : '/placeholder.jpg'; // Fallback image if URL is missing

                        return (
                            <div
                                key={index}
                                className="flex-shrink-0" 
                                style={{
                                    width: '90vw', // Each image takes up 90% of the viewport width
                                    margin: '0', // Spacing to slightly show the next image
                                }}>
                               
                                <div className="relative w-full h-screen"> {/* Set the width and height */}
                                    <Image
                                        src={imageUrl}
                                        alt={record.title || "Home Image"}
                                        fill // This replaces layout="fill"
                                        className="object-cover"
                                    />
                                     <p className="z-100 absolute bottom-0 px-8 text-xs py-4 text-center ">{record.title}</p> {/* Display the title */}
                                </div>
                               
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
