from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Load model once
model = load_model("eco_model_trained.h5")
class_names = ['cardboard', 'e-waste', 'glass', 'metal', 'organic', 'paper', 'plastic']
IMG_SIZE = 224

def preprocess_image(image_data):
    image = Image.open(io.BytesIO(image_data)).convert("RGB")
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image = np.array(image) / 255.0
    return np.expand_dims(image, axis=0)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    image_b64 = data['image']
    image_data = base64.b64decode(image_b64.split(',')[-1])
    img_array = preprocess_image(image_data)

    prediction = model.predict(img_array)[0]
    top_index = np.argmax(prediction)
    confidence = prediction[top_index]

    if confidence >= 0.6:
        return jsonify({
            'prediction_type': 'single',
            'class': class_names[top_index],
            'confidence': float(confidence)
        })
    else:
        top_3_indices = prediction.argsort()[-3:][::-1]
        top_3 = [
            {'class': class_names[i], 'confidence': float(prediction[i])}
            for i in top_3_indices
        ]
        return jsonify({
            'prediction_type': 'top3',
            'predictions': top_3
        })

if __name__ == '__main__':
    app.run(debug=True)
