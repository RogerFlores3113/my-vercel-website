import Image from "next/image";
// PROJECTS
// TODO: put book images in here
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

        </div>


        <div className="border-l-4 border-green-600 pl-4">
          <h2 className="text-2xl font-bold mb-2"><i>A Random Walk Down Wall Street</i></h2>
          <p className="text-gray-500 mb-3">Burton Malkiel</p>

          <p className="mb-3">
            A classic must-read for anyone looking into investing in stocks, or so i've been told.
            I agree, this is a phenominal book, easy to read, and gives the reader a great set of tools to 
            make good decisions when investing. Well worth the time spent!
          </p>

        </div>


        <div className="border-l-4 border-green-600 pl-4">
          <h2 className="text-2xl font-bold mb-2"><i>Runnin' Down a Dream</i></h2>
          <p className="text-gray-500 mb-3">Bill Gurley</p>

          <p className="mb-3">
            Good read, has strong advice that makes sense for many. 
            Advocates finding your obsession and turning that into a career, which i largely agree with.
            Full of example success stories.
            
            The author shared a list of self-improvement and general knowledge book he found helpful to success, 
            and this list I believe to be worth its weight in gold.

          </p>

        </div>

      </div>
    </main>
  );
}