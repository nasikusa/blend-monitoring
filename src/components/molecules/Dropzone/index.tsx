import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function Dropzone() {
  const onDrop = useCallback(() => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>active</p>}
    </div>
  );
}

export default Dropzone;
