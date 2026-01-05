
// 单独抛出
export const addZero = n => n >= 10 ? n : '0' + n

export const version = '1.1.0'

export const arr = ['a', 'b', 'c']

export const loadImg = (url, { width } = { width: 100 }) => {
  const img = new Image()
  img.src = url
  img.width = width
  img.onload = () => {
    document.body.appendChild(img)
  }
}


// 默认抛出
export default [1,2,3]