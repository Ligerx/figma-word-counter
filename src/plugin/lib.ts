/**
 * Type guard that checks if a node supports children
 * @param node
 * @returns node
 */
export function supportsChildren(
  node: SceneNode
): node is FrameNode | ComponentNode | InstanceNode | BooleanOperationNode {
  return (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "BOOLEAN_OPERATION"
  );
}

export type Counts = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
};

/**
 * Get Counts object form a list of nodes
 * @param nodes
 * @returns Counts
 */
export function getCountsForNodes(nodes: SceneNode[]): Counts {
  const textNodes = findAllTextNodesForNodes(nodes);
  const strings = textNodesToStrings(textNodes);
  return getCounts(strings);
}

function findAllTextNodesForNodes(nodes: SceneNode[]): TextNode[] {
  return nodes.flatMap(findAllTextNodesForNode);
}

function findAllTextNodesForNode(node: SceneNode): TextNode[] {
  if (supportsChildren(node) && node.children) {
    return node.findAll(child => child.type === "TEXT") as TextNode[];
  } else if (node.type === "TEXT") {
    return [node];
  }

  return [];
}

function textNodesToStrings(nodes: TextNode[]): string[] {
  return nodes.map(node => node.characters);
}

function getCounts(strings: string[]): Counts {
  return {
    characters: countCharacters(strings),
    charactersNoSpaces: countCharactersNoSpaces(strings),
    words: countWords(strings)
  };
}

// counting words makes most sense with an array of strings instead of 1 concatenated string
function countCharacters(strings: string[]): number {
  let count = 0;
  strings.forEach(string => (count += string.length));
  return count;
}

function countCharactersNoSpaces(strings: string[]): number {
  let count = 0;
  strings.forEach(string => {
    const stringNoSpaces = string.replace(/\s+/g, "");
    count += stringNoSpaces.length;
  });
  return count;
}

function countWords(strings: string[]): number {
  let count = 0;
  strings.forEach(string => {
    count += string.split(/\s+/g).length;
  });
  return count;
}
