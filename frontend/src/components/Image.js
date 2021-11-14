import React from 'react';
import { getStrapiMedia } from "../services/media";


const Image = ({ image, style }) => {
  const imageUrl = getStrapiMedia(image);

  return (
    <img
      src={imageUrl}
      alt={image.alternativeText || image.name}
      style={style}
    />
  );
};

export { Image };