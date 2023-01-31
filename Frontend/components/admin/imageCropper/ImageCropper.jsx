import React, { useState } from 'react'
import Cropper from "react-easy-crop";
import { cropImage } from "./cropUtils";

const ImageCropper = ({ image, onComplete, setModel, containerStyle, ...props }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  return (
    <div className="w-screen h-screen absolute top-0 right-0 flex justify-center items-center">
      <div className='w-[40%]  text-lg font-semibold bg-white border rounded-2xl p-4 shadow-md'>
        <header className='py-4 text-xl'>Crop Image</header>

        <div style={containerStyle}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            onZoomChange={setZoom}
            {...props}
          />
        </div>


        <button
          className='py-3 px-6 bg-blue-600 text-white rounded-md  my-2'
          onClick={() => {
            setModel(false);
            onComplete(cropImage(image, croppedAreaPixels, console.log));
          }}
        >
          Finish
        </button>
      </div>
    </div>
  );
};
export default ImageCropper