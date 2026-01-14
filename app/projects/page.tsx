import Image from "next/image";
// PROJECTS
export default function Projects() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      
      <p className="text-lg text-gray-500 mb-12 leading-relaxed">
        My projects are always built with purpose—either solving real problems for people 
        I know, or because they're genuinely something I found interesting. Here's what I've been working on.

      </p>
      
      <div className="space-y-8">
        

        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl font-bold mb-2">Law Firm Lead Scraper</h2>
          <p className="text-gray-600 mb-3">Python | Selenium</p>

          <p className="mb-3">
            Automated web scraper that extracts contact information and firm details 
            for associates from law firm websites. Takes a URL as input and outputs 
            structured lead data in Excel format.
          </p>

          <p className="mb-3">
            Built with Selenium for dynamic content handling and data parsing. 
            Completed in 3 days as a practical automation tool.
          </p>

          <div className="flex gap-4 mt-4 text-gray-500">
            Not on GitHub D:
          </div>
        </div>

        <div className="border-l-4 border-green-600 pl-4">
          <h2 className="text-2xl font-bold mb-2">Minecraft Escape Room</h2>
          <p className="text-gray-600 mb-3">Minecraft | JSON | Game Design | Project planning</p>

          <p className="mb-3">
            Custom-built "escape room" (adventure map w/puzzles) experience in Minecraft featuring command blocks,
            datapacks, and narrative elements. Built alongside a friend, for fun! 
            While this is not traditional coding, the thousands of connected command blocks made for a challenging design! 
            Even made a whole google drive folder to coordinate planning and keep things in-order
          </p>

          <p className="mb-3">
            I've completed one escape room. 4-hours long. The second is still in-progress, probably finished sometime 2026, and is much larger
          </p>

          <div className="flex gap-4 mt-4 text-gray-500">
            Playable world file available on request, email me
          </div>
        </div>
      </div>
    </main>
  );
}