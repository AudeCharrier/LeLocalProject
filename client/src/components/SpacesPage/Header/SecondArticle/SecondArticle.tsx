import "./SecondArticle.css";
import useSpaces from "../../../../hooks/useSpaces";
import type { Space } from "../../../../types/space";
import CardCategorySecondArticle from "./CardCategorySecondArticle/CardCategorySecondArticle";

function SecondArticle() {
  const spaces = useSpaces();
  const filteredSpaces = spaces.filter(
    (space) =>
      space.space_type !== "Evenements" &&
      space.space_type !== "Détente" &&
      space.space_category !== "Atelier",
  );
  const groupedSpaces = filteredSpaces.reduce(
    (acc, space) => {
      const category =
        space.space_category === "Studio d'enregistrement" ||
        space.space_category === "Studio photo"
          ? "Studio"
          : space.space_category;

      if (!acc[category]) {
        acc[category] = {
          spaces: [],
        };
      }

      acc[category].spaces.push(space);

      return acc;
    },
    {} as Record<string, { spaces: Space[] }>,
  );

  return (
    <article className="header-spaces-page-second-article">
      {Object.entries(groupedSpaces).map(([category, { spaces }], index) => (
        <CardCategorySecondArticle
          key={category}
          spaces={spaces}
          categoryName={category}
          categoryId={index + 1}
        />
      ))}
    </article>
  );
}

export default SecondArticle;
