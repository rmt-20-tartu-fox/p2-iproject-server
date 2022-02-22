const uploadFile = require("../middleware/multerConfig");

class FileController {
  static async upload(request, response) {
    try {
      await uploadFile(request, response);

      if (request.file == undefined) {
        return response.status(400).send({ message: "Please upload a file!" });
      }
      // Imports the Google Cloud client library
      const vision = require("@google-cloud/vision");

      // Creates a client
      const client = new vision.ImageAnnotatorClient({
        keyFilename: "VisionAIAPIKey.json",
      });

      // Performs label detection on the image file
      const [result] = await client.labelDetection(
        "./images/uploadForGoogle.jpeg"
      );
      const labels = result.labelAnnotations;

      
      console.log("Labels:");
      labels.forEach((label) => console.log(label.description));
      const labelsData = labels.map((label) => label.description);
      console.log("SEBELOM RESPONSE UPLOAD");
      response.status(200).json({data: labelsData})
    } catch (err) {
      if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
          message: "File size cannot be larger than 2MB!",
        });
      }
      response.status(500).send({
        message: `Could not upload the file: ${request.file.originalname}. ${err}`,
      });
    }
  }
}

module.exports = FileController;
