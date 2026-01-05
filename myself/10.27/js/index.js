
const $ = (el, parent = document) => parent.querySelector(el)
const $all = (el, parent = document) => [...parent.querySelectorAll(el)]


var swiper = new Swiper(".swiper", {
    effect: "cards",
    grabCursor: true,
});

// const swiper = new Swiper('.swiper', {
//   // Optional parameters
//   direction: 'vertical',
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
// });

async function getSlide() {
    try {
        const res = await axios.get('http://39.96.210.90:5001/banner')
        // console.log(res.data.banners)
        renderSlide(res.data.banners)
    } catch (e) {
        console.log('请稍后重试')
    }
}
getSlide()

function renderSlide(data) {
    $('.swiper-wrapper').innerHTML = data.map(item => {
        return `<div class='swiper-slide'><img src="${item.imageUrl}"></div>`
    }).join('')
}

// axios.get('http://39.96.210.90:5001/banner')
//       .then(res => {
//         console.log(res.data.banners)
//         document.querySelector('.swiper-wrapper').innerHTML = res.data.banners.map(item => {
//           return `
//             <div class="swiper-slide">
//               <img src="${item.imageUrl}" />
//             </div>
//           `
//         }).join('')
//       })

