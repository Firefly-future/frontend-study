"use strict";
{
    // 枚举
    // enum Color {
    //   red = 1,
    //   green = 2,
    //   yellow = 5
    // }
    let Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 87] = "Up";
        Direction[Direction["Down"] = 83] = "Down";
        Direction[Direction["Left"] = 65] = "Left";
        Direction[Direction["Right"] = 68] = "Right";
    })(Direction || (Direction = {}));
    const box = document.querySelector('.box');
    document.addEventListener('keydown', e => {
        console.log(e.keyCode, e.key);
        if (e.keyCode === Direction.Up) {
            box.style.top = box.offsetTop - 10 + 'px';
        }
        else if (e.keyCode === Direction.Down) {
            box.style.top = box.offsetTop + 10 + 'px';
        }
        else if (e.keyCode === Direction.Left) {
            box.style.left = box.offsetLeft - 10 + 'px';
        }
        else if (e.keyCode === Direction.Right) {
            box.style.left = box.offsetLeft + 10 + 'px';
        }
    });
}
