"use client";

import MorseTranslatorTool from "./morse-translator-tool";

export default function HomeClient() {
  return (
    <div>
      {/* Hero Section moved directly below the Tool with green background matching CTA */}
      <section className="w-full bg-[#006633] px-4 py-12 text-center text-white sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
            Free Online Morse Code Translator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-emerald-100 sm:text-base">
            Looking to turn text into code? Our Free Morse Code translator enables
            you to turn alphabets, numbers and punctuations into Morse Code. You
            can use audio or tapping to convert morse into text and vice versa.
          </p>
        </div>
      </section>
      {/* Morse Translator Tool component */}
      <MorseTranslatorTool />

      
    </div>
  );
}