import { NextFunction, Request, Response } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const imageUpload = (path: string) => {
  const fileUploadingRoutes: string[] = [
    // Add routes that need image upload here
  ];

  if (fileUploadingRoutes.includes(path)) {
    return upload.single("file");
  } else {
    return (req: Request, res: Response, next: NextFunction) => {
      next();
    };
  }
};