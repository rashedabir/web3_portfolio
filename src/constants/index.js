import {
  adonis,
  apsis,
  backend,
  bengalmeat,
  creator,
  deno,
  docker,
  eduport,
  electronjs,
  java,
  m4yours,
  mobile,
  mongodb,
  nestjs,
  nextjs,
  nodejs,
  reactjs,
  redux,
  sanity,
  sql,
  unisearch,
  web,
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
  {
    id: "github",
    title: "Github",
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
];

const experiences = [
  {
    title: "Associate Software Engineer",
    company_name: "Apsis Solutions LTD.",
    icon: apsis,
    iconBg: "#ffffff",
    date: "Aug 2022 - Present",
    points: [
      "Design, develop and deploy the components, features, and rich functionalities of the projects.",
      "Solving critical problems of projects.",
      "Work out possible improvements and suggest changes to the system that can benefit the overall projects.",
    ],
  },
  {
    title: "Junior Software Engineer",
    company_name: "M4yours IT",
    icon: m4yours,
    iconBg: "#ffffff",
    date: "Nov 2021 - Jul 2022",
    points: [
      "Write code all day and learning about new things of technology.",
      "Collaborating with cross-functional teams to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rashed proved me wrong.",
    name: "comarine",
    designation: "Client",
    company: "Fiverr",
    image:
      "https://media.istockphoto.com/id/1202490554/vector/person-gray-photo-placeholder-man.jpg?s=612x612&w=0&k=20&c=KyXtDhRIFdY-xFnyc_19UEK0pY3PLz2R6Bpv--VPYwo=",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rashed does.",
    name: "angelpare",
    designation: "Client",
    company: "Fiverr",
    image:
      "https://t3.ftcdn.net/jpg/02/33/46/24/360_F_233462402_Fx1yke4ng4GA8TJikJZoiATrkncvW6Ib.jpg",
  },
  {
    testimonial:
      "After Rashed optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Abu Baqar Siddique",
    designation: "Software Engineer",
    company: "Enterprises 360",
    image:
      "https://media.istockphoto.com/id/1202490554/vector/person-gray-photo-placeholder-man.jpg?s=612x612&w=0&k=20&c=KyXtDhRIFdY-xFnyc_19UEK0pY3PLz2R6Bpv--VPYwo=",
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
