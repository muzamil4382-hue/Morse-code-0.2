{/* =======================================================
    BREADCRUMB + HERO
======================================================= */}

<section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">

  <nav
    className="mb-8 flex items-center gap-2 text-sm text-slate-500"
    aria-label="Breadcrumb"
  >
    <Link
      href="/"
      className="hover:text-green-600 transition-colors"
    >
      Home
    </Link>

    <span>/</span>

    <span className="font-medium text-slate-900">
      Morse Code Decoder
    </span>
  </nav>

  <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-green-50 p-8 md:p-12">

    <span className="inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700">
      Free Morse Code Decoder
    </span>

    <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
      Morse Code Decoder
    </h1>

    <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
  Decode Morse code into readable text instantly using our free
  <strong> Morse Code Decoder</strong>. It supports the
  <strong> International Morse Code (ITU)</strong> standard,
  automatic separator detection, character-by-character analysis,
  and accurate Morse-to-text conversion. If you also need to convert
  normal text into Morse code, try our{" "}
  <Link
    href="/"
    className="text-green-600 hover:underline font-semibold"
  >
    Morse Code Translator
  </Link>
  .
</p>

    <div className="mt-8 flex flex-wrap gap-3">

      <a
        href="#decoder-tool"
        className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
      >
        Decode Morse Code
      </a>

      <Link
        href="/learn-morse-code"
        className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-green-600 hover:text-green-600"
      >
        Learn Morse Code
      </Link>

    </div>

    <div className="mt-8 flex flex-wrap gap-3">

      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
        ✓ Free Forever
      </span>

      <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
        ✓ ITU Standard
      </span>

      <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
        ✓ Instant Decoder
      </span>

      <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
        ✓ Character Analysis
      </span>

      <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
        ✓ No Registration
      </span>

    </div>

    <div className="mt-10 grid gap-5 md:grid-cols-3">

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <h2 className="text-lg font-semibold text-slate-900">
          Accurate Decoding
        </h2>

        <p className="mt-3 text-slate-600">
          Decode dots and dashes using the International Morse Code
          standard maintained by the ITU.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <h2 className="text-lg font-semibold text-slate-900">
          Educational Analysis
        </h2>

        <p className="mt-3 text-slate-600">
          View character-by-character decoding to understand how each
          Morse symbol is translated into readable text.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">

        <h2 className="text-lg font-semibold text-slate-900">
          Beginner Friendly
        </h2>

        <p className="mt-3 text-slate-600">
          Learn Morse Code, telegraph communication, and decoding
          techniques through practical examples.
        </p>

      </div>

    </div>

  </div>

</section>
{/* =======================================================
    DECODER STATISTICS
======================================================= */}

<div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

  <div className="rounded-xl border border-slate-200 bg-white p-4">

    <p className="text-sm text-slate-500">
      Morse Tokens
    </p>

    <p className="mt-1 text-2xl font-bold text-slate-900">
      {totalCount}
    </p>

  </div>

  <div className="rounded-xl border border-slate-200 bg-white p-4">

    <p className="text-sm text-slate-500">
      Valid Symbols
    </p>

    <p className="mt-1 text-2xl font-bold text-green-600">
      {validCount}
    </p>

  </div>

  <div className="rounded-xl border border-slate-200 bg-white p-4">

    <p className="text-sm text-slate-500">
      Invalid Symbols
    </p>

    <p className="mt-1 text-2xl font-bold text-red-500">
      {invalidChars.length}
    </p>

  </div>

  <div className="rounded-xl border border-slate-200 bg-white p-4">

    <p className="text-sm text-slate-500">
      Output Characters
    </p>

    <p className="mt-1 text-2xl font-bold text-slate-900">
      {decodeResult.text.length}
    </p>

  </div>

</div>

{/* =======================================================
    QUICK EXAMPLES
======================================================= */}

