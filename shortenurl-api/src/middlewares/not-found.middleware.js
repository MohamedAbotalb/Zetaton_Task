export const notFound = (req, res, next) => {
  res.status(404).json({ data: "Not Found page" });
};
