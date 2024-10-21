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
        <div className="sliderMain">
            <div className="slider-container scroll-smooth">
                {shuffledRecords.map((record, index) => {
                    const imageUrl = record.image 
                        ? `https:${record.image}`
                        : '/placeholder.jpg'; // Fallback image if URL is missing

                    return (
                        <div 
                            key={index} 
                            className="slider-item" 
                            style={{ paddingLeft: index === 0 ? '50px' : '0' }} // Add padding for the first item
                        >
                            <Image
                                src={imageUrl}
                                alt={record.title || "Home Image"}
                                fill // This replaces layout="fill"
                                className="object-cover homeImage"
                            />
                            <p 
                                className={`absolute bottom-0 left-0 right-0 z-10 text-xs text-left text-white ${index === 0 ? 'pl-20' : ''} px-6 lg:px-16 py-4`} // Add padding for the first title
                            >
                                {record.title}
                            </p> {/* Display the title */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
