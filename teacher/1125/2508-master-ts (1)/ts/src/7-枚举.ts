{
  // 枚举
  // enum Color {
  //   red = 1,
  //   green = 2,
  //   yellow = 5
  // }

  enum Direction {
    Up = 87,
    Down = 83,
    Left = 65,
    Right = 68
  }

  const box = document.querySelector('.box') as HTMLDivElement
  document.addEventListener('keydown', e => {
    console.log(e.keyCode, e.key);
    
    if (e.keyCode === Direction.Up) {
      box.style.top = box.offsetTop - 10 + 'px'
    } else if (e.keyCode === Direction.Down) {
      box.style.top = box.offsetTop + 10 + 'px'
    } else if (e.keyCode === Direction.Left) {
      box.style.left = box.offsetLeft - 10 + 'px'
    } else if (e.keyCode === Direction.Right) {
      box.style.left = box.offsetLeft + 10 + 'px'
    }
  })


}