let drawArr = []
let pagesCount = 0
let pagesCountLength
let newImg
let isFinishedScreenshot = true
let decreasing = 0
let w, h
let pGraphics

function preload() {
  myFont = loadFont('../fonts/B612Mono-Regular.ttf');
}

function setup() {

  w = window.innerWidth
  h = window.innerHeight
  let cnv = createCanvas(w, h, P2D);
  pixelDensity(1)
  cnv.parent('sketch-holder');
  cnv.style('display', 'block');
  console.log(w, h)
  strokeWeight(2)
  background(255, 0, 200);
  pagesCountLength = selectAll('.pages').length
  textWrap(WORD)
  textSize(16);
  textAlign(CENTER);
  textFont(myFont);
  text('hello! please erase me.', w / 2, h / 2);
}


function draw() {}

function mouseDragged(event) {

  strokeWeight(windowWidth / 5)

  if (w > h) {
    erase(15, 8)
    ellipse(mouseX, mouseY, ((w * h) / 4000), ((w * h) / 4000))
  } else {
    erase(10, 8)
    ellipse(mouseX, mouseY, ((w * h) / 1500), ((w * h) / 1500))
  }

  noErase();

  //need to adjust
  decreasing += 1

}

const changeDiv = () => {
  console.log(pagesCount)
  if (pagesCount === 0) {
    selectAll('.pages')[pagesCount].addClass('hide')
    selectAll('.pages')[pagesCount + 1].removeClass('hide')
    pagesCount += 1
  } else if (pagesCount > 0 && pagesCount < pagesCountLength - 1) {
    selectAll('.pages')[pagesCount].addClass('hide')
    selectAll('.pages')[pagesCount + 1].removeClass('hide')
    pagesCount += 1
  } else {
    pagesCount = 0
    selectAll('.pages')[pagesCount].removeClass('hide')
    selectAll('.pages')[pagesCountLength - 1].addClass('hide')
    pagesCount += 1
  }
}



const fetchScreenshot = async () => {
  try {
    const canvas = await html2canvas(document.body, {
      scale: 1
    })
    const canvasImg = await canvas.toDataURL()
    const newImg = loadImage(canvasImg, (res) => {
      changeDiv()
      image(res, 0, 0)
    })

  } catch (e) {
    console.log('error ' + e)
  }
}

function filtering(node) {
  return node.id != 'data-html2canvas-ignore';
}


const fetchDomToImage = async () => {
  try {
    options = {quality: 1, filter: filtering}
    const domImg = await domtoimage.toPng(document.body, options)
    const newImg = loadImage(domImg, res => {
      changeDiv()
      image(res, 0, 0)
    })
  } catch (e) {
    console.log(e)
  }
}




async function mouseReleased (event) {
  try {
    if (whichBrowser().toString() === 'Safari' || whichBrowser() === 'Unknown') {
      fetchScreenshot()
    } else {
      console.log('not safari')
      fetchDomToImage()

    }
  } catch (error) {
    console.log(error)
  }


}

function generate(item) {

  var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];

  function populate(a) {
    for (var i = 0; i < 6; i++) {
      var x = Math.round(Math.random() * 14);
      var y = hexValues[x];
      a += y;
    }
    return a;
  }

  var newColor1 = populate('#');
  var newColor2 = populate('#');
  var newColor3 = populate('#')
  var angle = Math.round(Math.random() * 360);

  var gradient = "linear-gradient(" + angle + "deg, " + newColor1 + ", " + newColor2 + "," + newColor3 + ")";

  item.style.background = gradient;
  return item

}

window.addEventListener("DOMContentLoaded", () => {
  const matches = document.querySelectorAll('.pages')
  matches.forEach(item => {
    generate(item);
  })
})


const checkDom = () => {
  console.log()
}
