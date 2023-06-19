const express = require("express");
const QRCode = require("qrcode");

const Car = require("../models/Car");
const fs = require("fs");

const router = express.Router();

// Generate QR code for a car number and save it in the database
router.post("/generateQR", async (req, res) => {
  const { carNumber, link,name } = req.body;
  const firstNameDigits = name.slice(0, 4);
  const carNoDigits = carNumber.slice(-4);

  const userName = firstNameDigits + carNoDigits;
  
  try {
    const qrCodeImage = await QRCode.toDataURL(link);
    const car = new Car({
      name,
      userName,
      password :userName,
      carNumber,
      link,
      qrCodeImage,
    });

    await car.save();

    QRCode.toFile(
      `${carNumber}.png`,
      link,
      {
        type: "png",
      },
      function (err) {
        if (err) console.error(err);
        console.log("QR code generated!");
      }
    );
    const downloadPath = "/home/ad.rapidops.com/yash.gohel/Downloads/";
    const newFilePath = downloadPath + carNumber + ".png";

    fs.rename(`${carNumber}.png`, newFilePath, function (err) {
      if (err) {
        console.error(err);
        res.json({ success: false, error: "Failed to download QR code" });
      } else {
        console.log("QR code downloaded!");
        res.json({ success: true, qrCodeImage });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to generate QR code" });
  }
});

// Retrieve car details using the scanned QR code
router.get("/getCarDetails", async (req, res) => {
  try {
    const data = await Car.find();
    if (!data) {
      return res.status(404).json({ success: false, error: "Car not found" });
    }
    res.json({ success: true, data:data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve car details" });
  }
});

// Retrieve car details using the scanned QR code
router.get("/getCarDetails/:userName", async (req, res) => {
  try {
    const userName = req.params.userName;
    const users = await Car.findById({ userName });
    console.log({users});
    if (!users) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ success: true, data:data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to retrieve car details" });
  }
});

module.exports = router;
