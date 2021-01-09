/* eslint-disable import/no-default-export */
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.gif';
declare module '*.mp4';
declare module '*.webm';
declare module '*.webp';

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg' {
  import React = require('react');
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
