import { notification } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import ReactS3Client from "react-aws-s3-typescript";
import config from "../../../config";

export const useMediaUploader = () => {
  const configS3 = {
    region: config?.region || "",
    bucketName: config?.bucketName || "",
    accessKeyId: config?.accessKeyId || "",
    secretAccessKey: config?.secertAccessKey || "",
    useAccelerateEndpoint: true,
  };

  const s3 = new ReactS3Client(configS3);

  const upload = async (file: File) => {
    try {
      return await s3.uploadFile(file);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadMultiple = async (file: File[]) => {
    try {
      return await Promise.all(
        file.map((file: File) => s3.uploadFile(file as File, file.name))
      );
    } catch (error: any) {
      if (error && error?.status === 503) {
        return notification.error({
          message: "Please reduce your request rate.",
        });
      } else
        notification.error({
          message:
            "Something went wrong while uploading your file, please try again a few minutes later",
        });
      console.log(error);
    }
  };

  return { upload, uploadMultiple };
};
