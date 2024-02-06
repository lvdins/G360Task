type ContentTypes = {
  [key: string]: string;
};

const getContentType = (imageType: string): string => {
  const types: ContentTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };

  return types[imageType.toLowerCase()] || "application/octet-stream";
};

export default getContentType;