<div className="mt-8">

  <h3 className="mb-4 text-lg font-semibold text-slate-900">
    Try an Example
  </h3>

  <div className="flex flex-wrap gap-3">

    <button
      onClick={() => setMorseInput(".... . .-.. .-.. ---")}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm hover:border-green-500 hover:text-green-600"
    >
      HELLO
    </button>

    <button
      onClick={() => setMorseInput("-- --- .-. ... .")}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm hover:border-green-500 hover:text-green-600"
    >
      MORSE
    </button>

    <button
      onClick={() => setMorseInput("--- .--. . -. .- ..")}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm hover:border-green-500 hover:text-green-600"
    >
      OPENAI
    </button>

    <button
      onClick={() => setMorseInput(".---- ..--- ...--")}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm hover:border-green-500 hover:text-green-600"
    >
      123
    </button>

    <button
      onClick={() => setMorseInput("--. --- --- --. .-.. .")}
      className="rounded-full border border-slate-200 px-4 py-2 text-sm hover:border-green-500 hover:text-green-600"
    >
      GOOGLE
    </button>

  </div>

</div>

{/* =======================================================
    DECODER BENEFITS
======================================================= */}

<div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6">

  <h3 className="text-xl font-bold text-slate-900">
    Why Use This Morse Code Decoder?
  </h3>

  <ul className="mt-5 space-y-3 text-slate-700">
  <li>
  ✓ Need to convert text into Morse Code? Try our{" "}
  <Link
    href="/"
    className="text-green-700 font-semibold hover:underline"
  >
    Morse Code Translator
  </Link>.
</li>
    <li>✓ Supports International Morse Code (ITU standard)</li>

    <li>✓ Automatic separator detection</li>

    <li>✓ Character-by-character decoding</li>

    <li>✓ Beginner-friendly educational explanations</li>

    <li>✓ Works on desktop and mobile devices</li>

    <li>✓ Free unlimited decoding</li>

  </ul>

</div>
{/* =======================================================
    WHAT IS MORSE CODE DECODING
======================================================= */}

<section className="py-16">

  <div className="mx-auto max-w-5xl">

    <h2 className="text-3xl font-bold text-slate-900">
      What Is Morse Code Decoding?
    </h2>

    <div className="mt-6 space-y-6 text-slate-700 leading-8">

      <p>
        Morse code decoding is the process of converting sequences of
        <strong> dots (.) </strong>
        and
        <strong> dashes (-) </strong>
        into readable letters,
        numbers,
        punctuation marks,
        and complete words.
        A Morse Code Decoder automatically recognizes each Morse symbol,
        compares it with the International Morse Code standard,
        and converts it into plain text.
      </p>

      <p>
        Modern Morse code decoders eliminate the need to manually memorize
        every Morse character.
        Instead of translating each signal by hand,
        software performs the decoding instantly while reducing errors.
        This makes Morse code easier to learn for beginners while also
        helping experienced radio operators verify messages quickly.
      </p>

      <p>

        If you also want to convert normal text into Morse code,
        try our{" "}

        <Link
          href="/morse-code-translator"
          className="text-green-600 hover:underline"
        >
          Morse Code Translator
        </Link>

        .

      </p>

    </div>

  </div>

</section>

{/* =======================================================
    HISTORY
======================================================= */}

<section className="py-16 bg-slate-50 rounded-3xl">

  <div className="mx-auto max-w-5xl px-6">

    <h2 className="text-3xl font-bold text-slate-900">

      History of Morse Code

    </h2>

    <div className="mt-8 space-y-8">

      <div>

        <h3 className="text-2xl font-semibold">

          Samuel Morse

        </h3>

        <p className="mt-4 leading-8 text-slate-700">

          Samuel Morse was an American inventor and artist who helped
          develop one of the world's first practical long-distance
          communication systems during the nineteenth century.
          His telegraph system transformed global communication by
          allowing messages to travel much faster than physical mail.

        </p>

      </div>

      <div>

        <h3 className="text-2xl font-semibold">

          Alfred Vail

        </h3>

        <p className="mt-4 leading-8 text-slate-700">

          Alfred Vail played a major role in refining the Morse code
          alphabet and improving the telegraph system.
          Many historians recognize his contribution to the efficient
          dot-and-dash patterns that later became widely adopted.

        </p>

      </div>

      <div>

        <h3 className="text-2xl font-semibold">

          International Morse Code

        </h3>

        <p className="mt-4 leading-8 text-slate-700">

          Over time,
          Morse code evolved into the International Morse Code standard,
          maintained by the International Telecommunication Union (ITU).
          Today it remains an internationally recognized communication
          system used in education,
          amateur radio,
          emergency training,
          aviation history,
          and maritime communication.

        </p>

      </div>

    </div>

  </div>

