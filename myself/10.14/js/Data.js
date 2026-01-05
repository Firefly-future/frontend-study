


const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const firstName = ['张', '王', '钱', '李', '刘', '杨', '孙', '关', '周', '苏', '柳', '白', '黄', '马']
const lastName = ['云长', '翼德', '玄德', '孟德', '梦琪', '孟奇', '孟起', '文渊', '文远', '奉先', '伯符', '汉升']


const createData = (length) => {
    const arr = []
    for (let i = 0; i < length; i++) {
        arr.push({
            id: i,
            num: i + 1,
            name: firstName[Math.floor(Math.random() * (firstName.length))] + lastName[Math.floor(Math.random() * (lastName.length))],
            age: random(16, 24),
            gender: random(0, 1),
            score: random(0, 100),

        }
        )
    }
    return arr
}
const data = createData(200)
console.log(data)