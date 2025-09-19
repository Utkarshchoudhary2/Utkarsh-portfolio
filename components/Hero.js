import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function Hero() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-start px-8 md:px-20"
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "#0b0f19" },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            move: { enable: true, speed: 1 },
            links: { enable: true, color: "#3b82f6" }
          }
        }}
        className="absolute inset-0 -z-10"
      />

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-bold"
      >
        Hi — I'm <span className="text-blue-400">Utkarsh Chaudhary</span>
      </motion.h1>
      <p className="mt-6 text-gray-400 max-w-lg leading-relaxed">
        Aspiring Software Developer • Web, Cybersecurity & Game Design.  
        Diploma + B.Tech student building modern, secure and interactive experiences.
      </p>
      <a
        href="/resume.pdf"
        target="_blank"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition"
      >
        View Resume
      </a>
    </section>
  );
}