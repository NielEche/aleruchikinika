import { useState } from 'react';
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

  if (loadingProjects) {
    return <Loading />; 
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
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className='mainCon lg:px-20 px-10'>
      <div className='lg:flex justify-between mb-10'>
        <div className='w-full lg:px-16 py-10'>
          <h1 className='text-2xl orpheusproMedium'>{project.title}</h1>
          <div className='orpheusproMedium'>{documentToReactComponents(project.about)}</div>
        </div>
        <div className='w-full object-contain'>
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

      <div className='lg:grid grid-cols-2 gap-4 mt-10'>
        {project.images.map((image, idx) => (
          <Image
            className='w-full object-contain projectDoc py-4 cursor-pointer'
            key={idx}
            src={`https:${image}`} // Prepend https: if necessary
            alt={`${project.title} image ${idx + 1}`}
            width={400} // Specify width
            height={300} // Specify height
            onClick={() => openModal(image)} // Open modal on click
          />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='modal-overlay' onClick={closeModal}>
          <div className='modal-content'>
            <Image 
              src={`https:${selectedImage}`} // Prepend https: if necessary
              alt='Selected project image' 
              className='modal-image' 
              width={800} // Specify width for modal image
              height={600} // Specify height for modal image
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
