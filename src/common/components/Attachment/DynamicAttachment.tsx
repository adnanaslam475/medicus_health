/* eslint-disable @next/next/no-img-element */
import { FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";
import Image from "next/image";
import pdf from "../../../../public/assets/images/word-file.svg";
import jpg from "../../../../public/assets/images/jpg.svg";
import png from "../../../../public/assets/images/png.png";
import zip from "../../../../public/assets/images/zip.jpeg";
import docx from "../../../../public/assets/images/docx.png";
import doc from "../../../../public/assets/images/doc.jpg";
import tiff from "../../../../public/assets/images/tiff.png";
import bmp from "../../../../public/assets/images/bmp.png";
import tga from "../../../../public/assets/images/tga.png";

const availableTypes = {
  "application/pdf": pdf.src,
  "application/msword": doc.src,
  "application/doc": doc.src,
  "application/docx": docx.src,
  "application/x-zip-compressed": zip.src,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    docx.src,
  "image/jpeg": jpg.src,
  "image/png": png.src,
  "image/tiff": tiff.src,
  "image/x-tga": tga.src,
  "image/targa": tga.src,
  "image/bmp": bmp.src,
  "application/zip": zip.src,
};

type Props = {
  type?: string;
};
function MediaFile({ type }: Props) {
  return (
    <Image
      priority={true}
      alt=""
      src={availableTypes[type as keyof typeof availableTypes] || pdf.src}
      width={24}
      height={24}
      className="border rounded border-gray-2 "
    />
  );
}

export default MediaFile;
