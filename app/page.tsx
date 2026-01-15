export default function Home() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold mb-4">Roger Flores</h1>
        <p className="text-2xl text-gray-600 mb-6">
          Programmer exploring the intersection of software engineering and AI research
        </p>
        <div className="flex gap-6 text-lg">
          <a 
            href="mailto:rflores3113@gmail.com" 
            className="text-blue-600 hover:underline"
          >
            Email
          </a>
          <a 
            href="https://github.com/RogerFlores3113" 
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/roger-flores-3113-nu/" 
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            LinkedIn
          </a>
          <a 
            href="/rflores_resume.pdf" 
            className="text-blue-600 hover:underline"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Quick Intro */}
      <div className="mb-16">
        <p className="text-lg leading-relaxed text-gray-600 mb-4">
          I build tools to solve real problems and explore AI when its interesting, not just a hot topic.
          Currently searching for SWE/Data Science crossover roles where I can apply both 
          technical depth and creative problem-solving.
        </p>
        <p className="text-lg leading-relaxed text-gray-600">
          Right now: trying to train LLMs on consumer hardware, and working toward my private pilot's 
          license.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl font-bold mb-2">Recent Projects</h2>
          <p className="text-gray-600 mb-3">
            Building everything from Minecraft escape rooms to web scrapers that automate lead generation.
          </p>
          <a href="/projects" className="text-blue-600 hover:underline">
            View all public projects →
          </a>
        </div>

        <div className="border-l-4 border-purple-600 pl-4">
          <h2 className="text-2xl font-bold mb-2">About Me</h2>
          <p className="text-gray-600 mb-3">
            Board games, rock climbing, aviation, and the search for the best tea.
          </p>
          <a href="/about" className="text-blue-600 hover:underline">
            More about me →
          </a>
        </div>
      </div>
    </main>
  );
}