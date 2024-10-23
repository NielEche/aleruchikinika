import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import useContentful from '../../lib/useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import "../../partials/projects.css";
import Loading from '../../app/components/Loading';
import Image from 'next/image';

const ProjectDetail = () => {
  const { query } = useRouter();
  const { id } = query;
  const { projects, loadingProjects } = useContentful();

  // State to manage modal visibility and selected image
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1); // State for zoom level
  const scrollRef = useRef(null); // Reference to the scrolling container

  // Handle loading state
  if (loadingProjects) {
    return <Loading projects={projects} />; // Pass project images to Loading component
  }

  // Find the project by ID
  const project = projects.find((proj) => proj.id === id);

  if (!project) {
    return <p>Project not found.</p>;
  }

  // Function to open modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setZoomLevel(1); // Reset zoom level when opening the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setZoomLevel(1); // Reset zoom level on close
  };

  // Handle horizontal scroll on mouse wheel
  const handleWheel = (event) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += event.deltaY; // Scroll left/right based on wheel movement
      event.preventDefault(); // Prevent default scroll behavior
    }
  };

  // Zoom in function
  const zoomIn = () => {
    setZoomLevel((prev) => prev + 0.1); // Increase zoom level
  };

  // Zoom out function
  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.1, 1)); // Decrease zoom level but not below 1
  };

  return (
    <div className='mainSec mainCon lg:px-20 px-10'>
      <div className='lg:flex justify-between mb-10'>
        <div className='w-full lg:px-16 py-10'>
          <h1 className='text-2xl orpheusproMedium'>{project.title}</h1>
          <div className='orpheusproMedium'>{documentToReactComponents(project.about)}</div>
        </div>
        <div className='w-full object-contain pHouse'>
          <Image 
            className='object-contain projectMain flex justify-center w-full' 
            src={`https:${project.cover}`} // Make sure to prepend https:
            alt={`${project.title} cover`} 
            width={800} // Specify width
            height={600} // Specify height
            onClick={() => openModal(project.cover)} 
          />
        </div>
      </div>
      <hr />

      <div 
        className='flex overflow-x-scroll overflow-auto mt-10' 
        onWheel={handleWheel} // Add wheel event to the container
        ref={scrollRef} // Reference to the container
      >
        {project.images.map((image, idx) => (
          <div className='flex-shrink-0' key={idx}> {/* Set width for each image container */}
            <Image
              className='w-full object-contain projectDoc py-4 cursor-pointer'
              src={`https:${image}`} // Prepend https: if necessary
              alt={`${project.title} image ${idx + 1}`}
              width={400} // Specify width
              height={300} // Specify height
              onClick={() => openModal(image)} // Open modal on click
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <Image 
              src={`https:${selectedImage}`} // Prepend https: if necessary
              alt='Selected project image' 
              className='modal-image' 
              width={800} // Specify width for modal image
              height={600} // Specify height for modal image
              style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s' }} // Apply zoom
            />
            <button 
               className="absolute top-0 right-2  text-3xl text-red-700 p-2 rounded-full" 
              onClick={closeModal}
            >
              &times; {/* Close button */}
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              <button 
                className="bg-red-700 text-white px-2 text-xs py-1 rounded" 
                onClick={zoomOut}
              >
                - {/* Zoom Out Button */}
              </button>
              <button 
                className="bg-red-700 text-xs text-white px-2 py-1 rounded" 
                onClick={zoomIn}
              >
                + {/* Zoom In Button */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
