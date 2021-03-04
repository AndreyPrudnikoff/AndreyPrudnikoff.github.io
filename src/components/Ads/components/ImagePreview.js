import React from "react";
// hooks
import useImagePreview from "../../useImagePreview";
import {addBanner} from '../../../redux/actions/advertising'
import { connect } from "react-redux";

const ImagePreview = ({addBanner}) => {
  const [image, setFile] = useImagePreview();

  const encodeImageFileAsURL = (element) => {
    let file = element.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      addBanner(reader.result);
    }
    reader.readAsDataURL(file);
  }

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
            <input onChange={(e) => {setFile(e); encodeImageFileAsURL(e)}} type="file" id="ad-file"  />
          </label>

          <label htmlFor="ad-file" className="btn-file">
            Choose file
          </label>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  addBanner
}
export default connect(null, mapDispatchToProps)(ImagePreview);
