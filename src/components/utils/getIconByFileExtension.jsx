import React from 'react';
import PdfIcon from '../../assetssadads/icons/file-extensions/pdf.svg';
import DocIcon from '../../assetssadads/icons/file-extensions/doc.svg';
import JpgIcon from '../../assetssadads/icons/file-extensions/jpg.svg';
import XlsIcon from '../../assetssadads/icons/file-extensions/xls.svg';
import FileIcon from '../../assetssadads/icons/file.svg';


const getIconByFileExtension = (ext) => {
  switch (ext) {
    case 'pdf':
      return (
        <PdfIcon />
      );
    case 'doc':
      return (
        <DocIcon />
      );
    case 'docx':
      return (
        <DocIcon />
      );
    case 'jpg':
      return (
        <JpgIcon />
      );
    case 'jpeg':
      return (
        <JpgIcon />
      );
    case 'xls':
      return (
        <XlsIcon />
      );
    case 'xlsx':
      return (
        <XlsIcon />
      );
    default:
      return null;
  }
};

export default getIconByFileExtension;
