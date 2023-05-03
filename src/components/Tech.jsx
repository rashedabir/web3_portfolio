import React, { useLayoutEffect, useState } from "react";

import { SectionWrapper } from "../hoc";
import { BallCanvas } from "./canvas";

import client from "../Client";

const Tech = () => {
  const [skills, setSkills] = useState([]);

  useLayoutEffect(() => {
    client
      .fetch(
        `*[_type == "skills"]{
      name,
      icon{
        asset->{
          _id,
          url
        },
      },
      hexCode,
    }`
      )
      .then((data) => {
        if (data) {
          setSkills(data);
        } else {
          setSkills([]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {skills &&
        skills.length > 0 &&
        skills.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology?.icon?.asset?.url} />
          </div>
        ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
