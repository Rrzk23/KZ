import React from 'react'
import { IKContext, IKImage } from 'imagekitio-react';
import { urlEndpoint, publicKey, authenticator } from '../../network/imageKitApi';

interface ImageKitProps {
  image: string;
  height?: string | number; // Allow dynamic height
  width?: string | number; // Allow dynamic width
}

const ImageKit: React.FC<ImageKitProps> = (props) => {
  const { image = 'deafult.jpg', height = '100%', width = '100%' } = props;

  return (

      <IKImage
        urlEndpoint={urlEndpoint}
        src={image}
        transformation={[{ height: height.toString(), width: width.toString() }]}
        lqip={{ active: true }}
        loading="lazy"
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover', // Ensures the image scales to fit proportionally
          borderRadius: '8px', // Optional: Rounded corners
        }}
      />

  );
};

export default ImageKit;
