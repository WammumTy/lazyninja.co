import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Freelance = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16 bg-brown-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brown-800 mb-4">
            Intrested in working together?
          </h2>
          <div className="h-1 w-20 bg-brown-500 mx-auto mb-6"></div>
          <p className="text-gray-700 mb-4">
            I am working on bettering my local community by creating stunning, advanced, projects that will improve their digital ideinity of their business. If you are a small business looking for a way to stand out from the average business. 
          </p>
          <Button
            onClick={() => navigate('/inqury')} 
            className="bg-brown-700 hover:bg-brown-800 text-white"
            size="lg"
          >
            Fill out a inqury!
          </ Button>
        </div>
      </div>
    </section>
  );
};

export default Freelance;
