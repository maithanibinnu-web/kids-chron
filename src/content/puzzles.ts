import type { Puzzle } from "./types";

/** SAMPLE puzzles. Every one has a `learn` note so the answer teaches
 *  something rather than just closing the loop. */
export const puzzles: Puzzle[] = [
  {
    slug: "the-river-crossing",
    kind: "logic",
    title: "The River Crossing",
    prompt:
      "A farmer must take a goat, a wolf and a cabbage across a river. The boat holds the farmer and only one other thing. Left alone, the wolf will eat the goat, and the goat will eat the cabbage. How does everything get across safely?",
    hint: "Nothing says you can only bring things across. You are allowed to take something back.",
    answer:
      "Take the goat over. Come back empty. Take the wolf over, and bring the goat back with you. Leave the goat, take the cabbage over. Come back empty, then take the goat over last.",
    learn:
      "The step most people never think of is going backwards. Many problems only open up once you allow a move that seems to undo progress.",
    difficulty: 2,
    ageBands: ["9-11", "12+"],
    provenance: "sample",
  },
  {
    slug: "riddle-lives-without-body",
    kind: "riddle",
    title: "Alive Without Breath",
    prompt:
      "I am alive without breath and as cold as death. I am never thirsty, though I always drink. What am I?",
    hint: "You would find me in a river, a bowl, or on the end of a hook.",
    answer: "A fish.",
    learn:
      "Riddles work by describing something true in an unfamiliar way. A fish really does 'drink' — many freshwater fish take in water constantly through their gills and skin.",
    difficulty: 1,
    ageBands: ["6-8", "9-11"],
    provenance: "sample",
  },
  {
    slug: "the-two-jugs",
    kind: "logic",
    title: "The Two Jugs",
    prompt:
      "You have a 5-litre jug and a 3-litre jug and a tap. Neither jug has markings. How do you measure out exactly 4 litres?",
    hint: "Filling one jug from the other leaves a known amount behind. That leftover is the useful part.",
    answer:
      "Fill the 5. Pour from it into the 3 until the 3 is full — 2 litres are left in the big jug. Empty the 3 and pour those 2 litres into it. Fill the 5 again and top up the 3, which only takes 1 more litre. Exactly 4 litres remain in the 5-litre jug.",
    learn:
      "You never measured 4 directly. You built it from differences. Combining known quantities to reach an unknown one is the heart of a great deal of mathematics.",
    difficulty: 3,
    ageBands: ["9-11", "12+"],
    provenance: "sample",
  },
  {
    slug: "word-ladder-cold-warm",
    kind: "word",
    title: "Word Ladder: COLD to WARM",
    prompt:
      "Change COLD into WARM one letter at a time. Every step in between must be a real English word. Four steps will do it.",
    hint: "CORD is a good second rung.",
    answer: "COLD → CORD → CARD → WARD → WARM",
    learn:
      "Word ladders were invented by Lewis Carroll, who wrote Alice's Adventures in Wonderland. They train you to hold a target in mind while taking small steps towards it.",
    difficulty: 2,
    ageBands: ["9-11"],
    provenance: "sample",
  },
  {
    slug: "brain-teaser-the-lift",
    kind: "brain-teaser",
    title: "The Short Neighbour",
    prompt:
      "A man lives on the tenth floor. Every morning he takes the lift down to the ground floor. Coming home, he takes the lift to the seventh floor and walks the rest — except on rainy days, when he rides all the way to the tenth. Why?",
    hint: "Think about what he can physically reach.",
    answer:
      "He is short. He can reach the ground-floor button, and the highest button he can reach going up is the seventh. On rainy days he has an umbrella, and uses it to press the tenth-floor button.",
    learn:
      "This puzzle is famous because almost everyone assumes the man's choice is about preference. It is about his body and the height of a button — a good reminder that the world is designed around some people more than others.",
    difficulty: 2,
    ageBands: ["9-11", "12+"],
    provenance: "sample",
  },
  {
    slug: "number-pattern-triangular",
    kind: "number",
    title: "What Comes Next?",
    prompt: "1, 3, 6, 10, 15, 21, ___ . What is the next number, and what is the rule?",
    hint: "Look at the gaps between the numbers rather than the numbers themselves.",
    answer:
      "28. The gaps go up by one each time: +2, +3, +4, +5, +6, so the next gap is +7. These are the triangular numbers — the number of dots you can arrange in a neat triangle.",
    learn:
      "When a sequence looks random, subtract each term from the next. If those differences form a pattern, you have found the rule.",
    difficulty: 2,
    ageBands: ["9-11"],
    provenance: "sample",
  },
  {
    slug: "riddle-map",
    kind: "riddle",
    title: "Cities Without Houses",
    prompt:
      "I have cities but no houses, forests but no trees, and water but no fish. What am I?",
    hint: "You unfold me before a journey.",
    answer: "A map.",
    learn:
      "A map is a model: it keeps the relationships between places and throws away almost everything else. Deciding what to leave out is what makes a model useful.",
    difficulty: 1,
    ageBands: ["6-8", "9-11"],
    provenance: "sample",
  },
  {
    slug: "logic-three-boxes",
    kind: "logic",
    title: "The Mislabelled Boxes",
    prompt:
      "Three boxes hold apples, oranges, and a mix of both. Every label is wrong. You may take out just one fruit, without looking inside. How do you correctly label all three?",
    hint: "Start with the box you know the most about — the one labelled 'mixed'.",
    answer:
      "Take a fruit from the box labelled 'Mixed'. Since every label is wrong, that box is not mixed, so whatever you draw is what it really holds — say an apple, so it is the apples box. The box labelled 'Apples' cannot hold apples and cannot be the one you just identified, so it must be the mixed box. The last box is oranges.",
    learn:
      "The clue was in the rule, not the fruit. 'Every label is wrong' is itself information — constraints often carry as much as data does.",
    difficulty: 3,
    ageBands: ["12+"],
    provenance: "sample",
  },
  {
    slug: "maze-of-the-hive",
    kind: "maze",
    title: "Find the Way to the Hive",
    prompt:
      "Printed in the newspaper: guide the bee through the flower meadow to its hive, visiting each flower exactly once. Grid mazes like this one appear in the puzzle pages of every edition.",
    hint: "Work backwards from the hive — there are usually fewer wrong turns that way.",
    answer:
      "Solutions to printed mazes appear in the following edition, along with the names of readers who sent in a correct route.",
    learn:
      "Solving a maze backwards from the goal is often faster, because the exit usually has fewer paths leading into it than the entrance has leading out.",
    difficulty: 1,
    ageBands: ["6-8"],
    provenance: "sample",
  },
];

export const puzzleBySlug = (slug: string) => puzzles.find((p) => p.slug === slug);

export const PUZZLE_KIND_LABELS: Record<string, string> = {
  riddle: "Riddle",
  "brain-teaser": "Brain Teaser",
  word: "Word Game",
  logic: "Logic Puzzle",
  maze: "Maze",
  number: "Number Puzzle",
  crossword: "Crossword",
  wordsearch: "Word Search",
};
