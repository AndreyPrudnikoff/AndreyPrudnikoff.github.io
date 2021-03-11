import React, { useEffect } from "react";
// hooks
import useImagePreview from "../../useImagePreview";
import {addImage, setIsPreview} from '../../../redux/actions/advertising'
import {image_err} from '../../../redux/actions/ad_errors'
import { connect } from "react-redux";
import back from "../../../images/back.svg";
import { useHistory } from "react-router-dom";
import {setChangedObj} from '../../../redux/actions/changeAd'

const ImagePreview = ({addImage, banner, isPreview, previewBanner, setIsPreview, adErrors, isChange, objData, image_err, imageErr, setChangedObj}) => {
  const [image, setFile] = useImagePreview();
  let history = useHistory()

  useEffect(() => {
    if(isChange) {
      // console.log(objData.image)
      const data = {target: objData.image};
      setFile(data, true)
    }
  }, [])

  const encodeImageFileAsURL = (element) => {
    let file = element.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
      if(isChange) {
        setChangedObj('image', reader.result)
      } else {
        addImage(reader.result);
      }
      
    }
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <span className='backbtn-title-span'>
        <img src={back} alt='back' onClick={() => history.push('/game')} className='backbtn-title-span__btn'/>
        <h2 className='backbtn-title-span__title'>{isChange ? 'Ad changing' : 'Ad creative'}</h2>
      </span>
      
      <div className="wrapper-input-file">
        <div className="label-file">
          Select a banner to add <br />
          275 x 270 px
        </div>

        <div className="wrap-input">
          <label className="dashed" htmlFor="image-file" style={{borderColor: imageErr ? '#F94439' : '#fff'}}>
            {previewBanner ? (<img className="image-preview" src={banner} />) :
            (image ? (
              <img className="image-preview" src={image} />
            ) : (
              <div className="description">Drag and drop file here or</div>
            ))
            }
            
            <input onChange={(e) => {setFile(e, false); encodeImageFileAsURL(e); image_err(false)}} type="file" id="image-file"  />
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
    previewBanner: state.adsOptions.previewBanner,
    adErrors: state.adsOptions.errorsObj,
    isChange: state.adChange.isChange,
    objData: state.adChange.objData,
    imageErr: state.ad_errors_reducer.image
  }
}

const mapDispatchToProps = {
  addImage,
  setIsPreview,
  image_err,
  setChangedObj
}
export default connect(mapStateToProps, mapDispatchToProps)(ImagePreview);
