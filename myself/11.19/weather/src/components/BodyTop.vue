<script setup>
    const props = defineProps(['cityList', 'weather', 'weathercode'])
</script>
<template>
    <div class="body1">
        <h1>{{ cityList?.name }}</h1>
        <div class="temp">{{ weather?.current_weather?.temperature }}{{ weather?.hourly_units?.apparent_temperature }}
        </div>
        <div class="weather">{{ weathercode[weather?.current_weather?.weathercode] }}</div>
        <div class="detail">
            <div class="detail-item">
                <div class="detail-item-title">🌡️体感温度:</div>
                <div class="detail-item-content">{{ weather?.current_weather?.temperature }}{{
                    weather?.current_weather_units
                        ?.temperature }}</div>
            </div>
            <div class="detail-item">
                <div class="detail-item-title">💧湿度:</div>
                <div class="detail-item-content">{{ weather?.hourly?.
                    relativehumidity_2m[new Date().getHours()] }}{{
                        weather?.current_weather_units
                            ?.relative_humidity_2m }}</div>
            </div>
            <div class="detail-item">
                <div class="detail-item-title">💨风速:</div>
                <div class="detail-item-content">{{ weather?.current_weather?.windspeed }}{{
                    weather?.hourly_units?.windspeed_10m }}</div>
            </div>
            <div class="detail-item">
                <div class="detail-item-title">🌧️降水:</div>
                <div class="detail-item-content">{{ weather?.daily?.precipitation_sum[0] }}{{
                    weather?.daily_units?.precipitation_sum }}</div>
            </div>
        </div>
        <div class="footer">
            <div class="sun">
                <div class="sun-item-left">
                    <div class="sun-item-title">🌅日出:</div>
                    <div class="sun-item-content">{{ weather?.daily?.sunrise[0].substring(11,16)+':00' }}</div>
                </div>
                <div class="sun-item-right">
                    <div class="sun-item-title">🌇日落:</div>
                    <div class="sun-item-content">{{weather?.daily?.sunset[0].substring(11,16)+':00' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .body1 {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #525684;

        h1 {
            font-size: 30px;
            color: #fff;
        }

        .temp {
            font-size: 60px;
            color: #fff;
        }

        .weather {
            font-size: 20px;
            color: #fff;
        }

        .detail {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            flex-wrap: wrap;

            .detail-item {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 10px;
                width: 260px;
                height: 30px;
                border-radius: 10px;
                background-color: #525684;
                color: #fff;
                font-size: 16px;
                line-height: 30px;
                text-align: center;
                user-select: none;
                margin: 5px 10px;

                .detail-item-title {
                    font-size: 16px;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 10px;
                }

                .detail-item-content {
                    font-size: 16px;
                    line-height: 30px;
                    text-align: center;
                }
            }
        }

        .sun {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 5px;
            flex-wrap: wrap;
        }

        .sun-item-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0 10px;
            width: 260px;
            height: 30px;
            border-radius: 10px;
            color: #fff;
            font-size: 16px;
            line-height: 30px;
            text-align: left;
            margin: 5px 10px;
            user-select: none;

            .sun-item-title {
                font-size: 16px;
                line-height: 30px;
                text-align: left;
                margin-right: 10px;
            }

            .sun-item-content {
                font-size: 16px;
                line-height: 30px;
                text-align: left;
            }
        }

        .sun-item-right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 0 10px;
            width: 260px;
            height: 30px;
            border-radius: 10px;
            color: #fff;
            font-size: 16px;
            line-height: 30px;
            text-align: left;
            margin: 5px 10px;
            user-select: none;

            .sun-item-title {
                font-size: 16px;
                line-height: 30px;
                text-align: left;
                margin-right: 10px;
            }

            .sun-item-content {
                font-size: 16px;
                line-height: 30px;
                text-align: left;
            }
        }
    }
</style>