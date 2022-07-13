/* eslint-disable @next/next/no-img-element */
import { FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";
import Image from "next/image";
import pdf from "../../../../public/assets/images/word-file.svg";
import jpg from "../../../../public/assets/images/jpg.svg";
import png from "../../../../public/assets/images/png.png";
import zip from "../../../../public/assets/images/zip.jpeg";
import docx from "../../../../public/assets/images/docx.png";
import doc from "../../../../public/assets/images/doc.jpg";

const availableTypes = {
  pdf: pdf.src,
  msword: doc.src,
  doc: doc.src,
  docx: docx.src,
  vnd: docx.src,
  "vnd.openxmlformats-officedocument.wordprocessingml.document": docx.src,
  jpeg: jpg.src,
  png: png.src,
  zip: zip.src,
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
