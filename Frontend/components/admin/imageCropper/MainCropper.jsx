import React, { useEffect, useState } from 'react'
import ImageCropper from './ImageCropper';
import ImageUploadingButton from './ImageUploadingButton';


const MainCropper = ({handleInputImageChang,photo}) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  

  function setModel(status) {
    setCroppedImage(status);
  }

  return (
    <>

    <div className='w-28 h-28 cursor-pointer flex flex-col justify-center items-center text-slate-700 mx-auto '>
      {croppedImage ?
        <div className='group relative w-full h-full'>
          <img src={croppedImage} className='rounded-full z-0' alt="blab" />
          <div className='absolute top-0 right-0 text-white  hidden group-hover:block'>
            <ImageUploadingButton
              value={photo}
              onChange={(newImage) => {
                setDialogOpen(true);
             
                handleInputImageChang(newImage)       
              }}
              accept="image/*"
            />
          </div>

        </div>
        :
        <ImageUploadingButton
          value={photo}
          onChange={(newImage) => {
            setDialogOpen(true);
            handleInputImageChang(newImage)  
          }}
          accept="image/*"
        />
      }
      {dialogOpen && (
        <ImageCropper
          image={photo.length>0 && photo[0].dataURL}
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
      <h5 className='text-center mt-2 mb-4 font-medium'>Upload Photo*</h5>   
    </>
  );
}





export default MainCropper