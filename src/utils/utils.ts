export const getRandomRGBColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

export const adjustRGBColor = (
  rgbString: string,
  adjustment: number
): string => {
  // Extract RGB values using regex
  const rgbMatch = rgbString.match(
    /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/
  );

  if (!rgbMatch) {
    throw new Error('Invalid RGB format. Expected format: "rgb(r, g, b)"');
  }

  // Parse the RGB values
  const r = parseInt(rgbMatch[1], 10);
  const g = parseInt(rgbMatch[2], 10);
  const b = parseInt(rgbMatch[3], 10);

  // Generate random values within the range [color - adjustment, color + adjustment]
  const getRandomInRange = (baseValue: number, range: number): number => {
    const min = Math.max(0, baseValue - range);
    const max = Math.min(255, baseValue + range);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const newR = getRandomInRange(r, adjustment);
  const newG = getRandomInRange(g, adjustment);
  const newB = getRandomInRange(b, adjustment);

  // Return the new RGB string
  return `rgb(${newR}, ${newG}, ${newB})`;
};
