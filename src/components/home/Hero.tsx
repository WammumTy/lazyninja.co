import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative h-[85vh] flex items-center bg-white hero-gradient">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10"></div>
        <img 
          src="/pics/b4775d2f-42c7-48e8-869b-6d4670816c49.webp"
          alt="Ninja Developer"
          className="absolute right-0 top-0 h-full object-cover sm:object-contain object-right z-0"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-20">
        <div className="max-w-xl">
          <h5 className="text-brown-600 font-medium mb-2 animate-fade-in [animation-delay:200ms]">
            Digital Craftsmanship
          </h5>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-brown-900 leading-tight mb-4 animate-fade-in [animation-delay:400ms]">
            Building Digital <span className="relative">
              <span className="relative z-10">Experiences</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-brown-200 -z-10"></span>
            </span> With Purpose
          </h1>
          <p className="text-gray-700 text-lg mb-8 max-w-lg animate-fade-in [animation-delay:600ms]">
            I blend creativity and technology to craft stunning websites and applications 
            that deliver exceptional user experiences and drive business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:800ms]">
            <Button 
              onClick={() => navigate('/projects')} 
              className="bg-brown-700 hover:bg-brown-800 text-white"
              size="lg"
            >
              View My Work
            </Button>
            <Button 
              onClick={() => navigate('/contact')} 
              variant="outline" 
              className="border-brown-600 text-brown-700 hover:bg-brown-50"
              size="lg"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
