/* eslint-disable @next/next/no-img-element */
import { FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";
import Image from "next/image";
import pdf from "../../../../public/assets/images/word-file.svg";
import jpg from "../../../../public/assets/images/jpg.svg";
import png from "../../../../public/assets/images/png.png";
import zip from "../../../../public/assets/images/zip.jpeg";
import docx from "../../../../public/assets/images/docx.png";
import doc from "../../../../public/assets/images/doc.jpg";

let availableTypes = ["pdf", "jpg", "jpeg", "png", "zip", "doc", "docx"];
function MediaFile({ type }: any) {
  const fileIcons = {
    pdf: pdf,
    jpg: jpg,
    jpeg: jpg,
    png: png,
    zip: zip,
    doc: doc,
    docx: docx,
    other: pdf,
  };

  if (availableTypes?.includes(type))
    return (
      <Image
        priority={true}
        alt=""
        src={fileIcons[type as keyof typeof fileIcons]}
        width={24}
        height={24}
        className="border rounded border-gray-2 "
      />
    );
  return (
    <Image
      priority={true}
      alt=""
      src={pdf}
      width={24}
      height={24}
      className="border rounded border-gray-2 "
    />
  );
}

export default MediaFile;
