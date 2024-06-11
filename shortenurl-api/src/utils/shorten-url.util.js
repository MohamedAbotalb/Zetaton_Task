import axios from "axios";

axios.defaults.headers.common["User-Agent"] = "";

// Create a function to shorten the image url using shareaholic api
export const shortenURL = async (url) => {
  try {
    const res = await axios.get(
      `https://www.shareaholic.com/v2/share/shorten_link?apikey=8943b7fd64cd8b1770ff5affa9a9437b&url=${encodeURIComponent(
        url
      )}&service[name]=shrlc`
    );
    return res.data.data;
  } catch (error) {
    throw new Error("Failed to shorten URL");
  }
};
