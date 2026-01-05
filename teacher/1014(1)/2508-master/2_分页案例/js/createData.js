
const random = (min, max) =>  Math.floor(Math.random() * (max - min + 1)) + min


const createData = (len) => {
  const firstName = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '楚', '卫', '欧阳', '诸葛']
  const lastName = ['德刚', '德柱', '芙蓉', '湘玉', '展堂', '秀莲', '云鹏', '谦', '越', '麒麟', '云金']
  const arr = []
  for (let i = 0; i < len; i ++) {
    arr.push({
      id: Date.now() + i,
      num: i + 1,
      username: firstName[Math.floor(Math.random() * firstName.length)] + lastName[Math.floor(Math.random() * lastName.length)],
      age: random(18, 40),
      gender: random(0, 1),
      score: random(0, 100)
    })
  }
  return arr
}

const data = createData(200)