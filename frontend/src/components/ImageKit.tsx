import React from 'react'
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import {urlEndpoint, publicKey, authenticator} from '../network/imagekit_api'

interface ImageKitProps {
    path?: string;
}


const ImageKit = (props : ImageKitProps) => {
    const path = props.path  || "default-image.jpg";
  return (
    <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
    >
        <IKImage
            path={path}
            transformation={[{ height: '300', width: '400' }]}
            lqip={{ active:true }}
            loading="lazy"
            height="300"
            width="400"
        />


    </IKContext>
  )
}

/*
<p>Upload an image</p>
<IKUpload
  fileName="test-upload.png"
  onError={onError}
  onSuccess={onSuccess}
/>
*/
export default ImageKit