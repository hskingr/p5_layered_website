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


var ogBackground = Path.Rectangle({
  point: [0,0],
  size: [view.size.width,view.size.height],
  fillColor: 'black'
})



var backgroundClip 


// var url = 'http://assets.paperjs.org/images/marilyn.jpg';
// var raster = new Raster(url);
// raster.position = new Point(300,300);


var firstCount = true
var colorCount = 0
var circleGroup


var pagesCountLength = document.querySelectorAll('.pages').length
var pagesCount = 0

function onFrame(event) {

}

function onMouseDown(event) {
  circleGroup = new Group({
    name: 'circleGroup',
  })
  backgroundClip = Path.Rectangle({
    point: [0,0],
    size: [view.size.width,view.size.height],
    fillColor: 'green',
  })
  backgroundClip.fillColor.hue += colorCount
  colorCount += 30
  
  console.log(pagesCount)
  if (pagesCount === 0) {
    document.querySelectorAll('.pages')[pagesCountLength-1].style.zIndex = 2 
    document.querySelectorAll('.pages')[pagesCount].style.zIndex = 4
    pagesCount += 1
  } else if (pagesCount > 0 && pagesCount < 3) {
    document.querySelectorAll('.pages')[pagesCount-1].style.zIndex = 2 
    document.querySelectorAll('.pages')[pagesCount].style.zIndex = 4
    pagesCount += 1
  } else {
    pagesCount = 0
    document.querySelectorAll('.pages')[pagesCountLength-1].style.zIndex = 2 
    document.querySelectorAll('.pages')[pagesCount].style.zIndex = 4
    pagesCount += 1
  }
  
}

function onMouseUp(event) {
  // var img = html2canvas(document.body).then(function(canvas) {
  //   document.body.appendChild(canvas)

  // })
  // project.clear()
}

function onMouseDrag(event) {


if(circleGroup.children.length === 0) {
  circleGroup.addChild(new Path.Circle({
    center: event.middlePoint,
		radius: 100,
  }))
} else {
  var circle = new Path.Circle({
    center: event.middlePoint,
    radius: 100,
    selected: false,

  })
}


var newItem = circleGroup.firstChild.unite(circle)
newItem.set({
  selected: false,
  strokeColor: 'black',
  strokeWidth: 5,
})

//remove indeivudal circles
circleGroup.removeChildren()
//add compound path to group
circleGroup.addChild(backgroundClip)
circleGroup.addChild(newItem)
circleGroup.clipped = true


}



function zoom(event) {


   //this is scroll up
   if (event.deltaY == -3 || event.deltaY == -100) {

    //this is scroll down
  } else if (event.deltaY == 3 || event.deltaY == 100) {

  }


}

// var el = document.getElementById('canvas')
var el = document.querySelector('canvas');
el.onwheel = zoom;
// el.addEventListener('wheel', zoom);

var fullColorHex = function(r,g,b) {   
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red+green+blue;
};