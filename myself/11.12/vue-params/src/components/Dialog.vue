<script>
export default {
    data() {
        return {
            list: [1, 2, 3, 4, 56, 7, 8, 99, 49, 10],
            // obj: {
            //     name: '小明',
            //     age: 22,
            //     sex: '男'
            // }
        }
    }
}
</script>

<template>
    <div class="box" @click.self="$emit('close')">
        <div class="dialog">
            <header>
                <slot name="header">
                    <h1>默认标题</h1>
                </slot>
            </header>
            <main>
                <slot name="default" :list="list" a="100" :b="true">
                    {{ obj }}
                </slot>
            </main>
            <footer v-if="$slots.footer">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    font-size: 10px;
    background: rgba($color: #000000, $alpha: .2);

    .dialog {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 300px;
        background: #fff;
        padding: 5px 10px;

        header {
            height: 30px;
            border-bottom: 1px solid rgba($color: #000000, $alpha: .3);
            margin-bottom: 5px;
        }

        main {
            height: 210px;
        }

        footer {
            height: 50px;
            border-top: 1px solid rgba($color: #000000, $alpha: .3);
            margin-top: 5px;
        }
    }
}
</style>