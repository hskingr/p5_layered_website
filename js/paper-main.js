var rect = new Path.Rectangle({
  point: [0, 0],
  size: [view.size.width * 5, view.size.height * 5],
  strokeColor: 'white',
  selected: false
});
rect.sendToBack();
rect.fillColor = 'white';


// console.log(document.getElementById('htmlSVG'))

// var svg = project.importSVG(document.getElementById('htmlSVG'))
// svg.scale(1)
// svg.strokeColor = 'white'
// svg.strokeWeight = '1'
// var ogSvgWidth = svg.bounds.width



// var increasePercent = percentage(1050, ogSvgWidth)
// console.log(increasePercent + '%')
// svg.bounds.width = view.size.width
// svg.bounds.height = svg.bounds.height*(increasePercent/100)
// svg.fillColor = 'white'
// svg.shadowColor = 'black'
// svg.shadowOffset = new Point(5, 5)
// svg.shadowBlur = 12
// console.log(svg)
// svg.item.simplify()
// svg.item.smooth()


// document.getElementById('htmlSVG').style.display = 'none'
// ('#htmlSVG').hide()


function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

var center = new Point(view.size.width / 2, view.size.height / 2)


var background = Shape.Rectangle({
  point: [0,0],
  size: [view.size.width,view.size.height],
  fillColor: 'white'
})

var textArr = []
var textsGroup = new paper.Group({})




// console.log(reccy.scaling)
// reccy.scale(2)
// // resizeDimensions(reccy, reccy.bounds.width*2, reccy.bounds.height*2)
// console.log(reccy.scaling)
// reccy.scale(0.5)
// // resizeDimensions(reccy, 10, 10)
// console.log(reccy.scaling)
// // reccy.transform(new Matrix(0.1, 0.1, 0.1, 0.1, 0.1, 0.1))

// // textsGroup.addChild(reccy)

// function resizeDimensions(elem, scaleAmount){
//   //calc scale coefficients and store current position
//   var scaleX = elem.bounds.width;
//   var scaleY = elem.bounds.height;
//   //apply calc scaling
//   elem.size
// }


textsGroup.addChild(new PointText({
  point: [view.size.width / 2, view.size.height / 2],
  leading: 0,
  selected: false,
  fillColor: 'black',
  justification: 'center',
  content: 'HELLO',
  fontSize: 100
}))
var firstChild = textsGroup.children[0]
var firstChildBottomLeftPoint = firstChild.bounds.bottomLeft

var ZOOM_FACTOR = 5
var rotateCount = 0
var frameCount = 0
var ifRotate, ifZoomIn, ifZoomOut = false
var oldZoom
var oldCenter
var newZoom
var scaleCount = 1
var textArrCount = 0
var scrollCount = 0
var distanceToNewCenter
var newCenter
var rotation = 0
var zoomCount = 0
var isFinishedAnimation = true

var testInitialSizeIncrease = 10
var testInintialSizeDecrease = 22


// for (var i = 0; i < 10; i++) {
//   testInitialSizeIncrease = Math.round(testInitialSizeIncrease*1.01)
//   testInintialSizeDecrease = Math.round(testInintialSizeDecrease*0.99)
// }
// console.log(testInintialSizeDecrease)
// console.log(testInitialSizeIncrease)






function onFrame(event) {
  var children = textsGroup.children
  var scaleFactor = 0

  if (ifZoomIn === true && rotateCount < 90) {
    console.log('Zooming In')
    for (var i = 0; i < children.length; i++) {
      scaleFactor = 1.06

      if (i === 0) {
        
      } else {
        // firstChildBottomLeftPoint = children[i-1].bounds.bottomLeft
      }

      background.fillColor.hue += 0.1
      children[i].scale(scaleFactor, firstChildBottomLeftPoint)
      children[i].rotate(1, firstChildBottomLeftPoint)
    }

    rotateCount += 1


  } else if (ifZoomOut === true && rotateCount < 90) {
    console.log('zooming Out')
    scaleFactor = 0.99
    for (var i = children.length - 1; i >= 0; i--) {
      children[i].scale(scaleFactor, firstChildBottomLeftPoint)
      children[i].rotate(-1, firstChildBottomLeftPoint)
    }
    rotateCount += 1



  } else if (rotateCount === 90) {
    // console.log(children[0].bounds.width)
    rotateCount = 0
    ifZoomIn = false
    ifZoomOut = false
    isFinishedAnimation = true
    // textsGroup.remove(0, 0)
    console.log(textsGroup)

  }
}


function onMouseDown(event) {
  textsGroup.children[textsGroup.children.length-1].rotate(90)
}




function zoom(event) {

  if (isFinishedAnimation) {
    isFinishedAnimation = false
    //event.deltaY is the scroll direction. this function just detects whether the scroll is up or down

    //this is scroll up
    if (event.deltaY == -3 || event.deltaY == -100) {
      //adds a count to the zoom to check whether to add children later or not.
      zoomCount += 1
      //add a new child if the zoomcount is higher than the amount of children and the user has zoomed in.
      if (textsGroup.children.length === zoomCount) {
        console.log('adding a new child')
        ifZoomIn = true
        textsGroup.addChild(new PointText({
          point: textsGroup.children[textsGroup.children.length - 1].bounds.bottomLeft,
          leading: 0,
          selected: false,
          fillColor: 'red',
          justification: 'left',
          content: 'HELLO ' + textsGroup.children.length,
          fontSize: 100
        }))

        var previousChild = textsGroup.children[textsGroup.children.length - 2]
        var currentChild = textsGroup.children[textsGroup.children.length - 1]

        currentChild.rotate(270, firstChildBottomLeftPoint)
        currentChild.scale(0.01, firstChildBottomLeftPoint)

        //user has zoomed in but the children count is higher than the amount of zooms the user has done.
      } else {
        ifZoomIn = true
      }


      //this is scroll down
    } else if (event.deltaY == 3 || event.deltaY == 100) {
      zoomCount -= 1
      ifZoomOut = true
    }
  }
}

// var el = document.getElementById('canvas')
var el = document.querySelector('canvas');
el.onwheel = zoom;
// el.addEventListener('wheel', zoom);

