I want to make a project that identifies handwritten characters, kind of like a handwriting app on the iPhone.  It isn't the most impressive, but it shows you how easy it is to make something cool with the existing technology that is out there.

A model that interprests handwriting in a window.
I need something to draw in.  I could do it with a d3 svg object on mouse drag generate a vector.
I'm 100% someone has already done that.  Find a d3 component that lets people draw a vector.

How do I turn d3 svg object into a motherfucking parsable image?  How do I do that? What do I need to export it as?
toDataURL() gives png string as second element in .split(',')

/\
 |
 |
\/
Run python script __init.py__ to open port on localhost 
Use Flask to handle result of d3 svg to png
Flask calls a scikit learn function to return the result of a pre-pickled model on a vector of length determined by training process (depends on how export to png).
Keep the drawing there.  Only change a resuts field.
Ideally Flask doesn't regenerate entire web page, just passes back or makes visible in some way the result of the sklearn function
HEADER haha

Save the pictures to a file

What does scikitlearn to output a choice? Pylab can import png image with imread
Resize images to same dimensions after cutting to minimum rectangle

Is there an existed documented model for handwriting identification?
Does Tessaract do handwriting analysis? Is there a deep learning model for handwriting analysis.
Make it remake model based on your handwriting.  Save s

Bootstrap at the very end first I need handouts, explanation of how SVMs work, acutal working product.
Remaining questions: Can I have a persistent script object? Yes i can
Do I need to import sklearn to use unpickled sklearn model? 
No you do not
identify and save to png
svg component

Full stack explained:

__init__.py : Flask script which unpickles pretrained sklearn model, sets up decorator listeners at base url which renders index template, and a listener which returns the output of the fitted model.  It opens application on port 5000 in debug mode.

index.html : Uses d3 component drawing_pad.js to create a d3 svg object that a user can draw on using mouse clicks.  Uses resize_image.js to convert the image
data of the canvas element to pixels and reduce to a more manageable size.  The
result of the identification process is pulled using a jQuery getJSON call to
the flask handled url with the reduced image vector as a parameter.

drawing_pad.js : Uses HTML5 canvas element to create a simple drawing surface on mouse drag.

resize_image.js : Uses the CanvasContext.getImageData to get pixel data, then takes average of 1000 pixels to result in a 160 length vector. The vector size has to be consistent in length for the sklearn model to predict the output.