const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

/* ================================
   MONGODB CONNECTION
================================ */

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

/* ================================
   TRAVELER SCHEMA
================================ */

const travelerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    destination: {
      type: String,
      required: true
    },

    travelDate: {
      type: String,
      required: true
    },

    travelers: {
      type: Number,
      required: true
    },

    packagePrice: {
      type: Number,
      required: true
    },

    message: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

/* ================================
   MODEL
================================ */

const Traveler = mongoose.model("Traveler", travelerSchema);

/* ================================
   TEST API
================================ */

app.get("/", (req, res) => {
  res.json({
    message: "Travel With Vishhh API is running"
  });
});

/* ================================
   GET ALL TRAVELERS
================================ */

app.get("/api/travelers", async (req, res) => {
  try {
    const travelers = await Traveler.find().sort({
      createdAt: -1
    });

    res.json(travelers);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching travelers",
      error: error.message
    });
  }
});

/* ================================
   ADD TRAVELER
================================ */

app.post("/api/travelers", async (req, res) => {
  try {
    const traveler = new Traveler(req.body);

    const savedTraveler = await traveler.save();

    res.status(201).json(savedTraveler);
  } catch (error) {
    res.status(400).json({
      message: "Error creating traveler",
      error: error.message
    });
  }
});

/* ================================
   DELETE TRAVELER
================================ */

app.delete("/api/travelers/:id", async (req, res) => {
  try {
    const deletedTraveler = await Traveler.findByIdAndDelete(
      req.params.id
    );

    if (!deletedTraveler) {
      return res.status(404).json({
        message: "Traveler not found"
      });
    }

    res.json({
      message: "Traveler deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting traveler",
      error: error.message
    });
  }
});

/* ================================
   START SERVER
================================ */

app.listen(PORT, () => {
  console.log(`Travel API running on port ${PORT}`);
});
