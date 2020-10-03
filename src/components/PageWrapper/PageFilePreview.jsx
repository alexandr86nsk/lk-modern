import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UIFilePreview from '../UIFilePreview/UIFilePreview';


function PfpTest(props) {
  const {
    show,
    file,
    files,
    fixed,
    loading,
    filePreviewStoreClear,
    filePreviewStoreSetSection,
    title,
    fileType,
    getStgFileCancel,
    currentFile,
    customId,
    getStgFile,
    multi,
    component,
  } = props;

  const handleClose = React.useCallback(() => {
    filePreviewStoreClear();
    getStgFileCancel();
  }, [getStgFileCancel, filePreviewStoreClear]);

  React.useEffect(() => {
    if (files && files[currentFile] && files[currentFile][customId]) {
      getStgFile({
        id: files[currentFile][customId],
      });
    }
  }, [currentFile, customId, files, getStgFile]);

  const handleChangeFile = React.useCallback((value) => {
    if (value === 'increase') {
      if (currentFile < files.length - 1) {
        filePreviewStoreSetSection({
          currentFile: currentFile + 1,
        });
      } else {
        filePreviewStoreSetSection({
          currentFile: 0,
        });
      }
    } else if (currentFile > 0) {
      filePreviewStoreSetSection({
        currentFile: currentFile - 1,
      });
    } else {
      filePreviewStoreSetSection({
        currentFile: files.length - 1,
      });
    }
  }, [currentFile, filePreviewStoreSetSection, files.length]);

  const renderComponent = React.useMemo(() => {
    if (component && files && files[currentFile]) {
      return component(files[currentFile]);
    }
    return null;
  }, [component, currentFile, files]);

  return (
    <div className="page-file-preview">
      {show
      && (
        <UIFilePreview
          callback={handleClose}
          preview={file || ''}
          image={!multi ? fileType !== 'pdf' : files && files[currentFile] && files[currentFile].fileExtension && files[currentFile].fileExtension.replace(/\./g, '') !== 'pdf'}
          loading={loading}
          fixed={fixed}
          title={title
          // eslint-disable-next-line max-len
            || (files && files[currentFile] && files[currentFile].fileName && files[currentFile].fileName)
          // eslint-disable-next-line max-len
            || (files && files[currentFile] && files[currentFile].printOrder && `Порядок вывода: ${files[currentFile].printOrder}`)}
          changeFileCallback={handleChangeFile}
          multi={multi}
          component={renderComponent}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  fixed: state.filePreviewStore.fixed,
  typeImage: state.filePreviewStore.typeImage,
  show: state.filePreviewStore.show,
  file: state.filePreviewStore.file,
  files: state.filePreviewStore.files,
  title: state.filePreviewStore.title,
  loading: state.filePreviewStore.loading,
  currentFile: state.filePreviewStore.currentFile,
  customId: state.filePreviewStore.customId,
  multi: state.filePreviewStore.multi,
  fileType: state.filePreviewStore.fileType,
  component: state.filePreviewStore.component,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PfpTest);
