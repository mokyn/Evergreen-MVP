/**
 * IDs of columns. Each column should contain trees of a particular shape.
 */
export enum TreeColumn {
  /**
   * Column that contains circle-shaped trees.
   */
  CIRCLE = "circle",
  /**
   * Column that contains triangle-shaped trees.
   */
  TRIANGLE = "triangle",
  /**
   * Column that contains unsorted trees.
   */
  UNSORTED = "unsorted",
}

export enum BackgroundStyle {
  INITIAL = "bg-gray-200",
  SUCCESS = "bg-green-200",
}

export const TREE_COLUMNS = {
  [TreeColumn.CIRCLE]: {
    id: TreeColumn.CIRCLE,
    name: "Circle",
    currentTreeIds: [],
    targetTreeIds: ["tree4", "tree5", "tree6"],
    backgroundStyle: "bg-gray-200",
  },
  [TreeColumn.TRIANGLE]: {
    id: TreeColumn.TRIANGLE,
    name: "Triangle",
    currentTreeIds: [],
    targetTreeIds: ["tree1", "tree2", "tree3"],
    backgroundStyle: "bg-gray-200",
  },
  [TreeColumn.UNSORTED]: {
    id: TreeColumn.UNSORTED,
    name: "Unsorted",
    currentTreeIds: ["tree1", "tree2", "tree3", "tree4", "tree5", "tree6"],
    targetTreeIds: [],
    backgroundStyle: "bg-gray-200",
  },
};

export const TREE_DATA = {
  tree1: {
    id: "tree1",
    name: "Fir",
    imgUrl:
      "https://www.nps.gov/articles/images/3_BWA_Damage_Dickinson-960px.jpg",
  },
  tree2: {
    id: "tree2",
    name: "Spruce",
    imgUrl:
      "https://cdn.shopify.com/s/files/1/2045/8185/products/10675470_1024x1024.jpg?v=1603468431",
  },
  tree3: {
    id: "tree3",
    name: "Pine",
    imgUrl:
      "https://cdn11.bigcommerce.com/s-2lqvsr5/images/stencil/800x800/products/746/303/va__42207.1596418659.jpg?c=2",
  },
  tree4: {
    id: "tree4",
    name: "Red Maple",
    imgUrl:
      "https://www.naturehills.com/media/catalog/product/cache/35c1080e597d6a74b42d0d88ced836c1/s/u/summer-red-maple-tree-600x600_1.jpg",
  },
  tree5: {
    id: "tree5",
    name: "Jacaranda",
    imgUrl:
      "https://cdn.shopify.com/s/files/1/0062/8532/8445/products/Jacaranda_BB_600x600_a9fd4fad-0fe9-4969-ab30-0943c9e9245a_720x.jpg?v=1602091109",
  },
  tree6: {
    id: "tree6",
    name: "Red Oak",
    imgUrl: "https://www.thetreecenter.com/c/uploads/red-oak-1.jpg",
  },
};
