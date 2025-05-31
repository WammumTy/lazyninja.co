import { Card, CardContent } from "@/components/ui/card";
import { aboutMe } from "@/data/aboutMe";


const AboutSection = () => {

  return (
    <section className="py-16 md:py-24 bg-brown-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-800 mb-4">
            A Little About Me
          </h2>
          <div className="h-1 w-20 bg-brown-500 mx-auto mb-6"></div>
          <p className="text-gray-700">
            I’m a curious and driven individual who enjoys solving problems, collaborating with others,
            and constantly learning. Here's a glimpse into my background and what excites me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {aboutMe.map((item, index) => (
            <Card key={index} className="bg-white border-0 shadow-md overflow-hidden card-hover">
              <CardContent className="p-6">
                {item.icon}
                <h3 className="font-serif text-xl font-semibold text-brown-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
