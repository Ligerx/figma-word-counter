import { getCountsForNodes } from "./lib";

figma.showUI(__html__);

figma.on("selectionchange", () => {
  postCountsMessage(figma.currentPage.selection);
});

figma.on("currentpagechange", () => {
  postCountsMessage(figma.currentPage.selection);
});

/**
 * Post message to UI with the most up to date word and character counts.
 * @param nodes
 */
function postCountsMessage(nodes: readonly SceneNode[]) {
  // Figma returns `readonly SceneNode[]` from figma.currentPage.selection,
  // so we manually copy the array to create a mutable version of it.
  const counts = getCountsForNodes([...nodes]);
  figma.ui.postMessage(counts);
}
