<script>
export default {
    props: {
        title: {
            type: String,
        },
        num: {
            type: Number,
            default:20
        },
        price: {
            type: [String, Number],
            default: 20
        },
        info: {
            type: Object,
            default() {
                return {
                    name: '小白',
                    age: 33550337,
                    gender: '男'
                }
            }
        },
        tipType: {
            validator(value) {
                if (value === 'aa' || value === 'bb') {
                    console.log('对的对的')
                    return true
                } else {
                    console.log('错了错了')
                    return false
                }
            }
        }
    }
}
</script>

<template>
    <div class="test">
        <h2>我是第二个组件</h2>
        <div class="titl">{{ title }}</div>
        <p>数量：{{ num }}</p>
        <p>价格：{{ price.toFixed(2)}}</p>
        <p>num:{{ num }}</p>
        <button @click="$emit('change',-1)">num--</button>
        <button @click="$emit('change',1)">num++</button>
        {{ info }}
        {{ tipType }}
    </div>
</template>

<style lang="scss" scoped>
.test{
    border: 1px solid red;
}
</style>