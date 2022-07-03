import React, { ReactElement } from "react";
import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {
	fallbackImage?: any;
}

function isNextImageSrcValid(src: string = ""): boolean {
	return src.startsWith("https://medicus-dev2.s3-us-east-2.amazonaws.com/");
}

function MDNextImage(props: Props): ReactElement {
	const { src, alt, fallbackImage, ...restOfProps } = props;
	const isValidSrc = isNextImageSrcValid(src as string);
	return (
		<Image
			priority={true}
			unoptimized
			alt={alt}
			src={isValidSrc ? src : fallbackImage}
			{...restOfProps}
		/>
	);
}

export default MDNextImage;

MDNextImage.defaultProps = {
	fallbackImage: "/assets/images/palceholder.png",
	alt: "",
};
