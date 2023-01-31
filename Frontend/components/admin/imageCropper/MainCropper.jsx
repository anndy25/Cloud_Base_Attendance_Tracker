import React, { useState } from 'react'
import ImageCropper from './ImageCropper';
import ImageUploadingButton from './ImageUploadingButton';

const MainCropper = () => {
  const [image, setImage] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function setModel(status) {
    setCroppedImage(status);
  }

  return (
    <div className='w-28 h-28 cursor-pointer flex flex-col justify-center items-center text-slate-700 mx-auto my-6'>
      {croppedImage ?
        <div className='group relative w-full h-full'>
          <img src={croppedImage} className='rounded-full z-0' alt="blab" />
          <div className='absolute top-0 right-0 text-white  hidden group-hover:block hover:z-10'>
            <ImageUploadingButton
              value={image}
              onChange={(newImage) => {
                setDialogOpen(true);
                setImage(newImage);
              }}
            />
          </div>

        </div>
        :
        <ImageUploadingButton
          value={image}
          onChange={(newImage) => {
            setDialogOpen(true);
            setImage(newImage);
          }}
        />
      }
      {dialogOpen && (
        <ImageCropper
          image={image.length > 0 && image[0].dataURL}
          setModel={setModel}
          dialogOpen={dialogOpen}
          onComplete={(imagePromisse) => {
            imagePromisse.then((image) => {
              setCroppedImage(image);
              setDialogOpen(false);
            });
          }}
          containerStyle={{
            position: "relative",
            width: "100%",
            height: 300,
            background: "#333"
          }}
        />
      )}
    </div>
  );
}





export default MainCropper