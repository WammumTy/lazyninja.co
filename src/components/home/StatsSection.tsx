import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

const StatsSection = () => {
  const currentYear = new Date().getFullYear();
  const completedCount = projects.filter(p => p.progress === "Completed").length;
  const inProgressCount = projects.filter(p => p.progress === "In Progress").length;
  const yearsExperience = currentYear - 2022;
  const stats = [
    { value: completedCount, label: "Projects Completed", suffix: "+" },
    { value: yearsExperience, label: "Years Experience", suffix: "+" },
    { value: inProgressCount, label: "Projects in Progress", suffix: "+" }
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("stats-section");
      if (!section || hasAnimated) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        setHasAnimated(true);
        stats.forEach((stat, index) => {
          const duration = 2000; // 2 seconds
          const interval = 20; // update every 20ms
          const steps = duration / interval;
          const increment = stat.value / steps;
          let counter = 0;
          let currentCount = 0;

          const timer = setInterval(() => {
            counter++;
            currentCount += increment;
            setCounters(prev => {
              const newCounters = [...prev];
              newCounters[index] = Math.min(Math.floor(currentCount), stat.value);
              return newCounters;
            });

            if (counter >= steps) {
              clearInterval(timer);
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = stat.value;
                return newCounters;
              });
            }
          }, interval);
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial render

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated, stats]);

  return (
    <section id="stats-section" className="py-16 bg-brown-800 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-4xl md:text-5xl font-bold font-serif mb-2">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-brown-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
