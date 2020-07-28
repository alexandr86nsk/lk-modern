import React from 'react';
import './UIFileUploader.scss';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
);

function UIFileUploader(props) {
  const {
    title,
    name,
    callback,
    multiple,
    required,
    hint,
    maxFiles = 5,
    fileTypes = ['image/*'],
    data = [],
  } = props;

  const handleUploadFile = React.useCallback((error, file) => {
    if (!error) {
      callback(name, [...data, file]);
    }
  }, [callback, data, name]);

  const handleRemoveFile = React.useCallback((error, file) => {
    if (!error) {
      callback(name, data.filter((v) => v.id !== file.id));
    }
  }, [callback, data, name]);

  const handleUpdateFile = React.useCallback((files) => {
    callback(name, files);
  }, [callback, name]);

  const className = React.useMemo(() => {
    let str = 'ui-file-uploader';
    if (required) {
      str = `${str} require`;
      if (!data.length) {
        str = `${str} error`;
      } else {
        str = `${str} success`;
      }
    }
    return str;
  }, [data, required]);

  return (
    <div className={className}>
      {title
      && (
        <div className="ui-file-uploader__title font-type-b-10" title={title}>
          <span className="ellipsis-element">{title}</span>
          {required && <div className="require-icon">*</div>}
          {hint && hint}
        </div>
      )}
      <FilePond
        acceptedFileTypes={fileTypes}
        allowMultiple={multiple}
        maxFiles={maxFiles}
        files={data}
        onaddfile={!multiple && handleUploadFile}
        onremovefile={!multiple && handleRemoveFile}
        onupdatefiles={multiple && handleUpdateFile}
        labelIdle='Перетащите ваш файл в окно или <span class="filepond--label-action">Выберите</span>'
      />
    </div>
  );
}

export default React.memo(UIFileUploader);
