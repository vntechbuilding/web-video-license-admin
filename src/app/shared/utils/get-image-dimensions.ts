export declare type imageDimensions = {
  width: number;
  height: number;
};
export const GetImageDimensions = (
  base64Image: string
): Promise<imageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = base64Image;
  });
};
