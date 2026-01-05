{
    // 枚举
    enum Color {
        red = 1,
        green = 3,
        yellow = 6
    }
    
    enum Direction {
        Up = 38,
        Down = 40,
        Left = 37,
        Right = 39
    }
    const box = document.querySelector('.box') as HTMLDivElement
    document.addEventListener('keydown', e => {
        console.log(e.keyCode, e.key)
        if (e.keyCode === Direction.Up) {
            box.style.top = box.offsetTop - 10 + 'px'
            // box.style.backgroundColor=`${Color.green}`
        } else if (e.keyCode === Direction.Down) {
            box.style.top = box.offsetTop + 10 + 'px'
        } else if (e.keyCode === Direction.Left) {
            box.style.left = box.offsetLeft - 10 + 'px'
        } else if (e.keyCode === Direction.Right) {
            box.style.left = box.offsetLeft + 10 + 'px'
        }
    })
}