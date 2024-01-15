import { useState, useRef } from "react";
import "./ImageGenerator.css";
import default_image from "../../assets/default_image.svg";

const ImageGenerator = () => {
  const openAiSecretKey = import.meta.env.VITE_REACT_APP_OPENAI_SECRET_KEY;

  const [imageUrl, setImageUrl] = useState("/");
  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiSecretKey}`,
          "User-Agent": "chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();

    let data_array = data.data;
    console.log(data_array[0].url);
    setImageUrl(data_array[0] && data_array[0].url);

    setLoading(false);
  };
  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="image-loading">
        <div className="image">
          <img
            src={imageUrl === "/" ? default_image : imageUrl}
            alt="default_image"
          />
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
          <div className={loading ? "loading-text" : "display-none"}>
            Loading...
          </div>
        </div>
      </div>
      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="Describe what you want to see"
          className="search-input"
        />
        <div
          className="generate-btn"
          onClick={() => {
            imageGenerator();
          }}
        >
          Generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
