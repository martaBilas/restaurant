import React from "react";
import "./Menu.css";
import { Row } from "react-bootstrap";
import MenuItem from "./MenuItem";

const menuData = [
  {
    id: 0,
    name: "Breakfast with sun-dried tomatoes and salmon",
    price: 340,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/cyWDVwK-HbHMYFX-ElDYycd.jpeg",
    description:
      "Brioche, lightly salted salmon, guacamole, poached eggs, cheese sauce (from cheddar), microgreens\n Salad mix, sun-dried tomatoes, lemon-honey dressing, nut mix",
    weight: 340,
    catalogueId: 0,
  },
  {
    id: 1,
    name: "Breakfast with salmon and poached egg",
    price: 330,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/qGdnPXe-HzjdxTN-kkeTUXa.jpeg",
    description:
      "Brioche with feta cream, poached eggs, avocado, lightly salted salmon, green peas, cheese sauce (from cheddar), microgreens, salad mix, cocktail tomatoes, lemon-honey dressing, sesame",
    weight: 290,
    catalogueId: 0,
  },
  {
    id: 2,
    name: "Breakfast designer",
    price: 190,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/BwLfjlI-TFmougX-fSKKssc.jpeg",
    description:
      "Eggs to choose from: boiled, scrambled, scrambled\nSalad mix, olives, olives, broccoli, lemon-honey dressing, cocktail tomatoes, dukkah seasoning\nBrioche with feta cream",
    weight: 300,
    catalogueId: 0,
  },
  {
    id: 3,
    name: "Cheesecakes with cherries and mascarpone cream",
    price: 235,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/kDRmqnS-CCVmOqg-XUohCqF.jpeg",
    description:
      "Cheesecakes 4 pieces, mascarpone sauce, cherry confit, basil, cinnamon",
    weight: 300,
    catalogueId: 0,
  },
  {
    id: 4,
    name: "Cheesecakes with white chocolate",
    price: 265,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/TsmvvEk-AGbrkeJ-pUaPkCB.jpeg",
    description:
      "Cheesecakes, white chocolate sauce, poppy seeds, fried coconut shavings, almond flakes, blueberries",
    weight: 360,
    catalogueId: 0,
  },
  {
    id: 5,
    name: "Cheesecakes with salted caramel",
    price: 235,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/JgFgOFa-IOUDfbb-ppqIakZ.jpeg",
    description:
      "Cheesecakes 4 pcs. caramelized banana, caramel mascarpone sauce, caramelized nuts, almond flakes, salted caramel",
    weight: 340,
    catalogueId: 0,
  },
  {
    id: 6,
    name: "A plate with chicken, pita bread and cheese",
    price: 260,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/tvcnraH-CUWJjBh-GeDPfGN.jpeg",
    description: "",
    weight: 420,
    catalogueId: 0,
  },
  {
    id: 7,
    name: "A plate with salmon",
    price: 360,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/UwCsnUR-EIhnOul-kiBlFOR.jpeg",
    description:
      "Couscous, lightly salted salmon, avocado, cucumber, cocktail tomatoes, nori, Teriyaki sauce, lime, cream cheese, sesame\n\nFats 23.72\nCarbohydrates 68.16\nProtein 25.55",
    weight: 395,
    catalogueId: 0,
  },
  {
    id: 8,
    name: "A plate with tuna",
    price: 260,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/MCIsjVM-scbKXll-DHsuJDw.jpeg",
    description: "",
    weight: 390,
    catalogueId: 0,
  },
  {
    id: 9,
    name: "A plate with avocado and fried Adyghe cheese",
    price: 260,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/EeUdOCL-euKLYCi-YDpeDKo.jpeg",
    description:
      "Cereal mix: Bulgur and quinoa\nAvocado, fried Adyghe cheese, Cocktail tomatoes, salad mix, green peas, Lokhina, seed mix, microgreens, pesto sauce\n\nFats 27.7 g\nCarbohydrates 42.5 g\nProtein 20 g",
    weight: 430,
    catalogueId: 0,
  },
  {
    id: 10,
    name: "Margarita",
    price: 200,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/MuwmsPN-CekNwWy-lJjrACY.jpeg",
    description: "Tomato sauce, mozzarella, parmesan, basil",
    weight: 300,
    catalogueId: 0,
  },
  {
    id: 11,
    name: "Salami",
    price: 200,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/ubYFlaN-JqIvVfg-TXCLJZI.jpeg",
    description: "Tomato sauce, mozzarella, arugula, salami, parmesan",
    weight: 439,
    catalogueId: 0,
  },
  {
    id: 12,
    name: "salalami",
    price: 200,
    imageUrl:
      "https://cdn-media.choiceqr.com/prod-eat-salalatpimonenka/menu/ubYFlaN-JqIvVfg-TXCLJZI.jpeg",
    description: "Tomato sauce, mozzarella, arugula, salami, parmesan",
    weight: 439,
    catalogueId: 0,
  },
];

const Menu = (props) => {
  const filteredMenuData = menuData.filter(item => item.catalogueId===props.catalogueItemId)
  return (
    <Row>
      {filteredMenuData.map((item) => (
        <div key={item.id} className="col-md-4  mb-4">
          <MenuItem
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.price}
            description={item.description}
            weight={item.weight}
            catalogueId={item.catalogueId}
          />
        </div>
      ))}
    </Row>
  );
};

export default Menu;