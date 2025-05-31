import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/projects';

const Projects = () => {
  const categories = ['All', ...new Set(projects.map(project => project.category))];
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <PageLayout>
      <section className="py-24 md:py-32 bg-brown-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-brown-800 mb-4">
              My Projects
            </h1>
            <div className="h-1 w-20 bg-brown-500 mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore my portfolio of work across various industries and disciplines. 
              Each project demonstrates my commitment to excellence and innovation.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={activeCategory === category 
                  ? "bg-brown-700 hover:bg-brown-800" 
                  : "border-brown-300 text-brown-700 hover:bg-brown-50"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-0 shadow-md card-hover">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-col">
                    <span className="text-brown-600 text-sm mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl font-semibold text-brown-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {project.description}
                    </p>
                    <Button 
                      onClick={() => navigate(`/projects/${project.id}`)} 
                      variant="ghost" 
                      className="text-brown-700 hover:text-brown-900 hover:bg-brown-50 p-0 mt-4 w-fit"
                    >
                      View Details →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
