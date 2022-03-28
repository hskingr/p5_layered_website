var rect = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width * 5, view.size.height * 5],
  strokeColor: 'white',
  selected: false
});
rect.sendToBack();
rect.fillColor = 'white';


function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

var center = new Point(view.size.width / 2, view.size.height / 2)


var background = Shape.Rectangle({
  point: [0,0],
  size: [view.size.width,view.size.height],
  fillColor: 'white'
})

var rectA = Shape.Rectangle({
  point: [50, 50],
  size: [50.2357683753245234, 50.23576846535456],
  fillColor: 'blue',
})

console.log(rectA.size)

var rectB = rectA.clone()
rectB.strokeColor = 'red'
rectB.opacity = 0.5

rectB.scale(2, rectA.bounds.topLeft)



function onFrame(event) {

}

function onMouseDown(event) {
  
}




function zoom(event) {


   //this is scroll up
   if (event.deltaY == -3 || event.deltaY == -100) {
    rectA.scale(0.5,rectA.bounds.topLeft)
    //this is scroll down
  } else if (event.deltaY == 3 || event.deltaY == 100) {
    rectA.scale(2,rectA.bounds.topLeft)
  }


}

// var el = document.getElementById('canvas')
var el = document.querySelector('canvas');
el.onwheel = zoom;
// el.addEventListener('wheel', zoom);

