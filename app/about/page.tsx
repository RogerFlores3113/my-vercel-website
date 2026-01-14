export default function About() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Roger Flores</h1>
        <a 
          href="mailto:your.email@example.com" 
          className="text-blue-600 hover:underline text-lg"
        >
          rflores3113@gmail.com
        </a>
      </div>

      {/* Photo and Bio */}
      <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
        <img 
          src="/Roger_Website.jpg" 
          alt="Profile photo"
          className="w-96 h-96 rounded-lg object-cover"
        />
        <div className="flex-1">
          <p className="text-lg leading-relaxed text-gray-350">
            Hi! I'm Roger Flores, a Programmer who also likes AI research! This is my website. Its a bit of a stub at the moment, but I'm working on that.
          </p>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interests</h2>
            <ul className="text-gray-450 leading-relaxed">
                <li>I read a lot. Check my reading list for more. </li>
                <li>I enjoy board games - Terraforming Mars and BoTC mainly. </li>
                <li>Rock climbing is my activity of choice, but I also love hikes and flying!</li>
                <li>Still searching for the perfect morning green tea</li>
            </ul>
           
      </div>

      {/* What I'm Doing Now */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What I'm Doing Now</h2>
        <p className="text-gray-450 leading-relaxed">
          Currently, I'm training to get my Private Pilot's license.
          I'm also looking into Andrej Karpathy's {" "}
          <a href="https://github.com/karpathy/nanochat" className="text-blue-600 hover:underline text-lg"> 
             nanochat
          </a>. Specifically im exploring how to train a model meant for 40hrs of runtime on an 8xH100 GPU on my own 4080 Super, while still getting good results.
          
          Also Job searching for SWE/DS crossover roles. I'll update this line if that ever changes.
        </p>
      </div>
    </main>
  );
}