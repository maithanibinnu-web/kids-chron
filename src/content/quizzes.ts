import type { Quiz } from "./types";

/** SAMPLE quizzes. Accurate, evergreen questions — but not official
 *  KidsChron editorial. Every explanation teaches something, because
 *  the explanation is the point and the score is not. */
export const quizzes: Quiz[] = [
  {
    slug: "our-planet-basics",
    title: "Our Planet: The Basics",
    summary: "Ten minutes on Earth, its air, its water and its weather.",
    category: "environment",
    ageBands: ["9-11"],
    pillars: ["knowledge", "environment", "curiosity"],
    artwork: { art: "globe", alt: "A stylised globe surrounded by clouds and leaves" },
    provenance: "sample",
    questions: [
      {
        id: "q1",
        prompt: "Roughly how much of the Earth's surface is covered by ocean?",
        options: ["About one quarter", "About half", "About seventy per cent", "Almost all of it"],
        answerIndex: 2,
        explanation:
          "Around 70% of the Earth's surface is ocean — which is why our planet looks blue from space.",
      },
      {
        id: "q2",
        prompt: "Which gas makes up the largest part of the air you are breathing right now?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        answerIndex: 1,
        explanation:
          "Nitrogen is about 78% of air. Oxygen is about 21% — vital, but not the biggest share.",
      },
      {
        id: "q3",
        prompt: "The southwest monsoon brings rain to most of India in which months?",
        options: ["January to March", "June to September", "October to December", "April to May"],
        answerIndex: 1,
        explanation:
          "The southwest monsoon usually arrives in Kerala around the start of June and withdraws by late September.",
      },
      {
        id: "q4",
        prompt: "What is a 'rain shadow'?",
        options: [
          "The dark cloud just before rain",
          "A dry area on the far side of a mountain range",
          "The shadow cast by a raincloud",
          "A very short rain shower",
        ],
        answerIndex: 1,
        explanation:
          "Air drops its moisture climbing one side of a range, so the land on the other side stays much drier. That dry area is the rain shadow.",
      },
      {
        id: "q5",
        prompt: "Which of these can be recycled again and again with almost no loss in quality?",
        options: ["Newspaper", "Aluminium", "Cotton cloth", "Cardboard"],
        answerIndex: 1,
        explanation:
          "Aluminium can be melted and remade endlessly. Paper fibres get shorter each time, so paper has a limit.",
      },
    ],
  },
  {
    slug: "space-and-sky",
    title: "Space & Sky",
    summary: "Orbits, the Moon, and why the sky does what it does.",
    category: "science",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "curiosity", "critical-thinking"],
    artwork: { art: "space", alt: "Planets and stars arranged in a circle" },
    provenance: "sample",
    questions: [
      {
        id: "q1",
        prompt: "Why does a satellite stay in orbit instead of falling to Earth?",
        options: [
          "There is no gravity that far up",
          "It is moving sideways fast enough to keep missing the Earth",
          "It is held up by the atmosphere",
          "Its engines fire constantly",
        ],
        answerIndex: 1,
        explanation:
          "Gravity is still pulling it down. The satellite is falling — but moving forward so fast that the Earth curves away beneath it just as quickly.",
      },
      {
        id: "q2",
        prompt: "Chandrayaan-3 landed near which part of the Moon in 2023?",
        options: ["The equator", "The far side", "The south pole region", "The Sea of Tranquility"],
        answerIndex: 2,
        explanation:
          "India was the first country to land near the lunar south pole — a region of interest because permanently shadowed craters there may hold water ice.",
      },
      {
        id: "q3",
        prompt: "Why is the sky blue?",
        options: [
          "It reflects the ocean",
          "Blue light is scattered most by the gases in the air",
          "The Sun gives out mostly blue light",
          "The atmosphere is made of blue gas",
        ],
        answerIndex: 1,
        explanation:
          "Short blue wavelengths bounce off air molecules far more than long red ones, so blue light reaches your eyes from every direction.",
      },
      {
        id: "q4",
        prompt: "A geostationary satellite appears to stay above the same spot on Earth. Why?",
        options: [
          "It is not moving at all",
          "It orbits once every 24 hours, matching Earth's spin",
          "It is tied to a ground station",
          "It moves in a figure of eight",
        ],
        answerIndex: 1,
        explanation:
          "At about 35,786 km above the equator, one lap takes exactly one day — so from the ground it seems to hang still.",
      },
      {
        id: "q5",
        prompt: "Why is a sunset orange and red?",
        options: [
          "The Sun cools down in the evening",
          "Dust turns the light orange",
          "Low sunlight travels through more air, so the blue is scattered away",
          "The Sun is closer to Earth at sunset",
        ],
        answerIndex: 2,
        explanation:
          "The longer path through the atmosphere scatters away almost all the blue, leaving the oranges and reds to reach you.",
      },
    ],
  },
  {
    slug: "wild-india",
    title: "Wild India",
    summary: "Birds, big cats, forests and the places they live.",
    category: "nature",
    ageBands: ["6-8", "9-11"],
    pillars: ["knowledge", "environment", "empathy"],
    artwork: { art: "wildlife", alt: "A tiger, a hornbill and a leaf arranged as a badge" },
    provenance: "sample",
    questions: [
      {
        id: "q1",
        prompt: "What does it mean if a species is 'endemic' to the Western Ghats?",
        options: [
          "It is found there and nowhere else in the wild",
          "It is very common there",
          "It was brought there by people",
          "It migrates there every year",
        ],
        answerIndex: 0,
        explanation:
          "Endemic means found naturally in one place only. The Western Ghats have a remarkable number of endemic frogs, birds and plants.",
      },
      {
        id: "q2",
        prompt: "Why are overhead power lines dangerous for the Great Indian Bustard?",
        options: [
          "The birds try to perch on them",
          "Their eyes are on the sides of their head, so they see poorly straight ahead in flight",
          "The wires make a noise that frightens them",
          "They nest underneath them",
        ],
        answerIndex: 1,
        explanation:
          "Side-facing eyes are great for spotting predators and poor for seeing ahead. Bright markers called bird diverters help make wires visible.",
      },
      {
        id: "q3",
        prompt: "The Western Ghats run roughly along which coast of India?",
        options: ["The east coast", "The west coast", "The southern tip only", "The northern border"],
        answerIndex: 1,
        explanation:
          "They run about 1,600 km down the western side of the peninsula and force the monsoon air upward, which is why the western slopes get so much rain.",
      },
      {
        id: "q4",
        prompt: "How does a honeybee tell the hive where it found flowers?",
        options: [
          "By its buzzing sound",
          "By leaving a scent trail in the air",
          "By dancing a figure-of-eight whose angle and length carry direction and distance",
          "By leading the others there one at a time",
        ],
        answerIndex: 2,
        explanation:
          "It is called the waggle dance. The angle gives the direction relative to the Sun; the length of the waggle gives the distance.",
      },
    ],
  },
  {
    slug: "think-it-through",
    title: "Think It Through",
    summary: "No facts to memorise — just careful reasoning.",
    category: "general-knowledge",
    ageBands: ["9-11", "12+"],
    pillars: ["critical-thinking", "problem-solving"],
    artwork: { art: "art", alt: "Interlocking puzzle shapes forming a head in profile" },
    provenance: "sample",
    questions: [
      {
        id: "q1",
        prompt:
          "A post says 'Scientists have proved this!' but names no scientist, no study and no place. What is the best next step?",
        options: [
          "Share it, since it says scientists",
          "Believe it if lots of people shared it",
          "Look for the original source before believing or sharing it",
          "Assume it is false",
        ],
        answerIndex: 2,
        explanation:
          "Neither believing nor dismissing straight away is the skill. Finding the original source is — a claim with no traceable source is not yet evidence.",
      },
      {
        id: "q2",
        prompt:
          "All roses fade. This flower has faded. Can you conclude that this flower is a rose?",
        options: ["Yes, definitely", "No — other flowers fade too", "Only if it is red", "There is no way to reason about it"],
        answerIndex: 1,
        explanation:
          "Roses fading does not mean only roses fade. Reversing an 'all A are B' statement is one of the commonest reasoning slips there is.",
      },
      {
        id: "q3",
        prompt:
          "A headline reads 'Ice cream sales rise, and so do sunburns. Is ice cream burning our skin?' What is really going on?",
        options: [
          "Ice cream causes sunburn",
          "Sunburn causes people to buy ice cream",
          "Hot sunny weather causes both",
          "It is pure coincidence",
        ],
        answerIndex: 2,
        explanation:
          "Two things rising together does not mean one caused the other. Here a third factor — hot sunny weather — is driving both.",
      },
      {
        id: "q4",
        prompt: "You read a striking claim in exactly one place and nowhere else. What does that tell you?",
        options: [
          "It must be an exclusive scoop",
          "It is definitely false",
          "It is worth waiting for an independent second source",
          "It should be shared quickly before others do",
        ],
        answerIndex: 2,
        explanation:
          "It might be true and it might not. A single unconfirmed source is a reason to wait, not a reason to spread or to sneer.",
      },
    ],
  },
];

export const quizBySlug = (slug: string) => quizzes.find((q) => q.slug === slug);
