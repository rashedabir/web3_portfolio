import { gridItems } from "../constants";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";

const Grid = ({ currentStatus }) => {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            currentStatus={currentStatus}
            description={item.description}
            // remove icon prop
            // remove original classname condition
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
            index={i}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
