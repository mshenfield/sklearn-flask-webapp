#sklearn-flask-webapp
---
A project that identifies handwritten characters, kind of like a handwriting app on the iPhone.  It isn't the most impressive, but it shows you how easy it is to make something cool with the existing technology out there. Uses [Flask](http://flask.pocoo.org/) to communicate with a model server side created with [scikitlearn](http://scikit-learn.org/stable/), a Python machine learning library.

##Stack Explained:

__\_\_init\_\_.py__ : Flask script that unpickles a pretrained sklearn model, sets up decorator listeners at base url to render index template, and at /predict, which returns the output of the fitted model.  It opens application on port 5000 in debug mode.

__index.html__ : Uses Canvas component drawing_pad.js to create a Canvas object which a user can draw on with a mouse. `resize_image.js` converts the image
data of the canvas element to pixels and reduces the result to a more manageable flat feature vector.  The
result of the identification process is pulled using a jQuery getJSON call to
the /predict url, including the image feature vector as a parameter.

__drawing_pad.js__ : Uses HTML5 Canvas element to create a simple drawing surface on mouseclick and mousedrag.

__resize_image.js__ : Uses the CanvasContext.getImageData() API to get raw pixel data from the Canvas element.  Averages pixels to create a vector of length 160.