from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

# Create Flask app
app = Flask(__name__)
CORS(app)

# Load trained models
diabetes_model = joblib.load("diabetes_model.pkl")
heart_model = joblib.load("heart_model.pkl")


# ---------------- DIABETES PREDICTION ---------------- #

@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    features = np.array([[
        1,
        float(data["age"]),
        float(data["hypertension"]),
        0,
        0,
        float(data["bmi"]),
        5.2,
        float(data["blood_glucose_level"])
    ]])

    prediction = diabetes_model.predict(features)[0]

    return jsonify({
        "prediction": int(prediction)
    })


# ---------------- HEART ATTACK PREDICTION ---------------- #

@app.route("/predict_heart", methods=["POST"])
def predict_heart():

    data = request.json

    features = np.array([[
        float(data["age"]),
        float(data["sex"]),
        float(data["cholesterol"]),
        float(data["heart_rate"]),
        float(data["diabetes"]),
        float(data["family_history"]),
        float(data["smoking"]),
        float(data["obesity"]),
        float(data["alcohol"]),
        float(data["exercise"]),
        float(data["diet"]),
        float(data["stress"]),
        float(data["bmi"]),
        float(data["triglycerides"]),
        float(data["physical_activity"]),
        float(data["sleep"]),
        float(data["systolic"]),
        float(data["diastolic"]),
        50000,   # income
        1,       # education
        1,       # occupation
        0        # previous heart problems
    ]])

    prediction = heart_model.predict(features)[0]

    return jsonify({
        "prediction": int(prediction)
    })


if __name__ == "__main__":
    app.run(debug=True)