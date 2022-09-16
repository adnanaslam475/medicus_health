import { useEffect, useState } from "react";
import pdf from "../../../public/assets/images/word-file.svg";
import jpg from "../../../public/assets/images/jpg.svg";
import png from "../../../public/assets/images/png.png";
import zip from "../../../public/assets/images/zip.png";
import docx from "../../../public/assets/images/docx.png";
import doc from "../../../public/assets/images/doc.jpg";
import tiff from "../../../public/assets/images/tiff.png";
import bmp from "../../../public/assets/images/bmp.png";
import tga from "../../../public/assets/images/tga.png";
import csv from "../../../public/assets/images/csv.png";

export function parseJson(jsonString: string) {
  let obj = null;
  try {
    obj = JSON.parse(jsonString);
  } catch (error) {
    obj = null;
  }
  return obj;
}

export function hasValidMessage(text: string) {
  var format = /[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(text)) {
    return true;
  } else {
    return false;
  }
}

export function useDebounce(value: string, wait = 200) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, wait);
    return () => clearTimeout(timer);
  }, [value, wait]);
  return debounceValue;
}

export const getFileImageIcon = (fileName: any) => {
  const fileExtension = /(?:\.([^.]+))?$/;
  const fileExt = fileExtension?.exec(fileName)?.[0];
  switch (fileExt) {
    case ".png":
      return png;
    case ".doc":
      return doc;
    case ".csv":
      return csv;
    case ".docx":
      return docx;
    case ".pdf":
      return pdf;
    case ".zip":
      return zip;
    case ".tiff":
      return tiff;
    case ".tga":
      return tga;
    case ".jpg":
      return jpg;
    case ".jpeg":
      return jpg;
    case ".bmp":
      return bmp;
  }
};

export function valueSeparator(value: string|number) {
  let separatorValue = parseFloat(String(value)).toLocaleString("en");
  return separatorValue;
}
