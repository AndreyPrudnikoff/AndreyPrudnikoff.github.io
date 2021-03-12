import { useState } from "react";

export default () => {
  const [image, setImage] = useState(null);

  const setFile = ({target}, isChange) => {
    if(isChange) {
      setImage(target);
    } else {
      const localURL = URL.createObjectURL(target.files[0]);
      setImage(localURL);
    }
  };
  return [image, setFile];
};
