import React from 'react';
import { connect } from 'react-redux';
import getIconByFileExtension from '../../utilities/getIconByFileExtension';
import actions from '../../../redux/actions/actions';


function UITableFile(props) {
  const {
    id,
    fileType,
    title,
    multi,
    files,
    currentFile,
    filePreviewStoreSetSection,
    customId,
    getStgFile,
    component,
  } = props;

  const handleClick = React.useCallback(() => {
    if (multi) {
      filePreviewStoreSetSection({
        id,
        fileType,
        currentFile,
        files,
        customId,
        multi,
        title,
        component,
      });
    } else {
      filePreviewStoreSetSection({
        title,
        fileType,
        component,
      });
      getStgFile({ id });
    }
  }, [
    component,
    currentFile,
    customId,
    filePreviewStoreSetSection,
    fileType,
    files,
    getStgFile,
    id,
    multi,
    title,
  ]);

  const fileIcon = React.useMemo(
    () => getIconByFileExtension(fileType),
    [fileType],
  );

  return (
    <div className="file-preview" role="presentation" onClick={handleClick}>
      <div className="file-preview__icon">{fileIcon}</div>
      <div className="file-preview__title">Файл</div>
    </div>
  );
}

const mapDispatchToProps = { ...actions };

export default connect(null, mapDispatchToProps)(React.memo(UITableFile));
