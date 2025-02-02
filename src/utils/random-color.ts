const randomColorUtility = (length: number) => {
  return Math.floor(Math.random() * length);
};

export const hexy = () => {
  const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexColor = '#';
  for (let i = 0; i < 6; i++) {
    hexColor += hex[randomColorUtility(hex.length)];
  }
  return hexColor;
};
