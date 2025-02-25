from flask import Flask, request, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load the trained model
model = joblib.load("predictor.pkl")

# Initialize Flask app
app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()
        # Extract features
        features = np.array([
            data["Gender"], data["Age"], data["Systolic_BP"], data["Diastolic_BP"],
            data["Cholesterol"], data["Height_cm"], data["Weight_kg"], data["BMI"],
            data["Smoker"], data["Diabetes"]
        ]).reshape(1, -1)
        print(features)

        scaler = StandardScaler()
        new_input_scaled = scaler.fit_transform(features) 
        
        # Make prediction
        prediction = model.predict(new_input_scaled).tolist()

        return jsonify({"health": prediction[0]})  # Assuming single output
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
