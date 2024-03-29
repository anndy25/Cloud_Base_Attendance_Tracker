import React,{useState} from 'react'
import ImageUploading from "react-images-uploading";
import { FiUpload } from "react-icons/fi";

const ImageUploadingButton = ({ value, onChange, ...props }) => {
    return (
      <ImageUploading value={value} onChange={onChange}>
        {({ onImageUpload, onImageUpdate }) => (
          <button
            
          className='w-28 h-28 flex flex-col justify-center items-center  rounded-full border-dashed border-4'
            onClick={value ? onImageUpload : () => onImageUpdate(0)}
            {...props}
          >
            <FiUpload className='text-4xl' />
            <small>Upload</small>
          </button>
        )}
      </ImageUploading>
    );
};

export default ImageUploadingButton