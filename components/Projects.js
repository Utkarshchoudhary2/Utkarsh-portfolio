export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#1e293b] rounded-xl shadow">
          <h3 className="text-xl font-semibold">Secure Login System</h3>
          <p className="text-gray-400 mt-2">Built a secure authentication system using encryption & hashing.</p>
        </div>
        <div className="p-6 bg-[#1e293b] rounded-xl shadow">
          <h3 className="text-xl font-semibold">Portfolio Website</h3>
          <p className="text-gray-400 mt-2">Developed a responsive portfolio with modern UI/UX.</p>
        </div>
        <div className="p-6 bg-[#1e293b] rounded-xl shadow">
          <h3 className="text-xl font-semibold">2D Platformer Game</h3>
          <p className="text-gray-400 mt-2">Created a Unity-based platformer game.</p>
        </div>
      </div>
    </section>
  );
}