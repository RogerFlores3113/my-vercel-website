import Link from "next/link";

export default function About() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Roger Flores</h1>
        <a
          href="mailto:rflores3113@gmail.com"
          className="text-blue-500 hover:text-blue-400 hover:underline text-lg transition-colors"
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
        <div className="flex-1 space-y-4">
          <p className="text-lg leading-relaxed text-gray-300">
            Hi! I&apos;m Roger Flores, a Programmer who also likes AI research
            and customer interactions! This is my website. It&apos;s a bit of a
            stub at the moment, but I&apos;m working on that.
          </p>
          <p className="text-lg leading-relaxed text-gray-300">
            Check out my latest project{" "}
            <a
              href="https://podium-beta.vercel.app/"
              className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
            >
              here
            </a>
            !
          </p>
          <p className="text-lg leading-relaxed font-semibold">
            Job searching for Software Engineering / AI Engineering roles,
            contact me if interested!
          </p>
        </div>
      </div>

      {/* Interests Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Interests</h2>
        <ul className="text-gray-400 leading-relaxed space-y-2 list-disc list-inside">
          <li>I read a lot. Check my reading list for more.</li>
          <li>
            I enjoy board games — Terraforming Mars and BoTC mainly.
          </li>
          <li>
            Rock climbing is my activity of choice, but I also love hikes and
            flying!
          </li>
          <li>Still searching for the perfect morning green tea.</li>
        </ul>
      </div>

      {/* What I'm Doing Now */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">What I&apos;m Doing Now</h2>
        <div className="text-gray-400 leading-relaxed space-y-4">
          <p>
            Working on an LLM assistant, found{" "}
            <Link
              href="https://podium-beta.vercel.app/"
              className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
            >
              here
            </Link>
            .
          </p>
          <p>I&apos;m training to get my Private Pilot&apos;s license.</p>
          <p>
            Looking into Andrej Karpathy&apos;s{" "}
            <a
              href="https://github.com/karpathy/nanochat"
              className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
            >
              nanochat
            </a>
            . Specifically, I&apos;m exploring how to train a model meant for
            40hrs of runtime on an 8xH100 GPU on my own 4080 Super, while still
            getting good results.
          </p>
        </div>
      </div>
    </main>
  );
}