</section>

{/* =======================================================
    HOW DECODING WORKS
======================================================= */}

<section className="py-16">

  <div className="mx-auto max-w-5xl">

    <h2 className="text-3xl font-bold text-slate-900">

      How Morse Code Decoding Works

    </h2>

    <div className="mt-8 space-y-6 text-slate-700 leading-8">

      <p>

        Every Morse character has a unique sequence of dots and dashes.

        When you enter Morse code,
        the decoder first separates each symbol,
        then compares every sequence against the International Morse Code
        reference table.

      </p>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse rounded-2xl border border-slate-200">

          <thead>

            <tr className="bg-slate-50">

              <th className="border px-4 py-3 text-left">
                Morse
              </th>

              <th className="border px-4 py-3 text-left">
                Character
              </th>

              <th className="border px-4 py-3 text-left">
                Meaning
              </th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="border px-4 py-3 font-mono">
                .-
              </td>

              <td className="border px-4 py-3">
                A
              </td>

              <td className="border px-4 py-3">
                Letter A
              </td>

            </tr>

            <tr>

              <td className="border px-4 py-3 font-mono">
                -...
              </td>

              <td className="border px-4 py-3">
                B
              </td>

              <td className="border px-4 py-3">
                Letter B
              </td>

            </tr>

            <tr>

              <td className="border px-4 py-3 font-mono">
                .... . .-.. .-.. ---
              </td>

              <td className="border px-4 py-3">
                HELLO
              </td>

              <td className="border px-4 py-3">
                Word Example
              </td>

            </tr>

          </tbody>

        </table>

      </div>

      <p>

        Beginners can improve their decoding skills by practicing
        frequently and learning the timing rules used in International
        Morse Code.

        You can also study our{" "}

        <Link
          href="/morse-code-timing"
          className="text-green-600 hover:underline"
        >
          Morse Code Timing Guide
        </Link>

        {" "}to understand the spacing between dots,
        dashes,
        letters,
        and words.

      </p>

    </div>

  </div>

</section>
{/* =======================================================
    MORSE CODE VS BINARY CODE
======================================================= */}

