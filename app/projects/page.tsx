import Image from "next/image";
// PROJECTS
export default function Projects() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      
      <div className="space-y-8">
        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl font-bold mb-2">Law Firm Lead Scraper</h2>
          <p className="text-gray-600 mb-3">Python, Selenium, openpyxl</p>
          
          <p className="mb-3">
            Automated web scraper that extracts contact information and firm details 
            for associates from law firm websites. Takes a URL as input and outputs 
            structured lead data in Excel format.
          </p>
          
          <p className="mb-3">
            Built with Selenium for dynamic content handling and data parsing. 
            Completed in 3 days as a practical automation tool.
          </p>
          
          <div className="flex gap-4 mt-4">
              Not on GitHub D:
          </div>
        </div>
      </div>
    </main>
  );
}
