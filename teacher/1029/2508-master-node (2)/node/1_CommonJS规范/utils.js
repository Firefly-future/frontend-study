
const test = 'abdefgsadfsadfljksdalkjklj'

const addZero = n => n >= 10 ? '' + n : '0' + n

const format = time => new Date(time).toLocaleString()


console.log('我是utils.js');

// 抛出变量
module.exports = {
  addZero,
  format
}