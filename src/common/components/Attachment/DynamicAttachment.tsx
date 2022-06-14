/* eslint-disable @next/next/no-img-element */
import { FilePdfOutlined, FileWordOutlined } from "@ant-design/icons";
import Image from "next/image";
import pdf from "../../../../public/assets/images/word-file.svg";
import jpg from "../../../../public/assets/images/jpg.svg";
import png from "../../../../public/assets/images/png.png";

let availableTypes = ["pdf", "jpg", "jpeg","png"];
function MediaFile({ type }: any) {
  const fileIcons = {
    pdf: pdf,
    jpg: jpg,
    jpeg: jpg,
    png: png,
    doc: pdf,
    docx: pdf,
    other: pdf,
  };

  if (availableTypes?.includes(type))
    return (
      <Image
        alt=""
        src={fileIcons[type as keyof typeof fileIcons]}
        width={24}
        height={24}
        className="border rounded border-gray-2 "
      />
    );
  return (
    <Image
      alt=""
      src={pdf}
      width={24}
      height={24}
      className="border rounded border-gray-2 "
    />
  );
}

export default MediaFile;
