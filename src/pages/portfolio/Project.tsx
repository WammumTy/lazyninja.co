import { useParams, useNavigate } from "react-router-dom";
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === parseInt(id || '', 10));
  if (!project) {
    return (
      <PageLayout>
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold text-brown-800">Project Not Found</h1>
          <Button className="mt-6" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-4xl mx-auto px-6 md:px-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow mb-8"
          />
          <h1 className="text-4xl font-serif font-bold text-brown-800 mb-4">
            {project.title}
          </h1>
          <p className="text-brown-600 mb-2">Progress: {project.progress}</p>
          <p className="text-gray-700 text-lg mb-6">{project.description}</p>
          <p className="text-gray-600 text-base leading-relaxed">{project.details}</p>
          <Button className="mt-8" onClick={() => navigate(-1)}>
            ← Back to Projects
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Project;
