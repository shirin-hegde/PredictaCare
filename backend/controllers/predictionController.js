import Prediction from "../models/predictionModel.js";
import User from "../models/userModel.js";

// Save user data & prediction result with full user details and inputs
export const savePrediction = async (req, res) => {
  const { disease, userId, userInputs, predictionResult, probability } = req.body;

  // Ensure all required data is present and valid
  if (!disease || !userInputs || !predictionResult || typeof probability !== "number") {
    return res.status(400).json({ message: "Incomplete or invalid data provided" });
  }

  try {
    // Fetch user details from the database if userId is provided and not "guest"
    let userData = {
      name: "Guest User",
      dob: "N/A",
      image: "defaultUserImagePath",
      email: "guest@example.com",
      inputs: userInputs, // Store the prediction form inputs
    };

    if (userId && userId !== "guest") {
      const user = await User.findById(userId);
      if (user) {
        // Ensure user data is complete
        userData = {
          name: user.name || "Unknown User",
          dob: user.dob || "N/A",
          image: user.image || "defaultUserImagePath",
          email: user.email || "No Email Provided",
          inputs: userInputs, // Store the prediction form inputs
        };
      }
    }

    // Create a new prediction entry with enhanced user data
    const newPrediction = new Prediction({
      disease,
      userData,
      predictionResult,
      probability,
    });

    const savedPrediction = await newPrediction.save();
    res.status(201).json({
      message: "Prediction saved successfully",
      predictionId: savedPrediction._id,
      disease: savedPrediction.disease,
      result: savedPrediction.predictionResult,
      probability: savedPrediction.probability,
    });
  } catch (error) {
    console.error("Error saving prediction:", error.message);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};
