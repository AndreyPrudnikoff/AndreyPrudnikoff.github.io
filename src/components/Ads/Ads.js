import React from "react";
import { connect } from "react-redux";
// styles
import "./ads.scss";
// components
import { TextInput } from "./components/Duration/components";
import { Duration, ImagePreview, Audience, Method, Footer } from "./components";

const Ads = () => {
  return (
    <form className="round-dark ads">
      <ImagePreview />

      <TextInput label="Website URL" />

      <hr />

      <Audience />

      <hr />

      <Method />

      <hr />

      <Duration />

      <Footer />
    </form>
  );
};

export default connect(null, null)(Ads);
