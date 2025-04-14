import React, { useCallback, useState, useEffect } from 'react';
import FileUploader from 'devextreme-react/file-uploader';
import "./PhotoUploader.scss"

const allowedFileExtensions = ['.jpg', '.jpeg', '.gif', '.png'];

export default function PhotoUploader({ imageSource, onFileUpload }) {
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const onDropZoneEnter = useCallback(({ component, event }) => {
    const items = event.originalEvent.dataTransfer.items;
    if (items.length === 1 && allowedFileExtensions.includes(`.${items[0].type.replace(/^image\//, '')}`)) {
      setIsDropZoneActive(true);
    }
  }, []);

  useEffect(() => {
    setImageSrc(imageSource ?? '');
  }, [imageSource]);

  const onDropZoneLeave = useCallback(() => setIsDropZoneActive(false), []);

  const onValueChanged = useCallback((e) => {
    const file = e.value[0]; 
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setIsDropZoneActive(false);
        setImageSrc(fileReader.result); 
        onFileUpload(file); 
      };
      fileReader.readAsDataURL(file);
    }
  }, [onFileUpload]);


  return (
    <div className="widget-container flex-box">
      <div id="dropzone-external" className={`flex-box ${isDropZoneActive ? 'dropzone-active' : ''}`}>
        {imageSrc && <img id="dropzone-image" src={imageSrc} alt="Uploaded" />}
        {!imageSrc && <div id="dropzone-text" className="flex-box">Drag & Drop or Click to Upload</div>}
      </div>
      <FileUploader
        id="file-uploader"
        dialogTrigger="#dropzone-external"
        dropZone="#dropzone-external"
        multiple={false}
        allowedFileExtensions={allowedFileExtensions}
        uploadMode="useButtons"
        visible={false}
        onDropZoneEnter={onDropZoneEnter}
        onDropZoneLeave={onDropZoneLeave}
        onValueChanged={onValueChanged}
      />
    </div>
  );
}