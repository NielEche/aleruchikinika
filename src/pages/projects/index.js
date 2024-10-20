import Link from 'next/link';
import useContentful from '../../lib/useContentful';

const ProjectsPage = () => {
  const { projects, loadingProjects } = useContentful();

  if (loadingProjects) {
    return <p>Loading projects...</p>;
  }

  return (
    <div>
      <h1>All Projects</h1>
      <div className="project-list">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <Link href={`/projects/${project.id}`} className="project-link">
              <div className="image-container">
                <img
                  src={project.cover}
                  alt={`${project.title} cover`}
                  className="project-image"
                />
                <h2 className="project-title">{project.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
