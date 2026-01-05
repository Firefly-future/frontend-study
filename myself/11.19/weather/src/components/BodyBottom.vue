<script setup>
import { getWeekday } from "@/utils/util";
    const props = defineProps(['cityList', 'weather', 'weathercode'])
</script>
<template>
    <div class="body2">
        <h1>未来七天天气预报</h1>
        <div class="week">
            <div class="weekday" v-for="(item, index) in weather?.daily?.time" :key="index">
                <h5>{{getWeekday( weather?.daily?.time[index] )}}</h5>
                <p>{{ weather?.daily?.temperature_2m_max[index] }}°C
                    /
                    {{weather?.daily?.temperature_2m_min[index] }}°C</p>
                <p>{{ weathercode[weather?.daily?.weathercode[index]] }}</p>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .body2 {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        h1 {
            color: #fff;
        }

        .week {
            flex: 1;
            max-width: 600px;
            display: flex;
            flex-wrap: wrap;
            padding: 24px;

            .weekday {
                height: 100px;
                width: 150px;
                padding: 20px;
                border: 1px solid #525684;
                border-radius: 10px;
                margin: 5px 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #fff;
                p{
                    margin: 5px 0;
                }
            }
        }
    }
</style>