import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {setIsPreview} from '../../../../redux/actions/advertising'
// styles
import "./style.scss";


const Footer = ({setIsPreview}) => {
  let history = useHistory()

  return (
    <div className="footer">
      <button type="submit">Ad Preview</button>

      <button onClick={() => {setIsPreview(true); history.push('/game')}}>Promote now</button>
    </div>
  );
};

const mapDispatchToProps = {
  setIsPreview
}

export default connect(null, mapDispatchToProps)(Footer);
