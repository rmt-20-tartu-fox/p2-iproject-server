const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const ImageKit = require('imagekit')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const fs = require('fs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/", upload.array("images", 10), async (req, res) => {
  try {
    if (req.files) {
      console.log(req.files.length);
      // res.status(200).json({ 
      //   name: req.files[0].originalname, 
      //   // result: req.files[0] 
      // })

      // fs.readFile("./1.png", function (err, data) {
      //   if (err) throw err;
      //   console.log(data)
      //   res.status(200).json({ result: data })
      // })

      let imagekit = new ImageKit({
        publicKey: "public_BACW09RMefisOpJUrHcxl/9Id9g=",
        privateKey: "private_m8l+5XTYExKEbUee/bgFrxEd59E=",
        urlEndpoint: "https://ik.imagekit.io/iqpgx3omg7kg",
      });

      const result = await imagekit.upload({
        file: req.files[0].buffer,
        fileName: req.files[0].originalname,
      });

      res.status(200).json({ result })
    } else {
      console.log("Kosong");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error })
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
