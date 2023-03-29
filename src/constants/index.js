import {
  adonis,
  apsis,
  backend,
  carrent,
  creator,
  deno,
  docker,
  electronjs,
  java,
  javascript,
  jobit,
  m4yours,
  material,
  mobile,
  mongodb,
  nestjs,
  nextjs,
  nodejs,
  python,
  reactjs,
  redux,
  sanity,
  sql,
  tailwind,
  tripguide,
  typeorm,
  typescript,
  web,
  eduport,
  unisearch,
  bengalmeat,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "Flutter Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Next JS",
    icon: nextjs,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Adonis JS",
    icon: adonis,
  },
  {
    name: "Deno JS",
    icon: deno,
  },
  {
    name: "Electron JS",
    icon: electronjs,
  },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Nest JS",
    icon: nestjs,
  },
  {
    name: "Sanity",
    icon: sanity,
  },
  {
    name: "SQL",
    icon: sql,
  },
  {
    name: "Type ORM",
    icon: typeorm,
  },
];

const experiences = [
  {
    title: "Associate Software Engineer",
    company_name: "Apsis Solutions LTD.",
    icon: apsis,
    iconBg: "#ffffff",
    date: "Aug 2022 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Junior Software Engineer",
    company_name: "M4yours IT",
    icon: m4yours,
    iconBg: "#ffffff",
    date: "Nov 2021 - Jul 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Eduport",
    description:
      "Eduport, built specifically for the education centers which is dedicated to teaching and involve learners.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "nestjs",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "pink-text-gradient",
      },
    ],
    image: eduport,
    source_code_link: "https://eduport.vercel.app",
  },
  {
    name: "UniSearch",
    description:
      "UniSearch is a complete access point where international student experience converge to make study abroad solutions than ever.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "nestjs",
        color: "green-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
    ],
    image: unisearch,
    source_code_link: "https://myunisearch.com",
  },
  {
    name: "Bengal Meat",
    description:
      "Bengal Meat produce safe wholesome meat and meat products that are of the standard for domestic and international markets.  ",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "nestjs",
        color: "green-text-gradient",
      },
      {
        name: "mysql",
        color: "pink-text-gradient",
      },
    ],
    image: bengalmeat,
    source_code_link: "https://www.bengalmeat.com",
  },
];

export { services, technologies, experiences, testimonials, projects };
