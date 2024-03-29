interface PageType {
  imgUrl: string;
  cardTitle: string;
  cardBody: string;
  bodyImgs?: string[];
}

export const BUG_LESSON_DATA: { [key: string]: PageType } = {
  PAGE1: {
    imgUrl:
      "https://images.unsplash.com/photo-1576347819574-903b60efcd69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1491&q=80",
    cardTitle: "Bees",
    cardBody:
      "Bees are important because they are polliinators, and pollination is what makes food production possible. A third of the world's food production depends on bees, i.e. every third spoonful of food depends on pollination. Source: worldbeeday.org",
  },
  PAGE2: {
    imgUrl:
      "https://images.unsplash.com/photo-1572602547000-46f762c5723c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    cardTitle: "Slugs",
    cardBody:
      "Slugs are harmful because they eat any kind of vegetation and can damage plants and crops. They tend to live in high moisture environments. Source: gardeningknowhow.com",
  },
  PAGE3: {
    imgUrl:
      "https://images.unsplash.com/photo-1508232926939-f05374492c7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    cardTitle: "Ladybugs",
    cardBody:
      "Ladybugs are good because they feed on soft-bodied, plant-eating insects such as mites, aphids, scales, thripes, and white flies. More than 450 ladybugs species can be found in North America, the most common of which is the seven-spotted ladybug. Source: hgtv.com",
  },
};
