import Link from 'next/link';
import useContentful from '../../lib/useContentful';
import "../../partials/projects.css";
import Loading from '../../app/components/Loading';
import Image from 'next/image';


const ProjectsPage = () => {
  const { projects, loadingProjects } = useContentful();

  if (loadingProjects) {
    return <Loading />; 
  }

  const formatImageUrl = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https:${url}`;
  };

  return (
    <div className='mainCon lg:px-20 px-10'>
      <h1 className='py-10 text-xl orpheusproMedium'>Projects</h1>
      <div className="project-list lg:grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <Link href={`/projects/${project.id}`} className="project-link">
              <div className="image-container">
              <Image
              src={formatImageUrl(project.cover)} // Use the utility function to format the URL
              alt={`${project.title} cover`}
              fill
              className="project-image"
            />
                <h2 className="project-title orpheusproMedium">{project.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
