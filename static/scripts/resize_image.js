var debug = false;
function resize_image(imageData) {
  var reductionFactor = 1000;
  if (imageData.length < reductionFactor) return imageData;
  var newLength = imageData.length / reductionFactor;
  var reducedImageData = new Array(newLength);
  var subpixels;

  for (var i = 0; i < newLength; i++) {
    subpixels = imageData.subarray(i * reductionFactor, (i + 1) * reductionFactor);
    var average = average_pixel(subpixels);
    reducedImageData[i] = average;
  }
  return reducedImageData;
}

function shrink_image_to_drawn(imageData) {
  
  var firstindex = 0;
  for (var i = 0; i < image.length; i++) {
    if (imageData[i] != 0) {
      firstindex = i;
    }
  }
  var lastindex = 0;
  for (var i = image.length; i >= 0; i--) {
    if (imageData[i] != 0) {
      lastindex = i;
    }
  }
  return imageData.subarray(firstindex, lastindex + 1);
}

function resize_image_to(imageData, vectorlength) {
  
  var length = imageData.length;
  var reduceByFactor = Math.ceil(length / vectorlength);
  var reducedImageData = new Array(vectorlength)
  var subpixels;
  for (var i = 0; i < vectorlength; i++) {
    subpixels = imageData.subarray(i * reduceByFactor, (i + 1) * reduceByFactor);
    average = average_pixel(subpixels);
    reducedImageData[i] = average;
  }
  return reducedImageData;
}

function average_pixel(subpixels, type) {
  type = typeof type !== 'undefined' ? type : 'rgba';
  var skipFourth = true; // Fourth field holds shading value not actual color
  var length = subpixels.length * 4;
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
  var averagePixel = +(totalPixelValue / (255 * length)).toFixed(2)*100;
  return averagePixel;
}

var index = 0;
var mapping = [
'a', 'b', 'c', 'd',
'e', 'f', 'g', 'h',
'i', 'j', 'k', 'l',
'm', 'n', 'o', 'p',
'q', 'r', 's', 't',
'u', 'v', 'w', 'x',
'y', 'z', '0', '1',
'2', '3', '4', '5',
'6', '7', '8', '9'
]

function canvasToReducedVector() {
  var canvas = document.getElementById('paint');
  var data =
  canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
  var image_vector = resize_image(data);
  console.log(image_vector);

  $.getJSON('/predict/' + image_vector, function(data) {
    
    console.log(data);
    var result = data.result;    
    var target = $('#target').val();
    var status_id;
    if (target == '') {
      status_id = '';
    } else if (target == result) {
      status_id = 'correct';
    } else {
      status_id = 'incorrect';
    }

    if (debug) { 
      $("#result").append(mapping[index]);
      index++;
      $("#target").val($("#target").val() + "[" + image_vector + "], ");
    } else {
      $('#result').append('<span id=\'' + status_id + '\'>' + result + '</span>');
    }
  });
}

function refresh() {
    var canvas = document.getElementById('paint');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}