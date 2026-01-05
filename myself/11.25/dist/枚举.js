"use strict";
{
    // 枚举
    let Color;
    (function (Color) {
        Color[Color["red"] = 1] = "red";
        Color[Color["green"] = 3] = "green";
        Color[Color["yellow"] = 6] = "yellow";
    })(Color || (Color = {}));
    let Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 38] = "Up";
        Direction[Direction["Down"] = 40] = "Down";
        Direction[Direction["Left"] = 37] = "Left";
        Direction[Direction["Right"] = 39] = "Right";
    })(Direction || (Direction = {}));
    const box = document.querySelector('.box');
    document.addEventListener('keydown', e => {
        console.log(e.keyCode, e.key);
        if (e.keyCode === Direction.Up) {
            box.style.top = box.offsetTop - 10 + 'px';
            // box.style.backgroundColor=`${Color.green}`
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
