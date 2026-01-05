let $ = (id,parent) => {
    parent = typeof(parent) === 'undefined' ? document : parent;
    return parent.querySelector(id);
}
    tbody = $('tbody'),
    ele_count = $('.chooseCount'),
    ele_total = $('.totalMoney'),
    del_all = $('.dels');
// 渲染数据
function readerToDom(){
    tbody.innerHTML = datas.map((data,idx) => {
        return `<tr>
                    <td><input type="checkbox"></td>
                    <td class="proInfo">
                        <img src="${data.img}" alt="">
                    <div class="proDes">
                        <a href="${data.link}" target="_blank">${data.name}</a>
                    </div>
                </td>
                <td>
                    &yen;<em class="price">${data.price}</em>
                </td>
                <td class="countFn">
                    <span class="min">-</span>
                    <input type="text" class="count" value="1" data-max="${data.max}">
                    <span class="max">+</span>
                </td>
                <td>&yen;<span class="money">0.00</span></td>
                <td class="lastTd"><em>移入收藏</em><em class="del" data-id=${idx}>删除</em></td>
            </tr>`;
    }).join('');
}

readerToDom();
let ipts = tbody.querySelectorAll('input[type=text]'),
    checks = tbody.querySelectorAll('input[type=checkbox]'),
    cl = $('.checkall');

// 添加/删除商品
tbody.addEventListener('click',(e) => {
    let target = e.target;
    if(target.nodeName === 'SPAN'){
        // 获取文本框及它的值
        let ipt = $('input',target.parentNode),
            num = ipt.value * 1,
            max = ipt.getAttribute('data-max'),
            check = ipt.parentNode.parentNode.querySelector('input[type=checkbox]');
        // 如果是添加
        if(target.classList.contains('max')){
            if(num >= max){
                alert('该商品限购' + max + '件');
                return;
            }
            num++;
            ipt.value = num;
        }else{
            // 获取删除的那条数据的id
            let id = target.parentNode.nextElementSibling.nextElementSibling.lastElementChild.getAttribute('data-id');
            if(num === 1){
                if(confirm('您确定不够买该商品了吗？')){
                    // 将该条数据从数组中删除
                    datas.splice(id,1);
                    readerToDom();
                }
            }else{
                num--;
                ipt.value = num;
            }
        }
        showCount();
        showAll(ipt);
    }
})

// 显示每一个商品的总价
function showCount(){
    ipts.forEach((ipt,idx) => {
        // 当ipt上触发了checked事件
        coumputeTotal(ipt);
    });
}
showCount();

// 给所有input绑定input事件
ipts.forEach((ipt) => {
    ipt.addEventListener('input',() => {
        coumputeTotal(ipt);
        showAll();
    })
});

function coumputeTotal(ipt){
    let price = ipt.parentNode.previousElementSibling.lastElementChild.innerHTML,
        total_row = ipt.parentNode.nextElementSibling.lastElementChild;
    total_row.innerHTML = ipt.value * price;
}

// 选中
let count = 0,
    total = 0;
checks.forEach((check) => {
    check.addEventListener('change',() => {
        // 显示所有选中商品的总数和总额
        showCountTotal(check);
    })
})

function showCountTotal(check){
    if(!check.checked) return;
    let tr = check.parentNode.parentNode,
            num = tr.querySelector('input[type=text]').value * 1,
            price = tr.querySelector('.price').innerHTML * 1;
            count += num;
            total += num * price;
            ele_count.innerHTML = count;
            ele_total.innerHTML = total;
}

function showAll(ipt){
    let nn = 0;
    let tt = 0;
    checks.forEach((check) => {
        if(check.checked){
            let n = check.parentNode.parentNode.querySelector('input[type=text]').value * 1;
            let t = check.parentNode.parentNode.querySelector('.price').innerHTML * 1;
            nn += n;
            tt += n * t;
            ele_count.innerHTML = nn;
            ele_total.innerHTML = tt;
        }
    })
}

cl.addEventListener('click',() => {
    checks.forEach((check) => {
         check.checked = cl.checked;
         showAll();
    })
})

del_all.addEventListener('click',() => {
     checks.forEach((check) => {
         if(!check.checked) return;
         let id = check.parentNode.parentNode.querySelector('.del').getAttribute('data-id');
         datas.splice(id,1);
         readerToDom();
    })
})