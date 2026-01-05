var canvas = document.querySelector('canvas')
var cxt=canvas.getContext('2d')

cxt.beginPath()

cxt.moveTo(100,100)

cxt.lineTo(200,100)

cxt.lineTo(200,200)

cxt.strokeStyle='#000'

cxt.lineWidth=10

cxt.lineCap='round' //端点圆角

cxt.lineJoin='round' //两直线交界处圆角

cxt.stroke()  //描边绘制

cxt.fillStyle='green'

cxt.fill()  //填充 

cxt.closePath()

cxt.lineWidth=1    //y分界线
cxt.beginPath()
cxt.moveTo(400,0)
cxt.lineTo(400,600)
cxt.stroke()
 
cxt.lineWidth=1   //x分界线
cxt.beginPath()
cxt.moveTo(0,300)
cxt.lineTo(800,300)
cxt.stroke()


cxt.beginPath()  //矩形
// cxt.moveTo(500,0)
// cxt.lineTo(600,200)
// cxt.stroke()
cxt.fillRect(500,100,200,100)
cxt.clearRect(600,120,20,30)

cxt.rect(500,200,100,100)
cxt.stroke()
// cxt.fill()

const angle=n=>Math.PI/180*n
cxt.beginPath()
// cxt.arc(300,400)
// cxt.arcTo(300,400,400,400,100)

cxt.arc(300,400,100,0,angle(360))
// cxt.fill()

cxt.stroke()

cxt.beginPath()
cxt.moveTo(400,300)
cxt.lineTo(300,300)
cxt.arcTo(300,300,400,400,100)
cxt.moveTo(400,300)
cxt.lineTo(400,400)
cxt.strokeStyle='blue'
cxt.stroke()



cxt.beginPath()

cxt.moveTo(500,300)
cxt.arcTo(600,500,400,500,100)
cxt.stroke()
cxt.closePath()