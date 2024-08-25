"use client";

import Editor from "@/components/Editor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-slate-100 to-slate-300 p-2">
      <section className="w-full">
        <Editor />
      </section>
    </main>
  );
}
