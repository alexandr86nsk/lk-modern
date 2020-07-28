import React from 'react';
import PdfIcon from '../../static/images/pdf.svg';
import DocIcon from '../../static/images/doc.svg';
import JpgIcon from '../../static/images/jpg.svg';
import XlsIcon from '../../static/images/xls.svg';
import FileIcon from '../../static/images/file.svg';


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
