function resize_image(imageData) {
  var reductionFactor = 1000;
  if (imageData.length < reductionFactor) return imageData;
  var newLength = imageData.length / reductionFactor;
  var reducedImageData = new Array(newLength);
  var subpixels;
  for (var i = 0; i < newLength; i++) {
    subpixels = imageData.subarray(i * reductionFactor, (i + 1) * reductionFactor);
    average = average_pixel(subpixels);
    reducedImageData[i] = average;
  }
  // var output = document.getElementById('output');
  // output.value = output.value + "[" + reducedImageData + "], ";
  return reducedImageData;
}

function average_pixel(subpixels, type) {
  //Computes the average value of a flat list of pixels
  type = typeof type !== 'undefined' ? type : 'rgba';
  var skipFourth = true; // Fourth field holds shading value not actual color
  var length = subpixels.length * 3 / 4;
  if (type == 'rgb') {
    skipFourth = false;
    length = subpixels.length;
  }
  var totalPixelValue = 0;

  if (!skipFourth) {
    for (var i = 0; i < subpixels.length; i++) {
      totalPixelValue += subpixels[i];
    }
  } else {
    for (var i = 0; i < subpixels.length; i++) {
      totalPixelValue = totalPixelValue + subpixels[i];
    }
  }
  var averagePixel = 0;
  return averagePixel = Math.round(totalPixelValue / length);
}

function canvasToReducedVector() {
  canvas = document.getElementById('paint');
  data = 
  canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
  image_vector = resize_image(data);

  $.getJSON("/predict/" + image_vector, function(data) {
    console.log(data);
    $('#result').text($("#result").text() + data.result);
    $('#result').append("span")
});
}

function refresh() {
    canvas = document.getElementById('paint');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}