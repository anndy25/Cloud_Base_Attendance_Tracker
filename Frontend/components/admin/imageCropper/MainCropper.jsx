import React,{useState} from 'react'
import ImageCropper from './ImageCropper';
import ImageUploadingButton from './ImageUploadingButton';

const MainCropper = () =>  {
  const [image, setImage] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  function setModel(status) {
    setCroppedImage(status);
  }

  return (
    <div className='w-28 h-28 rounded-full border-dashed border-4 flex flex-col justify-center items-center text-slate-700 mx-auto my-6'>
      <ImageUploadingButton
        value={image}
        onChange={(newImage) => {
          setDialogOpen(true);
          setImage(newImage);
        }}
      />
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
      {croppedImage && <img src={croppedImage} alt="blab" />}
    </div>
  );
}





    export default MainCropper