<section className="py-16 bg-slate-50 rounded-3xl">

  <div className="mx-auto max-w-6xl px-6">

    <h2 className="text-3xl font-bold text-slate-900">
      Morse Code vs Binary Code
    </h2>

    <p className="mt-6 text-slate-700 leading-8">
      Morse Code and Binary Code both represent information using simple
      symbols, but they were designed for completely different purposes.
      Morse Code was developed for human communication over telegraph
      systems, while Binary Code is the foundation of modern digital
      computing and electronic devices.
    </p>

    <div className="mt-8 overflow-x-auto">

      <table className="w-full border-collapse rounded-2xl border border-slate-200">

        <thead>

          <tr className="bg-slate-50">

            <th className="border px-4 py-3 text-left">
              Feature
            </th>

            <th className="border px-4 py-3 text-left">
              Morse Code
            </th>

            <th className="border px-4 py-3 text-left">
              Binary Code
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>
            <td className="border px-4 py-3 font-semibold">Purpose</td>
            <td className="border px-4 py-3">Human communication</td>
            <td className="border px-4 py-3">Digital computing</td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-semibold">Symbols</td>
            <td className="border px-4 py-3">Dots and Dashes</td>
            <td className="border px-4 py-3">0 and 1</td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-semibold">Inventors</td>
            <td className="border px-4 py-3">
              Samuel Morse & Alfred Vail
            </td>
            <td className="border px-4 py-3">
              Based on work by Leibniz, Boole & Shannon
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-semibold">
              Main Use
            </td>
            <td className="border px-4 py-3">
              Telegraph & Radio
            </td>
            <td className="border px-4 py-3">
              Computers & Electronics
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-semibold">
              Length
            </td>
            <td className="border px-4 py-3">
              Variable
            </td>
            <td className="border px-4 py-3">
              Usually Fixed
            </td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-semibold">
              Readability
            </td>
            <td className="border px-4 py-3">
              Human Friendly
            </td>
            <td className="border px-4 py-3">
              Machine Friendly
            </td>
          </tr>

        </tbody>

      </table>

    </div>

    <p className="mt-6 text-slate-700 leading-8">

      Want to explore Binary Code?

      Visit our{" "}

      <Link
        href="/binary-code-translator"
        className="text-green-600 hover:underline"
      >
        Binary Code Translator
      </Link>

      {" "}to learn how computers represent text using bits and bytes.

    </p>

  </div>

</section>

{/* =======================================================
    WHERE MORSE CODE IS USED
======================================================= */}

<section className="py-16">

  <div className="mx-auto max-w-6xl">

    <h2 className="text-3xl font-bold text-slate-900">
      Where Is Morse Code Still Used?
    </h2>

    <div className="mt-10 grid gap-6 md:grid-cols-2">

      <div className="rounded-2xl border border-slate-200 p-6">

        <h3 className="text-xl font-semibold">
          Amateur Radio
        </h3>

        <p className="mt-4 text-slate-700 leading-7">
          Morse Code remains popular among amateur radio operators around
          the world because it allows reliable communication even under
          weak signal conditions.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 p-6">

        <h3 className="text-xl font-semibold">
          Emergency Communication
        </h3>

        <p className="mt-4 text-slate-700 leading-7">
          Morse Code is still taught as an emergency communication method
          because simple light, sound, or radio signals can transmit
          important information.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 p-6">

        <h3 className="text-xl font-semibold">
          Aviation History
        </h3>

        <p className="mt-4 text-slate-700 leading-7">
          Before modern navigation systems became common, Morse Code was
          widely used for identifying radio beacons and supporting aircraft
          navigation.
        </p>

      </div>

      <div className="rounded-2xl border border-slate-200 p-6">

        <h3 className="text-xl font-semibold">
          Maritime Communication
        </h3>

        <p className="mt-4 text-slate-700 leading-7">
          Ships historically relied on Morse Code for long-distance
          communication, especially before digital communication systems
          became widespread.
        </p>

      </div>

    </div>

  </div>

</section>

{/* =======================================================
    COMMON DECODING MISTAKES
======================================================= */}

<section className="py-16">

  <div className="mx-auto max-w-5xl">

    <h2 className="text-3xl font-bold text-slate-900">
      Common Morse Code Decoding Mistakes
    </h2>

    <div className="mt-8 space-y-6 text-slate-700 leading-8">

      <div>

        <h3 className="text-xl font-semibold text-slate-900">
          Missing Spaces
        </h3>

        <p>
          Proper spacing separates letters and words. Without spaces,
          multiple interpretations may be possible, reducing decoding
          accuracy.
        </p>

      </div>

      <div>

        <h3 className="text-xl font-semibold text-slate-900">
          Incorrect Symbols
        </h3>

        <p>
          Use only periods (.) for dots and hyphens (-) for dashes.
          Other symbols such as underscores or long dashes may produce
          invalid results.
        </p>

      </div>

      <div>

        <h3 className="text-xl font-semibold text-slate-900">
          Using Non-Standard Morse Code
        </h3>

        <p>
          This decoder follows the International Morse Code standard.
          Regional or historical variants may decode differently.
        </p>

      </div>

    </div>

  </div>

