import React from "react";
// hooks
import useImagePreview from "../../useImagePreview";

const ImagePreview = () => {
  const [image, setFile] = useImagePreview();

  return (
    <div>
      <h2>Ad creative</h2>

      <div className="wrapper-input-file">
        <div className="label-file">
          Select a banner to add <br />
          275 x 270 px
        </div>

        <div className="wrap-input">
          <label className="dashed" htmlFor="ad-file">
            {image ? (
              <img className="image-preview" src={image} />
            ) : (
              <div className="description">Drag and drop file here or</div>
            )}
            <input onChange={setFile} type="file" id="ad-file" />
          </label>

          <label htmlFor="ad-file" className="btn-file">
            Choose file
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
