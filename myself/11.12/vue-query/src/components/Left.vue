<script>
export default {
    props:['articles','currentIndex']
}
</script>

<template>
    <div class="container">
        <div class="left">
            <header>
                <h6>{{ articles[currentIndex].title }}</h6>
                <nav>
                    <span>0</span>
                    <span>0.00</span>
                    <span>0.00</span>
                    <span>0.00</span>
                    <span>0</span>
                    <span>0</span>
                    <span>{{articles[currentIndex].content.length}}</span>
                </nav>
                <div class="text">{{ articles[currentIndex].content }}</div>
                <textarea name="" id=""></textarea>
            </header>
        </div>
        <footer>
            <button class="pause">暂停</button>
            <button class="reset">重打</button>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;

    button {
        width: 60px;
        height: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-left: 5px;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
    }

    .pause {
        background-color: #247AD2;
    }

    .reset {
        background-color: #008080;
    }
}

.left {
    width: 240px;
    height: 180px;
    border: 1px solid #ccc;
    margin-bottom: 5px;

    header {
        height: 45px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        h6 {
            height: 24px;
            padding: 3px 0 3px 5px;
            color: #008000;
        }
        nav {
            display: flex;
            align-items: center;
            height: 25px;
            font-size: 10px;
            span {
                padding: 1px 0;
                flex: 1;
                text-align: center;
                border: 1px solid #ccc;
            }
        }
    }
}

.text {
    height: 70px;
    overflow: hidden;
    overflow-y: auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px;
    font-size: 12px;
}

textarea {
    height: 60px;
    width: 100%;
    resize: none;
    overflow-y: scroll;
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 5px;
}
</style>