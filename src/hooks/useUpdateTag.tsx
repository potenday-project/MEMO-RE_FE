const useUpdateTag = (prev: string[], edited: string[]) => {
  const updated: string[] = [...prev, ...edited];
  const data: Record<string, boolean> = {};

  const count: Record<string, number> = updated.reduce(
    (acc: Record<string, number>, cur: string) => {
      acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
      return acc;
    },
    {}
  );

  for (const tag in count) {
    if (count[tag] === 2) data[tag] = true;
    if (count[tag] === 1) {
      data[tag] = prev.includes(tag) ? false : true;
    }
  }
  return data;
};

export default useUpdateTag;
