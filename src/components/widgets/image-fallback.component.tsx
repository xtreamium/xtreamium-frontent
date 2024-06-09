import React, { SyntheticEvent } from "react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback: string;
}
const ImageWithFallback = ({ fallback, src, ...props }: ImageWithFallbackProps) => {
  return <img {...props} src={src} onError={(e: any) => (e.target.src = fallback)} />;
};

export default ImageWithFallback;
