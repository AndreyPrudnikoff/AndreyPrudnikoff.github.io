import React from "react";
// hooks
import useImagePreview from "../../useImagePreview";
import {addImage, setIsPreview} from '../../../redux/actions/advertising'
import { connect } from "react-redux";
import back from "../../../images/back.svg";
import { useHistory } from "react-router-dom";

const ImagePreview = ({addImage, banner, isPreview, previewBanner, setIsPreview}) => {
  const [image, setFile] = useImagePreview();
  let history = useHistory()

  const encodeImageFileAsURL = (element) => {
    let file = element.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      addImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <span className='backbtn-title-span'>
        <img src={back} alt='back' onClick={() => history.push('/game')} className='backbtn-title-span__btn'/>
        <h2 className='backbtn-title-span__title'>Ad creative</h2>
      </span>
      
      <div className="wrapper-input-file">
        <div className="label-file">
          Select a banner to add <br />
          275 x 270 px
        </div>

        <div className="wrap-input">
          <label className="dashed" htmlFor="image-file">
            {previewBanner ? (<img className="image-preview" src={banner} />) :
            (image ? (
              <img className="image-preview" src={image} />
            ) : (
              <div className="description">Drag and drop file here or</div>
            ))
            }
            
            <input onChange={(e) => {setFile(e); encodeImageFileAsURL(e)}} type="file" id="image-file"  />
          </label>

          <label htmlFor="image-file" className="btn-file">
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
  addImage,
  setIsPreview
}
export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview);
