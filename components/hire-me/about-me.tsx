import React from "react";

export function AboutMe() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-medium text-foreground tracking-tight">
        About me
      </h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>
          Hello 👋, I’m <strong>Sankalpa (sanku)</strong>. I’m 21 years old and
          have been super excited about computers ever since I was a kid.
        </p>

        <p>
          I started programming back in <strong>2020</strong> during high
          school, where I dove into bug bounties and cybersecurity. Later, when
          I joined college in <strong>2022</strong>, I shifted my focus toward
          building web applications.
        </p>

        <p>I’m actively looking for a new opportunity.</p>
      </div>
    </section>
  );
}
