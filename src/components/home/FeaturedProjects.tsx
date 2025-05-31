import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { projects } from '@/data/projects';

const FeaturedProjects = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <h2 className="section-title">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl">
            Explore some of our recent work that showcases our approach to design and development.
            Each project represents our commitment to quality and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} className="group cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
              <div className="overflow-hidden rounded-lg shadow-md mb-4 aspect-[4/3] card-hover">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-brown-600 text-sm mb-1">
                  {project.category}
                </span>
                <h3 className="font-serif text-xl font-semibold text-brown-900 group-hover:text-brown-700 transition-colors">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            onClick={() => navigate('/projects')} 
            variant="outline" 
            className="border-brown-600 text-brown-800 hover:bg-brown-50"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
