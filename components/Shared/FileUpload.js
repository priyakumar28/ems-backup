import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DropBox from '../Icons/DropBox';

function FileUpload(props) {
    const { onDropFiles, files } = props;
    const onDrop = useCallback(acceptedFiles => {
        onDropFiles(acceptedFiles, files);
    }, [files]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/jpeg,image/png,image/jpg,application/pdf',
    });
    return (
        <div {...getRootProps()} className="drop-border doc-upload">
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <span>
                        <DropBox />
                        <p className='secondary-text-label mt-2'>Drop files to upload </p>
                    </span>
            }
        </div>
    )
}

export default FileUpload