</section>
{/* =======================================================
    MORSE CODE EXAMPLES
======================================================= */}

<section className="py-16 bg-slate-50 rounded-3xl">

  <div className="mx-auto max-w-6xl px-6">

    <h2 className="text-3xl font-bold text-slate-900">
      Morse Code Decoding Examples
    </h2>

    <p className="mt-6 text-slate-700 leading-8">
      Practicing with real examples is one of the fastest ways to learn
      Morse Code. The table below shows how common Morse sequences are
      decoded into readable English text.
    </p>

    <div className="mt-8 overflow-x-auto">

      <table className="w-full border-collapse rounded-2xl border border-slate-200">

        <thead>

          <tr className="bg-slate-50">

            <th className="border px-4 py-3 text-left">
              Morse Code
            </th>

            <th className="border px-4 py-3 text-left">
              Decoded Text
            </th>

            <th className="border px-4 py-3 text-left">
              Description
            </th>

          </tr>

        </thead>

        <tbody>

          <tr>
            <td className="border px-4 py-3 font-mono">.... . .-.. .-.. ---</td>
            <td className="border px-4 py-3">HELLO</td>
            <td className="border px-4 py-3">Greeting</td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-mono">.-- --- .-. .-.. -..</td>
            <td className="border px-4 py-3">WORLD</td>
            <td className="border px-4 py-3">Common word</td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-mono">... --- ...</td>
            <td className="border px-4 py-3">SOS</td>
            <td className="border px-4 py-3">Emergency distress signal</td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-mono">.---- ..--- ...--</td>
            <td className="border px-4 py-3">123</td>
            <td className="border px-4 py-3">Numbers</td>
          </tr>

          <tr>
            <td className="border px-4 py-3 font-mono">-- --- .-. ... .</td>
            <td className="border px-4 py-3">MORSE</td>
            <td className="border px-4 py-3">Example word</td>
          </tr>

        </tbody>

      </table>

    </div>

  </div>

</section>

{/* =======================================================
    10 INTERESTING FACTS
======================================================= */}

