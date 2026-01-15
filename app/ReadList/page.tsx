import Image from "next/image";
// PROJECTS
export default function ReadList() {
  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Reading List</h1>
      
      <p className="text-lg text-gray-500 mb-12 leading-relaxed">
        I list the books I've read in 2026, and my thoughts on them here.

      </p>
      
      <div className="space-y-8">
        

        <div className="border-l-4 border-blue-600 pl-4">
          <h2 className="text-2xl font-bold mb-2"><i>Foundation</i></h2>
          <p className="text-gray-500 mb-3">Isaac Asimov</p>

          <p className="mb-3">
            The characters have 1950s vibes - cigars, all men in charge, the way they talk.
            Reminds me a lot of <i>Star Trek's</i> original series, and the <i>Dune</i> books. 
            Unusual in that there isnt really a main character. 
            Worth a read, it's fun to see how science fiction started!

          </p>

          <div className="flex gap-4 mt-4 text-gray-500">
            I haven't finished this yet
          </div>

        </div>

      </div>
    </main>
  );
}