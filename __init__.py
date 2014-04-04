from flask import Flask, render_template, jsonify
import pickle as pkl

app = Flask(__name__)
handwriting_model = pkl.load(open('data/handwriting_model_2.pkl','r'))
implicit_data_mapping = [
'a', 'b', 'c', 'd',
'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p',
'q', 'r', 's', 't',
'u', 'w', 'v', 'x',
'y', 'z', '0', '1',
'2', '3', '4', '5',
'6', '7', '8', '9'
]

@app.route('/')
def index():
    """
    Uses Flask's Jinja2 template renderer to generate the html
    """
    return render_template('index.html')

@app.route('/predict/<image_vector>')
def predict(image_vector):
    """
    Uses a pre-built sklearn SVM predictor to classify a handwritten glyph as
    an alphanumeric digit.
    Input: image_vector=feature vector of integer representing pixel intensity
    Output: JSON object where result=alphanumeric character predicted by model
    """
    image_vector = map(lambda el: int(el), image_vector.split(","))
    prediction_index = handwriting_model.predict(image_vector)[0]
    prediction = implicit_data_mapping[prediction_index];
    return jsonify(result=prediction)

if __name__ == '__main__':
    app.run(debug=True)
