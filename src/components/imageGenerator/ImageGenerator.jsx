import "./ImageGenerator.css";
import default_image from "../../assets/default_image.svg";

const ImageGenerator = () => {
  return (
    <div className="ai-image-generator">
      <div className="header">
        Ai image <span>generator</span>
      </div>
      <div className="image-loading">
        <div className="image">
          <img src={default_image} alt="default_image" />
        </div>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Describe what you want to see"
          className="search-input"
        />
        <div className="generate-btn">Generate</div>
      </div>
    </div>
  );
};

export default ImageGenerator;
