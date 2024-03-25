export const FlattenMultiLevel = <T extends { text: string; children: T[] }>(
  content: T[],
  level = 0
): T[] => {
  let flatContent: T[] = [];
  for (const c of content) {
    const pushData = {
      ...c,
      text: '--'.repeat(level * 2) + c.text,
    };
    flatContent.push(pushData);
    if (c.children) {
      const childrenData = FlattenMultiLevel(c.children, level + 1);
      flatContent = flatContent.concat(childrenData);
    }
  }
  return flatContent;
};