<section className="py-16">

  <div className="mx-auto max-w-6xl">

    <h2 className="text-3xl font-bold text-slate-900">
      10 Interesting Facts About Morse Code
    </h2>

    <div className="mt-10 grid gap-6 md:grid-cols-2">

      {[
        "International Morse Code is recognized worldwide.",
        "SOS is represented as ... --- ...",
        "The letter E is a single dot.",
        "The letter T is a single dash.",
        "Morse Code is still used by amateur radio operators.",
        "International Morse Code replaced several older regional versions.",
        "Learning common patterns improves decoding speed.",
        "Morse Code can be transmitted using sound, light, or radio signals.",
        "Many emergency training programs still teach Morse Code basics.",
        "Modern decoders make learning Morse Code much easier than manual lookup.",
      ].map((fact, index) => (

        <div
          key={index}
          className="rounded-2xl border border-slate-200 p-6"
        >

          <h3 className="font-semibold text-green-600">
            Fact {index + 1}
          </h3>

          <p className="mt-3 text-slate-700 leading-7">
            {fact}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>

{/* =======================================================
    LEARNING TIPS
======================================================= */}

<section className="py-16 bg-slate-50 rounded-3xl">

  <div className="mx-auto max-w-5xl px-6">

    <h2 className="text-3xl font-bold text-slate-900">
      Tips for Learning Morse Code Faster
    </h2>

    <ul className="mt-8 list-disc space-y-4 pl-6 text-slate-700 leading-8">

      <li>
        Start by learning the most common letters such as E, T, A, N and O.
      </li>

      <li>
        Practice decoding short words before attempting complete sentences.
      </li>

      <li>
        Memorize common emergency signals such as SOS.
      </li>

      <li>
        Study character timing to improve listening accuracy.
      </li>

      <li>
        Practice regularly using our{" "}
        <Link
          href="/morse-code-translator"
          className="text-green-600 hover:underline"
        >
          Morse Code Translator
        </Link>.
      </li>

      <li>
        Learn the complete{" "}
        <Link
          href="/morse-code-alphabet"
          className="text-green-600 hover:underline"
        >
          Morse Code Alphabet
        </Link>{" "}
        to recognize every letter quickly.
      </li>

      <li>
        Test yourself with our{" "}
        <Link
          href="/morse-code-quiz"
          className="text-green-600 hover:underline"
        >
          Morse Code Quiz
        </Link>.
      </li>

    </ul>

  </div>

</section>
{/* =======================================================
    FREQUENTLY ASKED QUESTIONS
======================================================= */}

<section className="py-16">

  <div className="mx-auto max-w-5xl">

    <h2 className="text-3xl font-bold text-slate-900">
      Frequently Asked Questions
    </h2>

    <div className="mt-8 space-y-4">

      {faqs.map((faq, index) => (

        <details
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <summary className="cursor-pointer text-lg font-semibold text-slate-900">
            {faq.question}
          </summary>

          <p className="mt-4 leading-8 text-slate-700">
            {faq.answer}
          </p>

        </details>

      ))}

    </div>

  </div>

</section>

{/* =======================================================
    EXPLORE MORE
======================================================= */}

<section className="py-16 bg-slate-50 rounded-3xl">

  <div className="mx-auto max-w-6xl px-6">

    <h2 className="text-3xl font-bold text-slate-900">
      Explore More Morse Code Resources
    </h2>

    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {[
        {
          href: "/morse-code-translator",
          title: "Morse Code Translator",
          desc: "Convert text into Morse Code instantly."
        },
        {
          href: "/morse-code-alphabet",
          title: "Morse Code Alphabet",
          desc: "Complete A–Z Morse Code reference."
        },
        {
          href: "/morse-code-letters",
          title: "Morse Code Letters",
          desc: "Learn every Morse letter individually."
        },
        {
          href: "/morse-code-numbers",
          title: "Morse Code Numbers",
          desc: "Study numbers from 0 to 9."
        },
        {
          href: "/learn-morse-code",
          title: "Learn Morse Code",
          desc: "Step-by-step beginner's guide."
        },
        {
          href: "/morse-code-quiz",
          title: "Morse Code Quiz",
          desc: "Practice your decoding skills."
        },
        {
          href: "/morse-code-timing",
          title: "Morse Code Timing",
          desc: "Understand spacing and timing rules."
        },
        {
          href: "/binary-code-translator",
          title: "Binary Code Translator",
          desc: "Compare Morse Code with Binary."
        },
        {
          href: "/blog",
          title: "Morse Code Blog",
          desc: "Guides, tutorials and educational articles."
        }
      ].map((item) => (

        <Link
          key={item.href}
          href={item.href}
          className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-green-500 hover:shadow-md"
        >

          <h3 className="text-lg font-semibold text-slate-900">
            {item.title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {item.desc}
          </p>

        </Link>

      ))}

    </div>

  </div>

</section>

{/* =======================================================
    FINAL CTA
======================================================= */}

<section className="py-16">

  <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 p-10 text-center text-white">

    <h2 className="text-4xl font-bold">
      Ready to Master Morse Code?
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-green-50">

      Continue learning with our complete collection of Morse Code
      tools, educational guides, practice quizzes, timing charts,
      alphabet references, and interactive translators designed for
      beginners, students, radio enthusiasts, and professionals.

    </p>

    <div className="mt-10 flex flex-wrap justify-center gap-4">

      <Link
        href="/learn-morse-code"
        className="rounded-xl bg-white px-6 py-3 font-semibold text-green-700 hover:bg-green-100"
      >
        Learn Morse Code
      </Link>

      <Link
        href="/morse-code-translator"
        className="rounded-xl border border-white px-6 py-3 font-semibold text-white hover:bg-white hover:text-green-700"
      >
        Morse Code Translator
      </Link>

    </div>

  </div>

</section>