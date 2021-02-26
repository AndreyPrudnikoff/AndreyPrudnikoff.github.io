import { useState } from "react";

export default () => {
  const [image, setImage] = useState(null);

  const setFile = ({ target }) => {
    const localURL = URL.createObjectURL(target.files[0]);

    setImage(localURL);
  };

  return [image, setFile];
};
