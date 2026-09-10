import type { Article } from "./types";

/**
 * SAMPLE EDITORIAL CONTENT
 * ------------------------------------------------------------------
 * Every article below carries `provenance: "sample"` and is rendered
 * with a visible "Sample article" label. These pieces exist to prove
 * the layouts, the reading experience and the data model — they are
 * written on accurate, evergreen subjects so nothing here is false,
 * but they are NOT official KidsChron editorial and must be replaced
 * by the editorial team before launch.
 *
 * Nothing in this file invents a KidsChron fact, statistic, award,
 * partnership or endorsement.
 */
export const articles: Article[] = [
  {
    slug: "why-the-sky-is-blue",
    title: "Why Is the Sky Blue — and Why Does It Turn Orange at Sunset?",
    summary:
      "Sunlight looks white, but it is really every colour mixed together. What happens next is the reason the sky changes colour twice a day.",
    category: "science",
    ageBands: ["9-11", "6-8"],
    pillars: ["knowledge", "curiosity", "critical-thinking"],
    mode: "inform",
    readingMinutes: 4,
    artwork: { art: "weather", alt: "A sky graduating from deep blue at the top to warm orange near the horizon" },
    provenance: "sample",
    featured: true,
    publishedAt: "2026-08-28",
    body: [
      { type: "paragraph", text: "Step outside on a clear afternoon and look up. The sky is blue. Wait a few hours and look again — now it is orange, pink and gold. Nothing about the Sun has changed. So what has?" },
      { type: "heading", text: "Sunlight is a mixture" },
      { type: "paragraph", text: "Sunlight looks white, but it is really all the colours of the rainbow travelling together. You can see them separate when light passes through a prism, or through raindrops after a shower — that is exactly what a rainbow is." },
      { type: "paragraph", text: "Each colour travels as a wave, and the waves are not all the same size. Red light has long, lazy waves. Blue and violet light have short, quick ones." },
      { type: "heading", text: "The air gets in the way" },
      { type: "paragraph", text: "Our atmosphere is full of tiny molecules of gas — far too small to see. When sunlight hits them, the light bounces off in all directions. Scientists call this scattering. Here is the important part: the small, quick blue waves get bounced around far more than the long red ones." },
      { type: "paragraph", text: "So blue light gets thrown across the whole sky, arriving at your eyes from every direction at once. That is why the sky above you glows blue even though the Sun is only in one place." },
      { type: "factbox", title: "Then why isn't the sky violet?", items: [
        "Violet light is scattered even more than blue.",
        "But the Sun sends out less violet to begin with, and our eyes are much better at noticing blue than violet.",
        "Put those together and the sky reads as blue to us." ] },
      { type: "heading", text: "Sunset: the light takes the long way round" },
      { type: "paragraph", text: "At sunset the Sun sits low, so its light has to travel through much more air to reach you — a long slanting path instead of a short straight one. Along that journey almost all the blue is scattered away before it arrives. What is left to reach your eyes is the light that scatters least: orange and red." },
      { type: "quote", text: "The sky is not painted. It is sorted — by size of wave." },
      { type: "question", text: "The Moon has almost no atmosphere. What colour do you think its sky is, even in the middle of the lunar day? Why?" },
    ],
    related: ["how-satellites-stay-up", "why-leaves-change-colour"],
  },
  {
    slug: "honeybee-waggle-dance",
    title: "The Honeybee That Gives Directions by Dancing",
    summary:
      "A bee that finds flowers comes home and dances. The angle and the length of the dance tell the hive exactly where to fly.",
    category: "nature",
    ageBands: ["9-11"],
    pillars: ["knowledge", "curiosity", "environment"],
    mode: "inform",
    readingMinutes: 4,
    artwork: { art: "wildlife", alt: "A honeybee on a yellow flower with a honeycomb pattern behind it" },
    provenance: "sample",
    featured: true,
    publishedAt: "2026-08-24",
    body: [
      { type: "paragraph", text: "A honeybee flies out from the hive, finds a patch of flowers, drinks its fill and comes home. Now it has a problem. It knows where the food is. The other thousands of bees do not. And bees cannot point." },
      { type: "heading", text: "So the bee dances" },
      { type: "paragraph", text: "Back inside the dark hive, the returning bee walks a small figure-of-eight on the honeycomb. Down the middle of the eight it shakes its body from side to side. Biologists call this the waggle dance, and it carries two separate pieces of information at the same time." },
      { type: "list", items: [
        "The direction: the angle of the waggling run, measured against straight up, is the angle the other bees must fly, measured against the direction of the Sun.",
        "The distance: the longer the waggle lasts, the further away the flowers are.",
      ] },
      { type: "paragraph", text: "Other bees crowd around, feel the vibrations in the dark, and fly out on that heading. It is a set of directions given by movement instead of words." },
      { type: "factbox", title: "Worth knowing", items: [
        "Karl von Frisch worked out what the dance meant and shared a Nobel Prize in 1973 for it.",
        "The Sun moves across the sky during the day — and dancing bees adjust the angle of their dance to match.",
        "Bees also carry the scent of the flower on their bodies, so hive-mates know what to look for as well as where.",
      ] },
      { type: "question", text: "The Sun keeps moving, but the flowers do not. What would go wrong if bees did not adjust their dance through the day?" },
    ],
    related: ["western-ghats-hotspot", "why-leaves-change-colour"],
  },
  {
    slug: "chandrayaan-3-south-pole",
    title: "Why India Landed Chandrayaan-3 Near the Moon's South Pole",
    summary:
      "Most Moon landings aimed for the easy middle. India aimed for the hardest, coldest, most interesting edge — and there was a good reason.",
    category: "india",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "curiosity", "citizenship"],
    mode: "inspire",
    readingMinutes: 5,
    artwork: { art: "space", alt: "A lander on a grey cratered surface with the Sun low on the horizon" },
    provenance: "sample",
    featured: true,
    publishedAt: "2026-08-19",
    body: [
      { type: "paragraph", text: "On 23 August 2023 the Vikram lander of India's Chandrayaan-3 mission touched down on the Moon. India became the fourth country to land there — and the first to land near the lunar south pole." },
      { type: "heading", text: "What is special about the south pole?" },
      { type: "paragraph", text: "Near the Moon's poles, the Sun never climbs high. It skims along the horizon, so shadows are enormously long and some crater floors have not seen sunlight for billions of years. Those permanently shadowed places are astonishingly cold — and cold is exactly what you need to trap water ice." },
      { type: "paragraph", text: "Water is the most useful thing anyone could find on the Moon. It is drinking water. Split apart, it is breathable oxygen and rocket fuel. A future Moon base would rather dig up water than carry it from Earth." },
      { type: "heading", text: "Why it is a hard place to land" },
      { type: "list", items: [
        "The ground is rougher and more heavily cratered than the flat plains near the equator.",
        "Long shadows make it harder for a spacecraft's cameras to judge what is a safe patch and what is a boulder.",
        "There is less margin for error: a lander must pick its own spot in the last seconds, on its own, because radio signals take time to reach Earth and come back.",
      ] },
      { type: "paragraph", text: "Chandrayaan-3 carried the Pragyan rover, which rolled off the lander and spent its working days studying the soil and temperature near the landing site during a single lunar day — about fourteen Earth days of sunlight." },
      { type: "quote", text: "An earlier attempt, Chandrayaan-2, did not land successfully in 2019. The team studied what went wrong and tried again." },
      { type: "question", text: "Engineers made Chandrayaan-3 stronger, gave it more fuel and more places it could safely land. Which of those changes do you think mattered most, and why?" },
    ],
    related: ["how-satellites-stay-up", "story-of-zero"],
  },
  {
    slug: "western-ghats-hotspot",
    title: "The Western Ghats: A 1,600-Kilometre Strip Full of Species Found Nowhere Else",
    summary:
      "Older than the Himalayas, and home to frogs, birds and plants that live in these hills and absolutely nowhere else on Earth.",
    category: "nature",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "environment", "citizenship"],
    mode: "inform",
    readingMinutes: 5,
    artwork: { art: "forest", alt: "Layered green hills disappearing into mist" },
    provenance: "sample",
    publishedAt: "2026-08-15",
    body: [
      { type: "paragraph", text: "Run your finger down a map of India along the western coast. That long green ridge of hills, stretching roughly 1,600 kilometres from Gujarat down to Kerala, is the Western Ghats. It is a UNESCO World Heritage Site, and biologists call it one of the world's biodiversity hotspots." },
      { type: "heading", text: "What 'endemic' means" },
      { type: "paragraph", text: "A species is endemic to a place if it lives there and nowhere else in the wild. The Western Ghats are packed with them — the lion-tailed macaque, the Nilgiri tahr, the Malabar grey hornbill, and a long list of frogs, many of which were described by scientists only in the last few decades." },
      { type: "paragraph", text: "That happens because the hills act like islands. Wet forest sits on top; drier country lies below. A frog that needs cool, damp leaf litter cannot simply walk to the next hill, so populations stay separated for a very long time and slowly become their own species." },
      { type: "factbox", title: "The rain machine", items: [
        "The Ghats stand in the path of the southwest monsoon.",
        "Moist air blowing in from the Arabian Sea is forced upward over the hills, cools, and drops its water as rain.",
        "That is why the western slopes are drenched and the land east of the hills — the rain shadow — is far drier.",
      ] },
      { type: "paragraph", text: "Those same rains feed rivers that millions of people depend on, including the Godavari, Krishna and Kaveri. Looking after the Ghats is not only about the animals in them." },
      { type: "question", text: "If a forest is cut into small separated patches, animals can no longer move between them. What problems might that cause over many generations?" },
    ],
    related: ["honeybee-waggle-dance", "what-is-a-monsoon"],
  },
  {
    slug: "story-of-zero",
    title: "The Story of Zero: How a Symbol for Nothing Changed Everything",
    summary:
      "For most of history, counting had no way to write 'none'. The idea that fixed it came from India — and it made modern mathematics possible.",
    category: "history",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "critical-thinking", "problem-solving"],
    mode: "inform",
    readingMinutes: 5,
    artwork: { art: "monument", alt: "Carved stone numerals on an old temple wall" },
    provenance: "sample",
    publishedAt: "2026-08-10",
    body: [
      { type: "paragraph", text: "Try writing the number one hundred and five in Roman numerals: CV. Now write one thousand and five: MV. Notice something? There is no symbol holding the empty place. The Roman system did not need one, because the letters themselves carried the value." },
      { type: "paragraph", text: "That works for writing numbers down. It is miserable for calculating with them. Try multiplying CXLVII by XXIII in your head." },
      { type: "heading", text: "The place-value idea" },
      { type: "paragraph", text: "In the system we use today, where a digit sits decides what it is worth. The 5 in 5,000 is worth a thousand times the 5 in 5. But a system like that immediately needs a way to say 'nothing in this column' — otherwise 105 and 15 look the same." },
      { type: "paragraph", text: "That is the job zero does. It is a placeholder, and then something more: a number in its own right that you can add, subtract and calculate with." },
      { type: "heading", text: "Brahmagupta writes the rules" },
      { type: "paragraph", text: "In 628 CE the Indian mathematician Brahmagupta wrote down rules for treating zero as a number — what happens when you add it to something, subtract it, or multiply by it. Earlier Indian texts already used a symbol for an empty place; Brahmagupta gave zero arithmetic." },
      { type: "paragraph", text: "The idea travelled: to the Islamic world, where scholars including al-Khwarizmi worked with it, and from there into Europe, where the digits became known as Hindu-Arabic numerals — the ones on your ruler right now." },
      { type: "factbox", title: "One rule stayed stubborn", items: [
        "Brahmagupta tried to define what happens when you divide by zero.",
        "Mathematicians eventually concluded that division by zero has no sensible answer at all.",
        "It is still undefined today — one of the few places arithmetic simply says 'no'.",
      ] },
      { type: "question", text: "Why is a symbol for 'nothing' more useful than it first sounds? Try writing today's date without using zero anywhere." },
    ],
    related: ["chandrayaan-3-south-pole", "why-the-sky-is-blue"],
  },
  {
    slug: "how-vaccines-teach-your-body",
    title: "How a Vaccine Teaches Your Body Before It Ever Meets the Germ",
    summary:
      "Your immune system learns from experience. A vaccine is a way of giving it the lesson without the illness.",
    category: "science",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "healthy-habits", "critical-thinking"],
    mode: "inform",
    readingMinutes: 4,
    artwork: { art: "lab", alt: "A microscope beside labelled glass vials" },
    provenance: "sample",
    publishedAt: "2026-08-06",
    body: [
      { type: "paragraph", text: "Your body keeps a security team on duty all the time. It is called the immune system, and one of its cleverest features is memory: once it has fought a particular germ, it remembers the shape of that germ and can beat it far faster next time." },
      { type: "heading", text: "The problem with learning the hard way" },
      { type: "paragraph", text: "Getting that memory the natural way means actually catching the illness first — which for some diseases is dangerous. A vaccine is a shortcut. It shows the immune system what the enemy looks like without the fight." },
      { type: "list", items: [
        "Some vaccines use a germ that has been killed, or weakened so it cannot make you ill.",
        "Some use just one recognisable piece of the germ — often a protein from its outer coat.",
        "Some carry instructions that let your own cells build that harmless piece for a short while.",
      ] },
      { type: "paragraph", text: "Whichever route it takes, the result is the same: your immune system builds antibodies and memory cells against a shape it has now seen. If the real germ ever turns up, the response starts in hours instead of days." },
      { type: "factbox", title: "Why a sore arm is a good sign", items: [
        "A slightly sore arm or a mild fever means your immune system has noticed and got to work.",
        "It is the training happening — not the illness itself.",
        "It usually passes in a day or two.",
      ] },
      { type: "question", text: "If enough people in a community are protected, a germ struggles to find anyone to spread to. How does that help someone who cannot be vaccinated for medical reasons?" },
    ],
    related: ["why-the-sky-is-blue", "how-satellites-stay-up"],
  },
  {
    slug: "what-is-a-monsoon",
    title: "What Actually Causes the Monsoon?",
    summary:
      "It is not a season that simply arrives. The monsoon is the sea and the land swapping roles — and it comes down to how quickly each one heats up.",
    category: "environment",
    ageBands: ["9-11"],
    pillars: ["knowledge", "environment", "critical-thinking"],
    mode: "inform",
    readingMinutes: 4,
    artwork: { art: "weather", alt: "Heavy grey clouds gathering over green fields" },
    provenance: "sample",
    publishedAt: "2026-08-02",
    body: [
      { type: "paragraph", text: "Every year, from around June, the wind over India changes direction and the rain arrives. It is so regular that farmers, railways and cities plan around it. But why does the wind turn around at all?" },
      { type: "heading", text: "Land heats faster than water" },
      { type: "paragraph", text: "Put a tray of sand and a tray of water in the sun. Come back in an hour: the sand is hot, the water is barely warmer. Water takes far more energy to heat up — and it also holds onto that heat far longer." },
      { type: "paragraph", text: "Now scale that up. Through spring, the Indian landmass bakes while the Indian Ocean stays comparatively cool. Hot air over the land rises, leaving lower pressure behind it. Air over the cooler sea flows in to fill the gap — and that sea air is loaded with moisture." },
      { type: "paragraph", text: "When that wet air is pushed up over the Western Ghats and later the Himalayas, it cools, and the water it carries falls out as rain. That is the southwest monsoon." },
      { type: "heading", text: "And in winter, it reverses" },
      { type: "paragraph", text: "In winter the land cools quickly while the ocean stays relatively warm, so the pressure pattern flips and the wind blows from land to sea. That is the northeast monsoon, which brings rain to India's southeast coast." },
      { type: "question", text: "Coastal cities are often a little cooler than inland ones on the same day. Using what you just read about sand and water, can you explain why?" },
    ],
    related: ["western-ghats-hotspot", "why-leaves-change-colour"],
  },
  {
    slug: "how-satellites-stay-up",
    title: "Why Don't Satellites Fall Down?",
    summary:
      "They are falling — constantly. The trick is that they are also moving sideways fast enough to keep missing the Earth.",
    category: "technology",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "critical-thinking", "curiosity"],
    mode: "inform",
    readingMinutes: 4,
    artwork: { art: "space", alt: "A satellite in orbit above a curved blue Earth" },
    provenance: "sample",
    publishedAt: "2026-07-28",
    body: [
      { type: "paragraph", text: "Gravity does not switch off in space. A satellite 400 kilometres up still feels almost as much of Earth's pull as you do standing on the ground. So why does it not simply drop?" },
      { type: "heading", text: "Newton's cannonball" },
      { type: "paragraph", text: "Isaac Newton imagined a cannon on top of an impossibly tall mountain. Fire the ball gently and it arcs and lands nearby. Fire it harder and it lands further away, because the ball is falling and travelling forward at the same time." },
      { type: "paragraph", text: "Now fire it hard enough and something odd happens. The ball falls — but the Earth curves away beneath it at exactly the same rate. The ball never gets any closer to the ground. It has gone into orbit." },
      { type: "quote", text: "An orbit is not the absence of falling. It is falling, forever, and always missing." },
      { type: "factbox", title: "Different jobs, different orbits", items: [
        "Low Earth orbit, a few hundred kilometres up: Earth-observation and weather satellites, and the International Space Station. One lap takes roughly 90 minutes.",
        "Geostationary orbit, about 35,786 km above the equator: one lap takes exactly one day, so the satellite appears to hang still above one spot. Used for communications and broadcasting.",
      ] },
      { type: "paragraph", text: "Even in low orbit there are a few stray molecules of atmosphere, so satellites there slowly lose speed and must occasionally fire small thrusters to stay up." },
      { type: "question", text: "A geostationary satellite seems to stay still above one place. Is it actually still? What is it doing?" },
    ],
    related: ["chandrayaan-3-south-pole", "why-the-sky-is-blue"],
  },
  {
    slug: "why-leaves-change-colour",
    title: "Where the Green Goes: Why Leaves Change Colour",
    summary:
      "The yellows and oranges were in the leaf the whole time. Autumn just takes away the thing that was covering them up.",
    category: "nature",
    ageBands: ["6-8", "9-11"],
    pillars: ["knowledge", "curiosity", "environment"],
    mode: "inform",
    readingMinutes: 3,
    artwork: { art: "leaves", alt: "Yellow, orange and red leaves scattered around a bare branch" },
    provenance: "sample",
    publishedAt: "2026-07-22",
    body: [
      { type: "paragraph", text: "A leaf is a factory. Inside it, a green chemical called chlorophyll catches sunlight and uses it to turn air and water into food for the tree. Chlorophyll is green, there is a great deal of it, and it hides everything else." },
      { type: "heading", text: "Two colours were always there" },
      { type: "paragraph", text: "Alongside the chlorophyll sit other pigments — carotenoids, which are yellow and orange. They are in the leaf all summer. You simply cannot see them through all that green." },
      { type: "paragraph", text: "As days shorten and cool, many trees stop making new chlorophyll. The old chlorophyll breaks down and fades away. The yellows and oranges that were hiding underneath finally show." },
      { type: "heading", text: "And one colour that is new" },
      { type: "paragraph", text: "The deep reds and purples in some trees are different: those pigments, called anthocyanins, are made fresh in autumn, often when days are bright and nights are cold." },
      { type: "factbox", title: "Why bother dropping leaves at all?", items: [
        "Broad leaves lose a lot of water, and in winter frozen ground makes water hard to replace.",
        "Snow piling on a full crown of leaves can snap branches.",
        "Before dropping a leaf, the tree pulls valuable nutrients back into itself — the leaf is emptied, not wasted.",
      ] },
      { type: "question", text: "Pine trees keep their needles all winter. Look closely at a needle: how is its shape different from a broad leaf, and how might that help?" },
    ],
    related: ["honeybee-waggle-dance", "what-is-a-monsoon"],
  },
  {
    slug: "great-indian-bustard",
    title: "The Great Indian Bustard and the Problem of Power Lines",
    summary:
      "One of India's most endangered birds is a poor pilot with excellent eyesight — pointed the wrong way. Conservationists found a fix.",
    category: "environment",
    ageBands: ["9-11", "12+"],
    pillars: ["environment", "citizenship", "problem-solving"],
    mode: "inspire",
    readingMinutes: 4,
    artwork: { art: "wildlife", alt: "A tall long-necked bird standing in dry grassland" },
    provenance: "sample",
    publishedAt: "2026-07-16",
    body: [
      { type: "paragraph", text: "The Great Indian Bustard is a big grassland bird — tall, heavy, and one of the most critically endangered birds in India. Its home is the dry open grassland of Rajasthan and Gujarat, the kind of land people often describe, wrongly, as wasteland." },
      { type: "heading", text: "A bird built for looking sideways" },
      { type: "paragraph", text: "Bustards have eyes on the sides of their head. That is excellent for spotting a predator creeping through grass, and poor for seeing straight ahead while flying. Add a heavy body that cannot change direction quickly, and thin overhead power lines become genuinely dangerous — the bird often does not see the wire until it is too late to swerve." },
      { type: "heading", text: "What conservationists tried" },
      { type: "list", items: [
        "Fitting bright, dangling markers called bird diverters on power lines, so the wires become something a bird can see from a distance.",
        "Moving some new power lines underground in the most important bustard areas.",
        "Protecting and restoring grassland habitat instead of treating it as empty land.",
        "Careful captive breeding, so there is a safety net population.",
      ] },
      { type: "paragraph", text: "None of these alone is a rescue. Together they are a genuine attempt, and the story is a good example of conservation as engineering: understand exactly why an animal is dying, then change that one thing." },
      { type: "question", text: "The bustard's grassland is also wanted for farming and for solar and wind energy — which are themselves good for the climate. How would you weigh those needs against each other?" },
    ],
    related: ["western-ghats-hotspot", "honeybee-waggle-dance"],
  },
  {
    slug: "reading-brain",
    title: "Your Brain Was Never Built to Read — So How Do You Do It?",
    summary:
      "Humans have spoken for a very long time and read for a very short one. Learning to read rewires a part of the brain meant for something else.",
    category: "general-knowledge",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "healthy-habits", "communication"],
    mode: "inspire",
    readingMinutes: 4,
    artwork: { art: "art", alt: "An open book with letters lifting off the page" },
    provenance: "sample",
    publishedAt: "2026-07-10",
    body: [
      { type: "paragraph", text: "Children learn to speak without lessons. Put a baby among talking people and speech arrives on its own. Reading is nothing like that. Reading has to be taught, every time, to every person — and that is a clue about what is going on inside your head." },
      { type: "heading", text: "Borrowed machinery" },
      { type: "paragraph", text: "Writing is only a few thousand years old, which is far too recent for our brains to have evolved a dedicated reading part. Instead, learning to read takes over a region that was already good at recognising shapes and objects, and retrains it to recognise letters and words instantly." },
      { type: "paragraph", text: "That is why a fluent reader cannot look at a familiar word and not read it. The recognition has become automatic." },
      { type: "factbox", title: "What that means in practice", items: [
        "Reading gets easier with practice because you are physically training a recognition system.",
        "A few pages a day does more than one long session a month.",
        "Reading something slightly harder than you find comfortable is where most of the growth happens.",
      ] },
      { type: "quote", text: "Speaking is something humans grew into. Reading is something every reader builds." },
      { type: "question", text: "Think of a word you now read without effort but once had to sound out. What changed — the word, or you?" },
    ],
    related: ["story-of-zero", "how-vaccines-teach-your-body"],
  },
  {
    slug: "paralympic-classification",
    title: "How the Paralympics Makes a Race Fair",
    summary:
      "Athletes have very different bodies and very different impairments. Classification is the quiet system that decides who competes against whom.",
    category: "sports",
    ageBands: ["9-11", "12+"],
    pillars: ["knowledge", "empathy", "citizenship"],
    mode: "inspire",
    readingMinutes: 4,
    artwork: { art: "stadium", alt: "A running track with lanes curving away" },
    provenance: "sample",
    publishedAt: "2026-07-04",
    body: [
      { type: "paragraph", text: "In most sport, fairness is straightforward: everyone runs the same distance under the same rules. Para sport has a harder question to answer. If two swimmers have completely different impairments, is a race between them actually a test of who trained harder?" },
      { type: "heading", text: "Classification" },
      { type: "paragraph", text: "The answer is a system called classification. Trained classifiers assess how much an athlete's impairment affects the specific movements that sport needs, and place them into a class with athletes affected to a similar degree. Athletes then compete within their class." },
      { type: "paragraph", text: "That is why event names carry codes — T44, S9, F46 and so on. The letter says the discipline, such as T for track or F for field. The number says the class." },
      { type: "factbox", title: "The point of it", items: [
        "Classification is not about ranking how disabled someone is.",
        "It is about making sure the winner is the best athlete, not the person with the least limiting impairment.",
        "Classes are reviewed, because an athlete's condition can change over time.",
      ] },
      { type: "question", text: "Where else in life do we group people so a comparison is fair? Think about age groups, weight categories in wrestling, or handicaps in golf." },
    ],
    related: ["chandrayaan-3-south-pole", "reading-brain"],
  },
  {
    slug: "how-recycling-actually-works",
    title: "What Really Happens After You Drop Something in the Recycling Bin",
    summary:
      "Recycling is not magic and it is not pointless. It is a sorting problem — and how you throw things away decides whether it works.",
    category: "environment",
    ageBands: ["6-8", "9-11"],
    pillars: ["environment", "citizenship", "problem-solving"],
    mode: "engage",
    readingMinutes: 4,
    artwork: { art: "harvest", alt: "Sorted piles of paper, glass and metal" },
    provenance: "sample",
    publishedAt: "2026-06-28",
    body: [
      { type: "paragraph", text: "A bottle goes into a bin. Weeks later something is made from it. In between is a long chain of sorting, and every step of that chain works better or worse depending on what you did at the bin." },
      { type: "heading", text: "The chain, step by step" },
      { type: "list", items: [
        "Collection: waste is picked up. If wet food waste is mixed with dry paper, the paper is often ruined and cannot be recycled at all.",
        "Sorting: machines and people separate materials — magnets pull out steel, air jets lift light plastics, eddy currents flick out aluminium.",
        "Cleaning and shredding: material is washed and broken down into flakes, chips or pulp.",
        "Remaking: the raw material goes back to a factory as an ingredient.",
      ] },
      { type: "heading", text: "Why some things recycle better than others" },
      { type: "paragraph", text: "Metal and glass can be melted and remade almost indefinitely. Paper fibres get shorter each time, so paper can go round several times before the fibres are too short. Many plastics can only be remade into something less demanding than they started as." },
      { type: "factbox", title: "Three habits that make the biggest difference", items: [
        "Keep wet and dry waste in separate bins — this single habit rescues most of the recyclable material.",
        "Rinse containers quickly; food residue contaminates whole batches.",
        "Reducing and reusing beat recycling, because nothing has to be reprocessed at all.",
      ] },
      { type: "question", text: "Look in your kitchen bin tonight. What is the one thing in there that could have gone somewhere better?" },
    ],
    related: ["what-is-a-monsoon", "great-indian-bustard"],
  },
  {
    slug: "how-to-tell-if-a-fact-is-true",
    title: "Four Questions to Ask Before You Believe Something",
    summary:
      "Anyone can put anything on a screen. Here is the short checklist that professional fact-checkers actually use.",
    category: "general-knowledge",
    ageBands: ["9-11", "12+"],
    pillars: ["critical-thinking", "citizenship", "communication"],
    mode: "engage",
    readingMinutes: 4,
    artwork: { art: "globe", alt: "A magnifying glass held over a page of text" },
    provenance: "sample",
    featured: true,
    publishedAt: "2026-06-20",
    body: [
      { type: "paragraph", text: "You will meet more information today than your great-grandparents met in a month. Most of it is fine. Some of it is wrong. A little of it is wrong on purpose. Telling them apart is a skill, and like most skills it comes down to asking a few good questions." },
      { type: "heading", text: "1. Who is saying this?" },
      { type: "paragraph", text: "Not the account that shared it — the original source. A screenshot has no author. Try to get back to where the claim actually started. If you cannot find the source at all, that itself is information." },
      { type: "heading", text: "2. How would they know?" },
      { type: "paragraph", text: "A claim about a school comes best from the school. A claim about an experiment comes best from the people who ran it. Ask what position someone was in to know the thing they are telling you." },
      { type: "heading", text: "3. Does anyone else say the same?" },
      { type: "paragraph", text: "Open a second source that is genuinely independent — not four accounts all copying the same post. If a striking claim appears in exactly one place, wait." },
      { type: "heading", text: "4. How does it want me to feel?" },
      { type: "paragraph", text: "Information designed to make you furious or frightened in the first three seconds is worth slowing down for. Strong feelings are the fastest route past careful thinking, and people who want to mislead know it." },
      { type: "factbox", title: "Two habits worth having", items: [
        "Check the date. Old photographs and old stories are often re-shared as if they happened today.",
        "Read past the headline. Headlines are written to be clicked; the article often says something narrower.",
      ] },
      { type: "question", text: "Find one surprising claim you saw this week and run it through all four questions. Does it survive?" },
    ],
    related: ["reading-brain", "how-vaccines-teach-your-body"],
  },
  {
    slug: "kindness-is-a-skill",
    title: "Kindness Is a Skill, Not a Mood",
    summary:
      "Being kind is not something you either are or aren't. It is a set of things you can practise — starting with noticing.",
    category: "general-knowledge",
    ageBands: ["6-8", "9-11"],
    pillars: ["empathy", "communication", "citizenship"],
    mode: "inspire",
    readingMinutes: 3,
    artwork: { art: "art", alt: "Two overlapping hands drawn in simple shapes" },
    provenance: "sample",
    publishedAt: "2026-06-12",
    body: [
      { type: "paragraph", text: "People often talk about kindness as though it were a personality — some people have it, some do not. That is not really how it works. Most unkindness is not cruelty. It is not noticing." },
      { type: "heading", text: "Noticing comes first" },
      { type: "paragraph", text: "Someone sitting alone at lunch. Someone who has gone quiet in a group. Someone carrying too much. Kindness usually begins with spotting a situation that other people walked past." },
      { type: "heading", text: "Then asking instead of assuming" },
      { type: "paragraph", text: "The most useful sentence is often the simplest: 'Are you okay?' or 'Do you want company?' You do not have to fix anything. Asking is already the kind part." },
      { type: "factbox", title: "Three things worth practising this week", items: [
        "Learn and use one person's name you have not used before.",
        "When someone tells you something, ask one follow-up question before you say anything about yourself.",
        "Thank someone whose work you normally do not think about.",
      ] },
      { type: "quote", text: "Empathy is not agreeing with someone. It is understanding what it is like to be them." },
      { type: "question", text: "Think of a time someone was kind to you in a small way you still remember. What exactly did they do?" },
    ],
    related: ["reading-brain", "paralympic-classification"],
  },
];

export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const articlesByCategory = (categorySlug: string) =>
  articles.filter((a) => a.category === categorySlug);

export const featuredArticles = () => articles.filter((a) => a.featured);

export const sortedArticles = () =>
  [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const relatedArticles = (slug: string, limit = 3) => {
  const article = articleBySlug(slug);
  if (!article) return [];
  const explicit = (article.related ?? [])
    .map(articleBySlug)
    .filter((a): a is (typeof articles)[number] => Boolean(a));
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const sameCategory = articlesByCategory(article.category).filter(
    (a) => a.slug !== slug && !explicit.some((e) => e.slug === a.slug),
  );
  return [...explicit, ...sameCategory].slice(0, limit);
};
