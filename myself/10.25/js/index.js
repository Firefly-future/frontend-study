


let currentEl = null;

[...$('header').children].forEach((item, index) => {
    item.addEventListener('dragstart', e => {
        // console.log(e)
        $('.del').classList.add('show')
        currentEl = item
        // 开始拖拽时存储数据
        e.dataTransfer.setData('item', index)
    })
    item.addEventListener('drag', () => {
        $all('ul li').forEach(li => {
            li.addEventListener('dragenter', () => {
                // console.log(e)
                li.classList.add('tomato')
            })

            li.addEventListener('dragleave', () => {
                li.classList.remove('tomato')
            })
        }
        )
    })
    item.addEventListener('dragend', e => {
        // console.log(e)

        $('.del').classList.remove('show')
        currentEl = null
        $('.del').addEventListener('dragover', e => {
            e.preventDefault()
        })
        $('.del').addEventListener('drop', () => {
            currentEl.remove()
        })

    })
})
