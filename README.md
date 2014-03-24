#sklearn-flask-webapp
---
A project that identifies handwritten characters, kind of like a handwriting app on the iPhone.  It isn't the most impressive, but it shows you how easy it is to make something cool with the existing technology that is out there. Uses [Flask](http://flask.pocoo.org/) to run server side [scikitlearn](http://scikit-learn.org/stable/) a python machine learning library. 

##Stack Explained:

__\_\_init\_\_.py__ : Flask script which unpickles pretrained sklearn model, sets up decorator listeners at base url which renders index template, and a listener which returns the output of the fitted model.  It opens application on port 5000 in debug mode.

__index.html__ : Uses canvas component drawing_pad.js to create a canvas object that a user can draw on with a mouse. `resize_image.js` converts the image
data of the canvas element to pixels and reduce to a more manageable size.  The
result of the identification process is pulled using a jQuery getJSON call to
the Flask handled url with the reduced image vector as a parameter.

__drawing_pad.js__ : Uses HTML5 canvas element to create a simple drawing surface on mouse drag.

__resize_image.js__ : Uses the CanvasContext.getImageData to get raw pixel data.  Averages pixels to predetermined size (160 length vector). In near future will trim to minimum containing rectangle of image and resize to center image.

##TODO
More effective feature extraction: larger vector for sparser feature space.  Resize glyph to fill vector and remove empty space. Analyze symmetry across x and y axis, heavily weigthed

Bootstrap at the very end first I need handouts, explanation of how SVMs work, acutal working product.
