// // 生成数据的函数
// const createData = (total) => {
//     // 根据total数 循环生成数据
//     const data = []//存储数据的数组
//     for (let i = 0; i < total; i++) {
//         data.push({
//             name:nameStr.substr(randomSrc(0,149),randomSrc(15,30)),
//             price:randomPrice(),
//             des:createDes(randomSrc(0,3)),
//             src: `./img/${randomSrc(1, 17)}.webp`,
//         })
//     }
//     return data
// }
// // name的字符串
// let nameStr = "老醋蚕豆百年吴府记四川麻辣独立小包装即食糖醋追剧零食真空特产韩系叠穿棕色羽绒棉服马甲女2025秋冬独特超好看加厚短款连帽外套女童羽绒服秋冬25新款女孩韩版纯色百搭保暖连帽外套儿童休闲上衣北海印象鲜烤开背虾干凤尾虾干健身即食烤虾干高蛋白海鲜零食碱水面包丁茶颜同款海盐焦糖干脆饼干解馋小吃官方旗舰店休闲零食赵老师老醋蚕豆四川零食香酥无壳散装独立装小包装休闲蚕豆零食"
// // des的描述数组
// let desArr = ["包邮","退货宝","7天无理由","送运费险","满78减5","国家补贴","大鹅优惠券","全网低价","超级立减","天天特价"]

// // 随机数 
// const randomSrc = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

// // 随机价格              toFixed()保留小数点后几位
// const randomPrice = () => (Math.random() * randomSrc(10, 1000)).toFixed(2)

// // 按照指定的个数 生成描述
// const createDes = (nDes) => {
//     const des = []//存储描述
//     // 按照描述的个数，循环，去重   
//     while (des.length < nDes) {
//         // 循环生成下标
//         let index = randomSrc(0, desArr.length - 1)
//         if (des.indexOf(desArr[index] === -1)) des.push(desArr[index])
//     }
//     return des
// }

const randomSrc = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const randomPrice = () => (Math.random() * randomSrc(10, 1000)).toFixed(2)

let nameStr = '百事可乐900ml*2瓶 6瓶大瓶包邮原味碳酸饮料可乐型汽水饮料yb萌涩幻想男生款星穹铁道等身抱枕二次元动漫枕套卡芙卡人形抱枕萌动彼岸原创崩坏3爱莉希雅动漫周边等身抱枕二次元枕套可定制【星铁花嫁】崩坏星穹铁道同人昔涟花嫁同人周边【喵咕君】崩坏星穹铁道昔涟风堇遐蝶知更鸟流萤情书吧唧同人正品'
// console.log(nameStr.length)
let desArr = ['包邮', '七天无理由', '送运费险', '天天特价', '国家补贴', '全网低价', '超级立减', '全网特价']

// 找des的数据
const desFn = (desN) => {
    const des = []//存储des的数据
    while (des.length < desN) {
        let index = randomSrc(0, desArr.length - 1)
        if (des.indexOf(desArr[index] === -1)) des.push(desArr[index])
    }
    return des
}


// 生成数据的函数
const createData = (total) => {
    const data = []  //存储数据
    for (let i = 0; i < total; i++) {
        data.push({
            name: nameStr.substr(randomSrc(0, 113), randomSrc(15, 30)),
            price: randomPrice(),
            des: desFn(randomSrc(0, 3)),
            src: `./img/${randomSrc(1, 16)}.webp`
        })
    }
    return data
}

