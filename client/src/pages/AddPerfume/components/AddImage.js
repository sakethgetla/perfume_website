import React from "react";
import Dropzone from "react-dropzone";

const AddImage = ({ onChange }) => {
  const handleChange = (image) => {
    onChange("images", image);

    console.group("Image Added");
    console.log(image);
    console.groupEnd();
  };

  // ======= FILE UPLOAD + SHOW FILE =======
  // https://github.com/iamjordan/waves/blob/master/client/src/components/utils/Forms/fileUpload.js

  return (
    <div>
      <Dropzone onDrop={(acceptedFiles) => handleChange(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button type="button">Add Image</button>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default AddImage;
