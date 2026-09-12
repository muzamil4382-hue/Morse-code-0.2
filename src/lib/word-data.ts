export interface WordSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface WordFAQ {
  question: string;
  answer: string;
}

export interface RelatedWord {
  word: string;
  slug: string;
  morse: string;
}

export interface ExternalSource {
  title: string;
  url: string;
  description: string;
}

export interface WordPageData {
  word: string;
  morseStr: string;
  title: string;
  metaTitle: string;
  description: string;
  slug: string;
  intro: string;
  sections: WordSection[];
  faqs: WordFAQ[];
  relatedWords: RelatedWord[];
  sources: ExternalSource[];
}

export const wordPages: WordPageData[] = [
  {
    word: "HI",
    morseStr: ".... ..",
    title: "Hi in Morse Code",
    metaTitle: "Hi in Morse Code (.... ..) - Meaning, Translation & Guide",
    description:
      "Learn how to write Hi in Morse code: .... .. Get the exact letter-by-letter translation, spacing rules, pronunciation tips, common mistakes, and simple ways to practice this short greeting.",
    slug: "hi-in-morse-code",
    intro:
      "Hi in Morse code is written as .... .., with H represented by four dots (....) and I represented by two dots (..). Because the word uses only dots, it is one of the easiest English greetings for a beginner to learn. On this page, you will find the exact translation, a clear letter-by-letter breakdown, correct spacing, timing guidance, practical examples, common mistakes, and ways to practice sending and receiving HI accurately.",
    sections: [
      {
        heading: "What Is HI in Morse Code?",
        paragraphs: [
          "The International Morse code representation of HI is .... ... The first group, ...., is the letter H. The second group, .., is the letter I. A space between the two groups shows that they are separate characters.",
          "The spelling is simple, but the spacing still matters. Morse code is not just a collection of dots and dashes; the timing and separation between signals carry information. When you write HI for learning or display, keep a clear character space between H and I.",
        ],
      },
      {
        heading: "HI Letter-by-Letter Breakdown",
        paragraphs: [
          "Learning the two characters individually makes the complete word much easier to remember. Here is the full breakdown:",
        ],
        bullets: [
          "H = .... — four dots",
          "I = .. — two dots",
          "HI = .... .. — H followed by I",
        ],
      },
      {
        heading: "Why HI Is a Good Beginner Morse Word",
        paragraphs: [
          "HI is useful for beginners because neither letter contains a dash. That makes it a comfortable first exercise for learning the difference between individual signals, character boundaries, and overall rhythm.",
          "Once you can recognize HI without consciously counting every dot, move to words that introduce dashes. This helps you develop recognition by sound and rhythm rather than relying only on visual translation.",
        ],
      },
      {
        heading: "How to Send HI in Morse Code",
        paragraphs: [
          "When sending HI with a key, buzzer, sound, or another signaling method, focus on consistent timing. A dot is the basic short signal. The gaps inside a character are shorter than the gap between characters, so H should be heard as a group of four closely timed dots before the character gap and I as two closely timed dots.",
          "For a beginner exercise, send H slowly, pause for the character boundary, and then send I. As your timing becomes more natural, increase the speed while keeping the pattern distinct.",
        ],
        bullets: [
          "Send H as four short signals: ....",
          "Leave a clear character gap.",
          "Send I as two short signals: ..",
          "Practice until the two-character rhythm becomes automatic.",
        ],
      },
      {
        heading: "How to Recognize HI by Sound",
        paragraphs: [
          "Morse code is designed to be learned as an audible rhythm as well as a written code. HI has a particularly simple rhythm because it contains only dots. Listen for a group of four short signals, followed by a character gap, then a group of two short signals.",
          "A useful practice method is to listen first and look at the answer afterward. This trains your brain to recognize the character pattern directly instead of translating each dot one at a time.",
        ],
      },
      {
        heading: "Common Mistakes When Writing HI",
        paragraphs: [
          "The most common error is using the wrong number of dots. H is four dots and I is two dots. Another mistake is removing the space between the characters, which makes the written sequence ambiguous to a learner.",
          "It is also easy to confuse HI with other short dot-based combinations when practicing quickly. Check the characters separately whenever you are unsure, then rebuild the word using the correct character spacing.",
        ],
        bullets: [
          "Do not write H as three or five dots.",
          "Do not change I from two dots to one dot.",
          "Do not join .... and .. into one uninterrupted character.",
          "Keep the Morse pattern separate from the ordinary spelling of the word.",
        ],
      },
      {
        heading: "HI in Everyday Morse Code Projects",
        paragraphs: [
          "Because HI is short, it works well in Morse code learning exercises, greeting demonstrations, classroom activities, craft projects, puzzles, and personal messages. It is also useful when testing a new Morse code translator or audio setup because the pattern is easy to verify by eye and ear.",
          "If you are creating a design that displays HI in Morse code, use the exact sequence .... .. and make the character boundary visually clear. For a longer message, translate each word separately and preserve the word boundaries consistently.",
        ],
      },
      {
        heading: "How to Practice HI in Morse Code",
        paragraphs: [
          "Start with visual practice: look at .... .. and say the character names mentally. Then reverse the exercise by seeing H and I and writing their Morse patterns. After that, add listening practice so you can recognize the rhythm without seeing the written code.",
          "For a broader learning path, practice HI alongside other common words such as YES, NO, and HELP ME. Comparing short words helps you notice how different dot-and-dash combinations create distinct rhythms.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is Hi in Morse code?",
        answer:
          "Hi in International Morse code is .... ... H is four dots (....) and I is two dots (..), with a character space between them.",
      },
      {
        question: "How do you spell HI in Morse code?",
        answer:
          "Spell HI as H = .... and I = .. The complete sequence is .... ..",
      },
      {
        question: "Why does HI have only dots in Morse code?",
        answer:
          "The letters H and I are both represented entirely by dots in International Morse code. H is .... and I is .., so the complete word contains no dashes.",
      },
      {
        question: "How do you send HI in Morse code?",
        answer:
          "Send four short signals for H, leave a character gap, then send two short signals for I. Written form: .... ..",
      },
      {
        question: "Is HI easy for Morse code beginners?",
        answer:
          "Yes. HI is a short two-letter word and both characters use only dots, making it a convenient exercise for learning basic timing and character spacing.",
      },
      {
        question: "Can I use HI in a Morse code flashlight message?",
        answer:
          "Yes, Morse code can be represented with light. HI would use four short flashes for H and two short flashes for I, with a clear gap between the characters.",
      },
      {
        question: "What is the difference between HI and HELLO in Morse code?",
        answer:
          "HI is a two-letter greeting: .... ... HELLO is longer and contains five letters: .... . .-.. .-.. ---. Both can be translated using the same International Morse character set.",
      },
      {
        question: "Where can I practice HI in Morse code?",
        answer:
          "You can practice by writing the pattern, listening to it as audio, sending it with a Morse key, or using a Morse code translator to check your work.",
      },
    ],
    relatedWords: [
      { word: "Help Me", slug: "help-me-in-morse-code", morse: ".... . .-.. .--. / -- ." },
      { word: "Yes", slug: "yes-in-morse-code", morse: "-.-- . ..." },
      { word: "No", slug: "no-in-morse-code", morse: "-. ---" },
      { word: "Hello", slug: "blog/hello-in-morse-code-and-common-phrases", morse: ".... . .-.. .-.. ---" },
    ],
    sources: [
      { title: "ITU - International Morse Code Recommendation M.1677", url: "https://www.itu.int/rec/R-REC-M.1677", description: "International reference for the International Morse code character set." },
      { title: "ARRL - Morse Code Characters", url: "https://www.arrl.org/code-characters", description: "Reference for checking individual Morse code characters." },
      { title: "ARRL - Learning Morse Code", url: "https://www.arrl.org/learning-morse-code", description: "Practical learning resources for developing Morse code skills." },
    ],
  },

  {
    word: "HELP ME",
    morseStr: ".... . .-.. .--. / -- .",
    title: "Help Me in Morse Code",
    metaTitle: "Help Me in Morse Code (.... . .-.. .--. / -- .) - Complete Guide",
    description:
      "Learn how to write Help Me in Morse code: .... . .-.. .--. / -- . See the complete letter breakdown, word spacing, SOS comparison, signaling tips, common mistakes, and practice methods.",
    slug: "help-me-in-morse-code",
    intro:
      "Help Me in Morse code is written as .... . .-.. .--. / -- ., where HELP and ME are separated by a word boundary. It is a useful phrase to learn because it combines several different Morse characters, but it is important to understand that the phrase HELP ME is not itself the standardized distress signal SOS. This guide covers the exact translation, letter-by-letter spelling, spacing, signaling methods, common mistakes, and the difference between an ordinary Morse phrase and a recognized distress signal.",
    sections: [
      {
        heading: "What Is HELP ME in Morse Code?",
        paragraphs: [
          "The complete International Morse code translation of HELP ME is .... . .-.. .--. / -- .. Each letter has its own Morse pattern, and the slash is commonly used in written Morse to make the boundary between the two English words easy to see.",
          "The phrase contains six letters in total: H, E, L, P, M, and E. Learning it one character at a time is much easier than trying to memorize the entire sequence as one long string.",
        ],
      },
      {
        heading: "HELP ME Letter-by-Letter Breakdown",
        paragraphs: [
          "Use this breakdown to verify every character before combining the phrase:",
        ],
        bullets: [
          "H = ....",
          "E = .",
          "L = .-..",
          "P = .--.",
          "M = --",
          "E = .",
          "HELP ME = .... . .-.. .--. / -- .",
        ],
      },
      {
        heading: "Why the Word Boundary Matters",
        paragraphs: [
          "In written Morse, spaces normally separate individual characters, while a slash is commonly used by learners and writers to represent a space between words. That is why HELP ME is shown as .... . .-.. .--. / -- . rather than as one uninterrupted sequence.",
          "When transmitting Morse by sound or light, timing is used instead of printed slashes. The receiver needs to distinguish the gaps between parts of a character, between characters, and between words. Clear timing is therefore just as important as knowing the correct dot-and-dash patterns.",
        ],
      },
      {
        heading: "HELP ME vs. SOS in Morse Code",
        paragraphs: [
          "This distinction is important. HELP ME is an ordinary English phrase encoded into Morse code. SOS is a recognized international distress signal. The two should not be treated as interchangeable simply because both can communicate a need for assistance in some contexts.",
          "If someone is in a real emergency, Morse code should not replace an available emergency service or other reliable method of contacting help. The appropriate emergency procedure depends on the situation, location, and communication equipment available.",
        ],
        bullets: [
          "HELP ME = an English phrase encoded in Morse code.",
          "SOS = an internationally recognized distress signal.",
          "Do not assume an ordinary Morse phrase has the same standardized meaning as SOS.",
        ],
      },
      {
        heading: "How to Send HELP ME with Sound or Light",
        paragraphs: [
          "Morse code can be represented with sound, light, or other suitable signals. For practice, send each character clearly and preserve the longer boundary between HELP and ME. With a flashlight, short flashes can represent dots and longer flashes can represent dashes, while pauses distinguish the elements.",
          "For learning, it is best to start slowly. Practice HELP first, then ME, and finally combine the two words. This reduces errors and makes it easier to identify which character needs more work.",
        ],
      },
      {
        heading: "Common HELP ME Morse Code Mistakes",
        paragraphs: [
          "HELP ME contains several characters that are easy to mix up when you are new to Morse. P is .--., L is .-.., and M is --. A single missing or extra signal changes the character, so checking the word letter by letter is more reliable than copying the whole phrase from memory.",
          "Another common mistake is treating the slash as if it were a transmitted character. In written examples, the slash is a visual convention for a word boundary; it is not part of the Morse pattern for H, E, L, P, M, or E.",
        ],
      },
      {
        heading: "How to Memorize HELP ME",
        paragraphs: [
          "Break the phrase into two manageable chunks: HELP and ME. Memorize H, E, L, and P first, then M and E. After that, practice the complete phrase until you can recognize it without translating every symbol consciously.",
          "Audio practice is especially valuable because the same written pattern can feel harder to recognize at speed. Try alternating between reading the sequence and hearing it, then test yourself by writing the Morse code from memory.",
        ],
      },
      {
        heading: "Practice HELP ME with Other Common Words",
        paragraphs: [
          "Once HELP ME feels comfortable, compare it with short words such as HI, YES, and NO. This creates a useful beginner vocabulary and helps you notice the difference between dot-heavy characters, dash-heavy characters, and mixed patterns.",
          "You can also use a Morse Code Translator to convert your own phrases and listen to the result. Checking the character sequence against a Morse Code Alphabet reference is a good way to catch transcription errors before using the message in a project.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is Help Me in Morse code?",
        answer:
          "HELP ME in Morse code is .... . .-.. .--. / -- . H is ...., E is ., L is .-.., P is .--., M is --, and E is .",
      },
      {
        question: "Is HELP ME an official Morse distress signal?",
        answer:
          "No. HELP ME is an English phrase encoded in Morse code. SOS is the internationally recognized Morse distress signal.",
      },
      {
        question: "What is the difference between HELP ME and SOS?",
        answer:
          "HELP ME is a normal phrase that can be encoded in Morse code. SOS is a standardized distress signal with the pattern ... --- ... .",
      },
      {
        question: "How do you spell HELP in Morse code?",
        answer:
          "HELP is H = ...., E = ., L = .-.., and P = .--. The complete word is .... . .-.. .--.",
      },
      {
        question: "How do you spell ME in Morse code?",
        answer:
          "ME is M = -- followed by E = .. The complete word is -- .",
      },
      {
        question: "Can HELP ME be sent with a flashlight?",
        answer:
          "Yes. Morse code can be represented with light. Use short and long flashes for dots and dashes and keep the character and word gaps clear. In a real emergency, use reliable emergency communication methods available to you.",
      },
      {
        question: "Why is there a slash in HELP ME in Morse code?",
        answer:
          "The slash is commonly used in written Morse to show a boundary between words. It separates HELP from ME; it is not a Morse character in the phrase itself.",
      },
      {
        question: "How can I practice HELP ME in Morse code?",
        answer:
          "Practice HELP and ME separately, then combine them. Use both visual and audio practice, and check the complete sequence with a reliable Morse character reference or translator.",
      },
    ],
    relatedWords: [
      { word: "SOS", slug: "blog/sos-signal-morse-code-everything-you-need-to-know", morse: "... --- ..." },
      { word: "Hi", slug: "hi-in-morse-code", morse: ".... .." },
      { word: "Yes", slug: "yes-in-morse-code", morse: "-.-- . ..." },
      { word: "No", slug: "no-in-morse-code", morse: "-. ---" },
    ],
    sources: [
      { title: "ITU - International Morse Code Recommendation M.1677", url: "https://www.itu.int/rec/R-REC-M.1677", description: "International reference for the Morse code character set." },
      { title: "ARRL - Morse Code Characters", url: "https://www.arrl.org/code-characters", description: "Reference for checking Morse code characters." },
      { title: "ARRL - Learning Morse Code", url: "https://www.arrl.org/learning-morse-code", description: "Learning resources for practicing Morse code." },
    ],
  },

  {
    word: "YES",
    morseStr: "-.-- . ...",
    title: "Yes in Morse Code",
    metaTitle: "Yes in Morse Code (-.-- . ...) - Meaning, Translation & Guide",
    description:
      "Learn how to write Yes in Morse code: -.-- . ... Get the exact letter breakdown, spacing and timing guidance, communication context, common mistakes, and practical practice tips.",
    slug: "yes-in-morse-code",
    intro:
      "Yes in Morse code is written as -.-- . ..., representing Y, E, and S. It is a short but useful word for learning because it combines a mixed dot-and-dash character with two very simple characters. This guide explains the exact translation, how each letter is formed, how to send and recognize YES, common writing mistakes, and how the word fits into broader Morse code practice.",
    sections: [
      {
        heading: "What Is YES in Morse Code?",
        paragraphs: [
          "The International Morse code representation of YES is -.-- . ... The Y is -.--, E is ., and S is .... Each group represents one letter, and the spaces between the groups show the character boundaries.",
          "YES is one word, so there is no word-boundary slash between Y, E, and S. In a written learning example, the correct sequence is simply -.-- . ... . Keeping character spacing consistent makes the pattern much easier to read and verify.",
        ],
      },
      {
        heading: "YES Letter-by-Letter Breakdown",
        paragraphs: [
          "The easiest way to learn YES is to memorize its three characters separately before combining them:",
        ],
        bullets: [
          "Y = -.--",
          "E = .",
          "S = ...",
          "YES = -.-- . ...",
        ],
      },
      {
        heading: "What Makes YES Useful for Beginners?",
        paragraphs: [
          "YES provides a good contrast between different Morse rhythms. Y contains both a dash and dots, E is the shortest standard Morse character, and S consists of three dots. Learning the three together gives a beginner practice with short, mixed, and repeated-dot patterns.",
          "The word is also useful for self-testing. If you hear a longer mixed character followed by one short signal and then three short signals, you can practice identifying the sequence as Y-E-S rather than translating each component visually.",
        ],
      },
      {
        heading: "How to Send YES in Morse Code",
        paragraphs: [
          "To practice sending YES, begin with Y (-.--), pause for the character boundary, send E (.), pause again, and finish with S (...). The exact timing becomes increasingly important as you increase speed because the receiver relies on rhythm to distinguish characters.",
          "For visual signaling, such as a flashlight exercise, use short signals for dots and long signals for dashes. Do not rush the pauses between characters; clear separation is what prevents one character from being mistaken for another.",
        ],
      },
      {
        heading: "YES in Morse Communication",
        paragraphs: [
          "The word YES can be encoded whenever the intended message is an affirmative answer. However, Morse code is used in different communication settings, and formal services may have their own operating procedures, abbreviations, or standardized signals. A learner should not assume that an ordinary word automatically functions as a universal procedural signal.",
          "For general learning, personal messages, puzzles, demonstrations, and Morse code projects, translating the full word YES is straightforward and appropriate. For specialized radio communication, follow the conventions of the relevant service.",
        ],
      },
      {
        heading: "Common Mistakes When Writing YES",
        paragraphs: [
          "The most frequent mistakes are changing the Y pattern, forgetting that E is one dot, or writing S with the wrong number of dots. Another issue is adding a slash between letters. A slash is commonly used to represent a word boundary, while YES is a single word.",
          "A useful checking method is to compare the word with its three-letter breakdown rather than checking only the complete string. If one character is wrong, you can identify the problem immediately.",
        ],
        bullets: [
          "Y = -.--, not a similar-looking pattern.",
          "E = . — exactly one dot.",
          "S = ... — exactly three dots.",
          "YES = -.-- . ... with character spaces and no word slash.",
        ],
      },
      {
        heading: "How to Memorize YES",
        paragraphs: [
          "Start with E and S because they are simple: one dot and three dots. Then focus on Y, which has a distinctive mixed pattern. Combine them slowly as Y-E-S, and gradually shift from visual recall to listening recall.",
          "Another effective exercise is reverse translation. Look at the letters YES and write the Morse pattern without checking a reference. Then compare your answer with -.-- . ... and correct only the character that was wrong.",
        ],
      },
      {
        heading: "Practice YES with NO and Other Short Words",
        paragraphs: [
          "YES becomes more useful when practiced with NO because the two words naturally form a simple question-and-answer pair. NO is -. ---, while YES is -.-- . .... Comparing them gives you practice with both short and mixed dot-and-dash patterns.",
          "You can continue by practicing HI and HELP ME, then move toward longer phrases. A gradual progression from short words to complete sentences is generally easier than trying to memorize long Morse messages immediately.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is YES in Morse code?",
        answer: "YES in Morse code is -.-- . ... Y is -.--, E is ., and S is ...",
      },
      {
        question: "How do you spell YES in Morse code?",
        answer: "Spell YES as Y = -.--, E = ., and S = ... The complete sequence is -.-- . ...",
      },
      {
        question: "Does YES need a slash in Morse code?",
        answer: "No. YES is one word, so a slash is not needed between its letters. Write it as -.-- . ... with spaces separating the characters.",
      },
      {
        question: "How do you send YES in Morse code?",
        answer: "Send Y as -.--, leave a character gap, send E as one dot, leave another character gap, and send S as three dots.",
      },
      {
        question: "Is YES an official Morse code signal?",
        answer: "YES is an ordinary English word encoded in Morse code. Whether a particular service uses a special affirmative signal depends on its communication procedures; the word itself should not automatically be treated as a universal procedural code.",
      },
      {
        question: "What is the Morse code for YES and NO?",
        answer: "YES is -.-- . ... and NO is -. ---. These are the ordinary English words encoded character by character in International Morse code.",
      },
      {
        question: "Why is YES useful for learning Morse code?",
        answer: "YES combines three different patterns: Y contains dots and dashes, E is one dot, and S is three dots. This gives beginners practice with contrasting rhythms.",
      },
      {
        question: "Can I use a Morse translator to practice YES?",
        answer: "Yes. A translator can show the written sequence and, when audio is available, let you hear the rhythm. You can then compare what you hear with the character breakdown.",
      },
    ],
    relatedWords: [
      { word: "No", slug: "no-in-morse-code", morse: "-. ---" },
      { word: "Hi", slug: "hi-in-morse-code", morse: ".... .." },
      { word: "Help Me", slug: "help-me-in-morse-code", morse: ".... . .-.. .--. / -- ." },
      { word: "I Love You", slug: "blog/i-love-you-in-morse-code-meaning-translation", morse: ".. / .-.. --- ...- . / -.-- --- ..-" },
    ],
    sources: [
      { title: "ITU - International Morse Code Recommendation M.1677", url: "https://www.itu.int/rec/R-REC-M.1677", description: "International reference for Morse code standardization." },
      { title: "ARRL - Morse Code Characters", url: "https://www.arrl.org/code-characters", description: "Reference for individual Morse code characters." },
      { title: "ARRL - Learning Morse Code", url: "https://www.arrl.org/learning-morse-code", description: "Practical resources for learning and practicing Morse code." },
    ],
  },

  {
    word: "NO",
    morseStr: "-. ---",
    title: "No in Morse Code",
    metaTitle: "No in Morse Code (-. ---) - Meaning, Translation & Guide",
    description:
      "Learn how to write No in Morse code: -. --- Get the exact letter breakdown, spacing and timing rules, communication context, common mistakes, and practical ways to practice this short word.",
    slug: "no-in-morse-code",
    intro:
      "No in Morse code is written as -. ---, representing N and O. It is a short two-letter word, but it gives beginners useful practice with two very different character rhythms: N is a dash followed by a dot, while O is three dashes. This guide explains the exact translation, correct spacing, how to send and recognize NO, common mistakes, and how to use the word as part of a structured Morse code learning routine.",
    sections: [
      {
        heading: "What Is NO in Morse Code?",
        paragraphs: [
          "The International Morse code for NO is -. ---. N is represented by dash-dot (-.), and O is represented by three dashes (---). The space between the two patterns separates the letters N and O.",
          "Because NO is a single English word, there is no word-boundary slash between N and O. A slash is commonly reserved in written Morse for showing a space between words, while ordinary character spaces separate individual letters.",
        ],
      },
      {
        heading: "NO Letter-by-Letter Breakdown",
        paragraphs: [
          "Memorize NO as two individual Morse characters before combining them:",
        ],
        bullets: [
          "N = -. — dash followed by dot",
          "O = --- — three dashes",
          "NO = -. ---",
        ],
      },
      {
        heading: "Why NO Is Useful for Beginners",
        paragraphs: [
          "NO is a good practice word because N and O sound very different when transmitted. N is short and mixed, while O is made entirely of three dashes. That contrast helps learners develop an ear for Morse rhythm instead of relying only on the visual appearance of the code.",
          "It also pairs naturally with YES. Practicing YES and NO together gives beginners a simple way to test recognition, spelling, and response patterns while working with short words.",
        ],
      },
      {
        heading: "How to Send NO in Morse Code",
        paragraphs: [
          "To send NO, transmit N as dash-dot, pause for the character boundary, and then transmit O as three dashes. The pause is essential because without a clear character boundary, the receiver may not know where N ends and O begins.",
          "If you are using a flashlight for a practice demonstration, represent dots with short flashes and dashes with longer flashes. Keep the pauses consistent and avoid making every gap the same length.",
        ],
        bullets: [
          "N = -. — one dash followed by one dot.",
          "Leave a clear character gap.",
          "O = --- — three dashes.",
          "Complete word = -. ---",
        ],
      },
      {
        heading: "NO by Sound: Learning the Rhythm",
        paragraphs: [
          "A useful way to recognize NO is to listen for the short N pattern followed by the longer O pattern. N has a quick dash-dot structure, while O has three longer signals. The contrast makes the word useful for early listening exercises.",
          "Once you can recognize NO by sound, try writing it from memory. Then reverse the exercise: look at -. --- and say the letters N-O mentally. These two directions of practice strengthen both encoding and decoding skills.",
        ],
      },
      {
        heading: "Common Mistakes When Writing NO",
        paragraphs: [
          "The biggest errors involve reversing N, changing the number of dashes in O, or accidentally adding a slash between the letters. N is dash-dot (-.), while O is exactly three dashes (---). Even one changed signal creates a different character.",
          "If you are unsure about the complete word, check each character independently. Confirm N, confirm O, and then combine them with one character space. This is more reliable than trying to memorize the entire pattern as a single visual shape.",
        ],
        bullets: [
          "N = -. — do not reverse it to .-.",
          "O = --- — use exactly three dashes.",
          "Do not put a slash between N and O.",
          "Write the complete word as -. ---",
        ],
      },
      {
        heading: "YES vs. NO in Morse Code",
        paragraphs: [
          "YES and NO are especially useful together because they form a familiar pair in everyday language. YES is -.-- . ..., while NO is -. ---. The two sequences have noticeably different rhythms, making them convenient for beginner recognition drills.",
          "For formal radio communication, always follow the procedures and terminology used by the relevant service. For general learning and personal Morse projects, the ordinary English words can be translated directly using the International Morse character set.",
        ],
      },
      {
        heading: "How to Memorize NO",
        paragraphs: [
          "Start by memorizing N as dash-dot and O as three dashes. Then practice the transition between them. Because the patterns have different lengths and rhythms, saying the letters mentally while listening can help build a strong association.",
          "After you know NO, combine it with YES, HI, and HELP ME. Short words provide quick repetition without overwhelming a beginner, and repeated recognition gradually builds automatic Morse reading ability.",
        ],
      },
      {
        heading: "Practice NO with a Morse Code Translator",
        paragraphs: [
          "A Morse Code Translator can be useful for checking whether your written pattern is correct and for hearing the timing of the result. Enter NO, compare the output with -. ---, and listen for the difference between N and O.",
          "For the best learning benefit, do not rely on the translator to do every step. First try to write NO from memory, then use the tool to check your answer. This turns a translation tool into a practice aid rather than a replacement for learning the characters.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is NO in Morse code?",
        answer: "NO in Morse code is -. --- . N is dash-dot (-.) and O is three dashes (---).",
      },
      {
        question: "How do you spell NO in Morse code?",
        answer: "Spell NO as N = -. and O = ---. The complete sequence is -. ---",
      },
      {
        question: "Does NO need a slash in Morse code?",
        answer: "No. NO is one word, so write it as -. --- with a character space between N and O. A slash is commonly used to represent a boundary between separate words.",
      },
      {
        question: "How do you send NO in Morse code?",
        answer: "Send N as dash-dot (-.), pause for the character boundary, and then send O as three dashes (---).",
      },
      {
        question: "What is the Morse code for YES and NO?",
        answer: "YES is -.-- . ... and NO is -. ---. Both are ordinary English words encoded character by character in International Morse code.",
      },
      {
        question: "Why is NO useful for learning Morse code?",
        answer: "NO combines two contrasting patterns: N is dash-dot and O is three dashes. This gives beginners practice recognizing different rhythms and signal lengths.",
      },
      {
        question: "Can NO be sent with a flashlight?",
        answer: "Yes. Morse code can be represented with light by using short flashes for dots and longer flashes for dashes, with clear gaps between characters.",
      },
      {
        question: "How can I practice NO in Morse code?",
        answer: "Practice N and O separately, combine them as -. ---, then listen to the result and try writing it again from memory. Pairing NO with YES is also a useful beginner exercise.",
      },
    ],
    relatedWords: [
      { word: "Yes", slug: "yes-in-morse-code", morse: "-.-- . ..." },
      { word: "Hi", slug: "hi-in-morse-code", morse: ".... .." },
      { word: "Help Me", slug: "help-me-in-morse-code", morse: ".... . .-.. .--. / -- ." },
      { word: "SOS", slug: "blog/sos-signal-morse-code-everything-you-need-to-know", morse: "... --- ..." },
    ],
    sources: [
      { title: "ITU - International Morse Code Recommendation M.1677", url: "https://www.itu.int/rec/R-REC-M.1677", description: "International reference for the Morse code character set." },
      { title: "ARRL - Morse Code Characters", url: "https://www.arrl.org/code-characters", description: "Reference for verifying individual Morse code characters." },
      { title: "ARRL - Learning Morse Code", url: "https://www.arrl.org/learning-morse-code", description: "Practical resources for learning Morse code." },
    ],
  },
];

export function getAllWordPages(): WordPageData[] {
  return wordPages;
}

export function getWordBySlug(slug: string): WordPageData | undefined {
  return wordPages.find((word) => word.slug === slug);
}

export function getRelatedWords(currentSlug: string, limit = 4): RelatedWord[] {
  const current = getWordBySlug(currentSlug);
  if (!current) return [];
  return current.relatedWords.slice(0, limit);
}
