
import './index.scss'
import { $ } from 'util/util.js'
import axios from 'axios'

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

console.log('我是index页面')

import {loadImg} from 'util/util.js'

import img1 from '../img/2.png'

import img2 from '../img/3.png'

console.log(img1)
console.log(img2)

loadImg(img1)
loadImg(img2)



axios.get('http://39.96.210.90:5001/banner')
    .then(res => {
        console.log(res.data)
        // <div class="swiper-slide">Slide 1</div>
        $('.swiper-wrapper').innerHTML = res.data.banners.map(item => {
            return `
        <div class="swiper-slide"><img src='${item.imageUrl}' /></div>
        `
        }).join('')
        const swiper = new Swiper('.swiper', {
            modules: [Navigation, Pagination],
            pagination: {
                el: '.swiper-pagination',
            },
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    })

// axios.get('/bw/user/list')
// .then(res=>{
//     console.log(res.data)
// })