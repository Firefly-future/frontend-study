

// [
//     {
//         name : "",
//         price : ,
//         des : ["a","b","c"]
//     },
//     {
//         name : "",
//         price : ,
//         des : [],
//     }
// ]
// 生成商品名称的字符串
let nameStr = "老醋蚕豆百年吴府记四川麻辣独立小包装即食糖醋追剧零食真空特产韩系叠穿棕色羽绒棉服马甲女2025秋冬独特超好看加厚短款连帽外套女童羽绒服秋冬25新款女孩韩版纯色百搭保暖连帽外套儿童休闲上衣北海印象鲜烤开背虾干凤尾虾干健身即食烤虾干高蛋白海鲜零食碱水面包丁茶颜同款海盐焦糖干脆饼干解馋小吃官方旗舰店休闲零食赵老师老醋蚕豆四川零食香酥无壳散装独立装小包装休闲蚕豆零食";
// 生成描述的数组
const desArr = ["包邮","退货宝","7天无理由","送运费险","满78减5","国家补贴","大鹅优惠券","全网低价","超级立减","天天特价"];



// 生成随机数函数 作为图片路径
const randomSrc = ( min , max ) => Math.floor(Math.random() * (max - min + 1) + min);

// 生成随机小数 作为价格
const randomPrice = () => (Math.random() * randomSrc( 10 , 1000 )).toFixed(2);

// 按照指定的个数 生成描述
const createDes = ( nDes ) => {
    const des = []; // 存储描述
    // 按照描述的个数 循环  注意去重  即位置循环
    while( des.length < nDes ){
        // 生成描述的下标
        let index = randomSrc( 0 , desArr.length - 1 );
        // 根据下标找到对应的描述 判断是否出现过  要的是未出现
        if( des.indexOf( desArr[index] ) === -1 ) des.push( desArr[index] )
    }
    return des;
}

// 生成数据的函数
const createData = ( total ) => {
    const data = [];  // 存储数据的数组
    // 按照指定的条数total循环生成数据
    for( let i = 0 ; i < total ; i++ ){
        data.push({
            name : nameStr.substr( randomSrc(0,149) , randomSrc(15,30) ) ,
            price : randomPrice(),
            des : createDes(randomSrc(0,3)),
            src : `./img/${randomSrc(1,11)}.webp`
        })
    }
    return data
}
