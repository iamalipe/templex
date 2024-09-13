import { randomColor } from "@/lib/utils";
import React from "react";

type HugeTextProps = {
  length?: number;
};
const HugeText = ({ length = 5 }: HugeTextProps) => {
  return (
    <>
      {Array.from({ length: length }).map((_, i) => (
        <HugeTextString key={i} />
      ))}
    </>
  );
};

export default HugeText;

const HugeTextString = () => {
  const color = randomColor();

  return (
    <p style={{ color }} className="text-xs">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad ipsa,
      excepturi accusantium totam iure sit voluptate architecto animi provident
      aut ea asperiores quis expedita officia maxime esse consequuntur quae amet
      voluptatibus neque! Consectetur cupiditate laudantium aspernatur dolor
      reprehenderit a rem. Sunt eligendi nihil in veritatis corrupti, illo
      maiores ut blanditiis, quos deleniti, perferendis culpa mollitia dolor
      saepe voluptas incidunt. Sunt autem quia molestiae quod sapiente officia
      facilis, assumenda eaque doloremque ex magnam maxime reiciendis cupiditate
      obcaecati labore. Itaque consectetur hic minus accusamus laboriosam
      quisquam. Obcaecati incidunt quas neque, minima itaque perferendis maxime,
      numquam beatae eveniet error natus magnam laudantium quibusdam
      consequuntur, hic iure? Perferendis architecto nobis deserunt, voluptas
      optio eum amet repudiandae laudantium enim animi officia soluta adipisci
      vel, facere tempore impedit reprehenderit ratione nostrum placeat dolore.
      Voluptatem temporibus ex, rem eos vel quaerat! Dolorum dolor quod
      laudantium, nesciunt a atque sunt ipsum consectetur possimus vel ipsam,
      eum dolorem autem voluptatibus modi ab tenetur rem alias voluptatem hic?
      Natus, iste. Ad dolorem commodi, provident officiis, vitae, minus neque
      voluptates totam consequatur in doloribus ullam voluptatem fugit eaque
      aliquam corrupti excepturi. Similique odit natus molestias adipisci est
      consequatur voluptas, iure necessitatibus cupiditate. Architecto labore
      eius totam tempora doloribus dolorem consequatur accusamus cumque fuga
      quidem nemo velit ea provident aperiam tempore saepe laboriosam
      laudantium, quam rerum voluptatibus ut iure vitae mollitia commodi!
      Reiciendis aspernatur doloribus eius dolorum veniam temporibus laudantium
      quibusdam minus ullam aperiam ut molestias qui vero officiis, nihil illum.
      Itaque aliquam corrupti voluptatum quia nesciunt, sit tempora
      necessitatibus voluptatem officia blanditiis aperiam qui fuga beatae alias
      veritatis tenetur autem molestiae architecto iste maiores dolor. Quae rem
      ea qui ad animi odio eos, enim, quia consectetur odit natus quam atque
      veniam tenetur maxime iure optio dolor doloribus asperiores expedita
      distinctio molestias repellendus! At error ipsum sapiente recusandae nam
      sint facere cupiditate deleniti molestiae dolor porro nostrum suscipit,
      nihil totam praesentium explicabo reiciendis, voluptates quia. Voluptates,
      dolorem quidem placeat culpa similique voluptatibus distinctio sunt
      quibusdam unde labore ex perspiciatis voluptate praesentium, nihil facilis
      ipsa cumque quaerat accusantium. Suscipit enim modi asperiores maxime
      eaque doloribus eum minima esse. Molestiae, fugiat. Placeat amet eveniet
      qui sequi animi suscipit dicta saepe debitis? Fugiat dolorum molestiae
      iste, nemo minus nobis recusandae nulla minima, aut velit libero incidunt
      id hic blanditiis, vitae quam nesciunt excepturi modi ab vero
      exercitationem provident necessitatibus ducimus. Laboriosam autem,
      assumenda libero necessitatibus iusto nobis accusamus eaque dolorem
      maiores odit. Quis molestiae libero deleniti dicta adipisci amet
      laudantium beatae id ad quod nostrum eaque quisquam architecto,
      exercitationem soluta voluptatem recusandae magni ipsam blanditiis cumque.
      Quasi ab sapiente et sit excepturi labore dicta odio a, praesentium
      quaerat tempore facilis aspernatur quas quo expedita iste omnis fugiat ut
      nam? Modi neque eveniet quibusdam fugit minus quia non voluptas quas
      necessitatibus ipsa mollitia culpa distinctio deleniti soluta deserunt
      debitis maxime, accusamus repellendus reprehenderit. Nam eum sunt
      doloremque similique, voluptatum voluptatem qui ut, pariatur temporibus
      fugiat perspiciatis architecto, natus eos quod deleniti eaque
      reprehenderit placeat? Nesciunt officiis eum voluptas sed ex mollitia eius
      ducimus quaerat, velit quisquam?
    </p>
  );
};
