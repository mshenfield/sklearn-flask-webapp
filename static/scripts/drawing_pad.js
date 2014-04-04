/*
BSD License, Max Shenfield 2014
Adapted from tutorial by Rishabh
at http://codetheory.in/creating-a-paint-application-with-html5-canvas/
*/
(function drawing_pad() {
  console.log('drawing_pad.js running');
  var canvas = document.querySelector('#paint');
  var ctx = canvas.getContext('2d');

  var sketch = document.querySelector('#sketch');
  var sketch_style = getComputedStyle(sketch);
  canvas.width = parseInt(sketch_style.getPropertyValue('width'));
  canvas.height = parseInt(sketch_style.getPropertyValue('height'));

  var mouse = {x: 0, y: 0};

  /* Mouse Capturing Work */
  canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - 100;
  }, false);

  /* Drawing on Paint App */
  ctx.lineWidth = 15;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';

  canvas.addEventListener('mousedown', function(e) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);

      canvas.addEventListener('mousemove', onPaint, false);
  }, false);

  canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', onPaint, false);
  }, false);

  var onPaint = function() {
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
  };
}());
