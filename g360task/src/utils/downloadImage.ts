const downloadImage = async (res: Response) => {
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "image");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadImage;
