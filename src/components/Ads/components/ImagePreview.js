import React from "react";
// hooks
import useImagePreview from "../../useImagePreview";
import {addBanner, setIsPreview} from '../../../redux/actions/advertising'
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const ImagePreview = ({addBanner, banner, isPreview, previewBanner, setIsPreview}) => {
  const [image, setFile] = useImagePreview();
  let history = useHistory()

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
            {previewBanner ? (<img className="image-preview" src={banner} />) :
            (image ? (
              <img className="image-preview" src={image} />
            ) : (
              <div className="description">Drag and drop file here or</div>
            ))
            }
            
            <input onChange={(e) => {setFile(e); encodeImageFileAsURL(e)}} type="file" id="ad-file"  />
          </label>

          <label htmlFor="ad-file" className="btn-file">
            Choose file
          </label>
          <span onClick={() => {setIsPreview(true); history.push('/game')}} className='btn-ad-preview'>Ad Preview</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    banner: state.adsOptions.banner,
    isPreview: state.adsOptions.isPreview,
    previewBanner: state.adsOptions.previewBanner
  }
  
}

const mapDispatchToProps = {
  addBanner,
  setIsPreview
}
export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview);
