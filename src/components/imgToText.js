import React from "react";
import testImage from "../images/Image_Public_1.jpg";
import vision from "@google-cloud/vision";

export default function ImgToText() {
  const googleVison = async () => {
    // const vision = require('@google-cloud/vision');
    const options = {
      credentials: process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
      projectId: "translation-291402",
    };

    // Creates a client
    const client = new vision.ImageAnnotatorClient(options);

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    const fileName = testImage;

    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    console.log("Text:");
    detections.forEach((text) => console.log(text));
  };
  googleVison();

  return <div>NTH HERE</div>;
}
