import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useContentful from '../../lib/useContentful';

const Loading = () => {
    const { projects, loadingProjects } = useContentful();
    const [randomImages, setRandomImages] = useState([]);

    useEffect(() => {
        if (!loadingProjects && projects.length > 0) {
            // Get random images from the projects
            const allImages = projects.flatMap(project => project.images);
            const shuffledImages = shuffleArray(allImages);
            setRandomImages(shuffledImages.slice(0, 3)); // Get 3 random images
        }
    }, [loadingProjects, projects]);

    // Utility function to shuffle an array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    return (
        <div className="mainSec flex items-center justify-center min-h-screen bg-black relative">
            <div className="grid grid-cols-3 gap-4">
                {!loadingProjects && randomImages.length > 0 ? (
                    randomImages.map((image, index) => (
                        <div key={index} className="w-10 h-20 relative">
                            <Image
                                src={image}
                                alt={`Loading project image ${index + 1}`}
                                layout="fill"
                                className="object-cover"
                            />
                        </div>
                    ))
                ) : (
                    // Placeholder skeletons (e.g., simple gray boxes or a spinner)
                    Array(3).fill().map((_, index) => (
                        <div key={index} className="w-10 h-20 bg-gray-700 animate-pulse"></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Loading;
