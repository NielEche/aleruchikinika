import { useRouter } from 'next/router';
import useContentful from '../../lib/useContentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const ProjectDetail = () => {
  const { query } = useRouter();
  const { id } = query;
  const { projects, loadingProjects } = useContentful();

  if (loadingProjects) {
    return <p>Loading project...</p>;
  }

  // Find the project by ID
  const project = projects.find((proj) => proj.id === id);

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <div>{documentToReactComponents(project.about)}</div>
      <img src={project.cover} alt={`${project.title} cover`} />
      <div>
        {project.images.map((image, idx) => (
          <img key={idx} src={image} alt={`${project.title} image ${idx + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
