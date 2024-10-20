import Link from 'next/link';
import useContentful from '../../lib/useContentful';
import "../../partials/projects.css";
import Loading from '../../app/components/Loading';


const ProjectsPage = () => {
  const { projects, loadingProjects } = useContentful();

  if (loadingProjects) {
    return <Loading />; 
  }

  return (
    <div className='mainCon lg:px-20 px-10'>
      <h1 className='py-10 text-xl orpheusproMedium'>Projects</h1>
      <div className="project-list lg:grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <Link href={`/projects/${project.id}`} className="project-link">
              <div className="image-container">
                <img
                  src={project.cover}
                  alt={`${project.title} cover`}
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
