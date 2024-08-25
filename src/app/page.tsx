import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-pink-100 p-24">
      <section className="text-center">
        <h1 className="text-5xl font-bold text-slate-900">
          Streamline Your Transcript Annotation and Summarization
        </h1>
        <p className="mt-4 text-xl text-gray-700">
          Our powerful tool helps you efficiently annotate, manage, and
          summarize sales transcripts, empowering your team to make data-driven
          decisions.
        </p>
        <div className="mt-8">
          <Link href="/editor">
            <span className="btn btn-primary">Get Started</span>
          </Link>
          <Link href="/">
            <span className="btn btn-secondary ml-4">Learn More</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
