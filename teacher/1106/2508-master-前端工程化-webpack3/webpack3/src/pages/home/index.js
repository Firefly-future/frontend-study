import { $, $all } from '@/utils/utils.js'
import './index.scss'
import VConsole from 'vconsole'
import './js/search.js'
import './js/hot.js'
import './js/recommend.js'

if (process.env.NODE_ENV === 'development') {
  const vConsole = new VConsole()
}

// 切换主题色
$('.changeTheme').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark')
})


// tab 切换
$all('.nav-item').forEach((item, index) => {
  item.addEventListener('click', () => {
    $('.nav-item.active').classList.remove('active')
    item.classList.add('active')
    $('.tab-content.show').classList.remove('show')
    $all('.tab-content')[index].classList.add('show')
  })
})



