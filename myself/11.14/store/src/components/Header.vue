<script>
import SellerDialog from './SellerDialog.vue';
export default {
    props: ['info'],
    components: {
        SellerDialog
    },
    data() {
        return {
            show: false
        }
    }
}
</script>

<template>
    <div class="header" @click="show = true">
        <div class="bg"><img :src="info.avatar" alt=""></div>
        <div class="icon">
            <img :src="info.avatar" alt="">
            <div class="info-right">
                <h4>{{ info.name }}</h4>
                <p class="desc">{{ info.description }}/{{ info.deliveryTime }}分钟送达</p>
                <p class="support">{{ info.supports?.[0].description }} <span>{{ info.supports?.length }}个 &gt;</span>
                </p>
            </div>
        </div>
        <div class="tip"><span class="bulletin-title"></span>
            <span class="bulletin-text">{{ info.bulletin }}</span>
        </div>
        <Teleport :to="'body'">
            <SellerDialog v-if="show" :info="info" @close="show = false"></SellerDialog>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
.header {
    height: 142px;
    position: relative;
    background: rgba($color: #000000, $alpha: .5);
    display: flex;
    flex-direction: column;
    color: #fff;

    .tip {
        flex: 1;
        display: flex;
        align-items: center;
        background-color: rgba(7, 17, 27, .2);

        .bulletin-title {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAYCAYAAACBbx+6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Mjk0NDhEMDg0RDhGMTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Mjk0NDhEMDk0RDhGMTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOTQ0OEQwNjREOEYxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyOTQ0OEQwNzREOEYxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Puq6d8sAAAM6SURBVHja1FdLTFNBFL0YdrZbS7cI7vjuqoZEI0EwGhKIGkxABbugKNJFaWJ1IZC0JLapKS6IqDVKRK2BxL+uiIaVIrqTzw7aurTt+vnOwAzT+qYfNeo7ycvrm++59557Z1qmaVorEU3pj53+b8T1p7dMJ7xhArKCNAhrZCLsIJOhvJhB8+8WqKG+hqwWy3ZsEkn2NNbXFo6jPg6wV9jY+9nLN7S49IV9V++upKb9jj9HGJt5r4yQxbKTmvY5yDfspuXVNXINDbP+2PTtLEOMMOD2snVAcLDfSYnkN3r+6i3ra6irKYlwQUlMRe+zdzqdEZ6CV3hbeGIy7/yPnz6LeYygHikVUuk0cwQcokLepMMCLceOi+9I0C8k8ODxLF2/sUn2kmeIjhxuNlwDBBD+UoBoRicjQkJFS+JhbG7bM3roZL2e7GynR0/mmPfGxkOsLZc0vMvJ9vacYmsAkAOXBKI16HJmzbNaLYZk8xIGkZnYrLAY2uXJAi1Dd/As9AkYkeZyAVk8HLLHsXYxiVtQw9AuNAogUWDxrbvTzDNIQoQaG7W1HBJzQDqsywRSAnxeN/mvXs4iWwjQb0fXGaWOy1WJwkMGQvAavCsnz4mO9k1j9HAur6yJDWZ0bXMjes4NFCQIb+892GaofSMd/5R08M5p53lGDhtDCgCs5oTldu4VbICIyOGH4SWdu1ulj+uYV6MsaDnYiCe05qOd2oj/mmi7eeee5jjQyp7uPpf2PZVi7R8Wl1gf8HVlVeu/6MldjrXxeRijwtMXr9k4jOfrG8GwrMmWwuPwLryHBJkIBYTl3Ou5SfXXy5o8cCwQyko+OUxnu7tYoiFBizliL+jz91RVGvbJpa6xrrb0ssbP/Pn3C8rDAd+oHPDy6HiQolUR5UYAyKpKmByFaoVReQmDbHjrJEOIcP6PBoIi8fAtVw1EAf2QzD+5rYEQlwLe/E4hg8uA98FLuNmppIGDBMar9vstwihduST58Qyi8nUTJOPJJPk87rw6RqhVksm9JP3S5QeyACm73WZcE6U6XGHbZXjNxCUpk8mwfhijuoqCMK9EMEw1zpR/keIm4psA4T78MAHZdVz8fggwAAhHLI5JzyRSAAAAAElFTkSuQmCC) no-repeat;
            background-size: 22px 12px;
            height: 12px;
            width: 24px;
            margin-left: 4px;
            padding: 0 10px;
        }

        .bulletin-text {
            font-size: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            padding: 0 8px;
            height: 28px;
            line-height: 28px;
        }
    }

    .icon {
        flex: 1;
        padding: 24px 12px 18px 24px;
        display: flex;

        img {
            width: 64px;
            height: 64px;
        }

        .info-right {
            flex: 1;
            margin-left: 12px;

            h4 {
                font-size: 16px;
                font-weight: 700;
                margin-bottom: 5px;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAkCAYAAADVeVmEAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjhCMERGODc0RDYwMTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjhCMERGODg0RDYwMTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2OEIwREY4NTRENjAxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2OEIwREY4NjRENjAxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpkNE6kAAAOnSURBVHja7Fm/M2NRFL75wSaxsxoKBX8BnYqKjoaSSmFnVHTMFootaOiomNlCp6ShVNHp6FTMrh2aZdaSZCN7v+OdzMl138t9eTEbSc7MneTFyb33O/ec73w3Yr+6usaUUt/06FGNbdd6zMY04B9NALYEOt5EYGE9cdVk1gLc6Jb4ksl8dXH8MDenkqOjKjkwoGKpFH1WvL/3j2Rvr+rY3yffwump22b6+1Vme5u+m+jrU4Wzs9f7WFxU6dVVlRgcJB+VzarizY0zYLB00cWxY29PJYeHS89/j49pBAUo1tlJ7/MHB+pxYUEV7+5ebT61tETAaL7DQ1qH53+YnCSf4tWVesa4vFQfj45K8+J7j/Pz9Iq9Be2HLVltamABGYAgaxsfp9c/MzO+J4tgALBpCAgbgJlBhGV2dmiN7NaWelpefhvAud1dldcjKCOkZdfXo9efDowMIgdSZhV8EFgzmyIDRnq5pJA8naiW8wLcPjVVVlbt09NU97Qvnfp+YN8dS+eNrAJYZA6CL33eJKXjmiFda7gaQ62mVlbKucA7WckjvBdn7ql2Q0irdmMDUetTAsSzrFmZytUQZ/Qa9tpEEIuHPdGEx8B+xgzMgWHixLMZnJoAZpB4xUJBpCX7qYtx3zWt8/bWl/iYOINIKhRgpFBybOxFGOgeiT7Hp0GCQC/Em0CU8TmdulZgcvOYB/6urclPRJg1DXaGr+vpVgQc01Qv+50Eh0XQ95BmCASeZRqzb2JoqCQe4GNTXCZRIUA2EWECQyvidvQmNWyKCQYft0TY5ovAJbQWf5iYoLIwT/XTxUW5dvcCyKVEde6tJVtSenOTfBHISukdCvDT2loplWRkC3rxuMGg7GsyKTZqgqWLiFce0hfy8ffICAFNb2yU/Y3nxXzQ07Y5IwPmGsRCDBgLgi3NHinrtQyEjzAAWNS9JCnMwSkuNTT6rkxvgIUP5qik6OpGadlICqAAFANAUNM5fX006x7pj7TGTaqSNkiqOrY2IW5IiBgsbfscGZHXHaXml4daW+HkxFpC1iujEBp88rI3BxFX/QC21B7dkS2pLgH5+dS0Lbk0evYNEvZMZgAbRi1FsVCAw+hjF19m3pyn4OruV8u77m4aLinEvtyPrZcF76edvKVO/8sJg0iwYZNQQBLcKjgV+TJh+j6fn7+A1vra7JOYx1RHLEyCbmJyrbCl4PyrZaNY6z8PLcAtwO8f8HUT4f0JwJ/xpgnAftdj9p8AAwCeZRLH3XUY/AAAAABJRU5ErkJggg==);
                background-repeat: no-repeat;
                background-size: 30px 18px;
                background-position: center left;
                padding-left: 36px;
            }

            .desc {
                font-size: 12px;
                line-height: 12px;
                margin-bottom: 8px;
            }

            .support {
                font-size: 10px;
                line-height: 12px;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUE1QTdFNjU0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUE1QTdFNjY0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyOTQ0OEQwRTREOEYxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxQTVBN0U2NDREQjQxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoFQatoAAAN2SURBVHjatFbNS1RRFP/d+94MmqSW5UeiC8EvUCpFxYULRQtx0dK97lr0h7gM7B9wEYESim4sqEhTMINE/EAjm/xoEmWmdNT33r23c+5k6DjaRg9c5+o77/zO+Z3fOaMwxjwE8JROAS7XonSeCAKI0KUEV2PrDJCgS+YVARy49MM7F8AYQIj0ryoF/9UrCnEAWVkJs7cHt74ecJyTXp5MfS94/x7e8+f2BQ7uDw/DGxiA3tw87UiB9OIivBcvYL5/RzA6Cp/u0PqUm5uaVTA9DTUxAb2yArezE+rzZwQfP0LNz0Pm5yer+mt6ZweysBDB3BzM79/w372D294OwX5pAaRE6NEjmK9foRYW4Ny7B5GdDXnrFmRBAURJiU0CoRCYOPPrlw0ssrIgm5shwmEgI+OCCogSp6ICTlMTQnfuwO3owGFfnw3ilJXBbW2lAgwMZW6CAHprC5qS4aRkcXHaVrGKYvSZc+qvvm+rUbOz8F+/ho5EIG/ehMjJgTk8tIe5FuRj4nGEurstkCwttUmcEEbcTQtLFPhjYwgmJ235oICsFLelxdKgPc8mEYyPQ8di0BsbCKhvzt27cNvaLqDouHnRqAUIPXgA/fMnDPXDVsTNpOAmkYBwXStRq6ZoNEkH0ZpqaQH8wUFIapbb0ABvaMgG5yoUydFQUEH0cBXi2jUIqpZlCgJ0iKJUOzMHrB41NQVZWwtBjeNsj4dOZGYi3NUF5/592w9ZVGR7wTPDEpbl5f8BoGD+yAhAmbGeUxVmP1iKXBFRI/LykoNFR5KERW7uxQDMt15ehiDFyONhITlaKm7csHd/ZgbqyxeI69cB8jPUbPZ3qGLeAmZ393wAcfs2ZHU1zI8fdkXo9XU7TIIGjRuoSZKKEjAEYI6OAD5MHVXCz4M3b5ISPq/JLEmnpgaa1BJ8+AD97Ruwv2/7wQOoP32CbGyEJD9Fe0i9fQvBy43XBCVkJ5orvUhFdiJ53EklanXVZuhSUK4i3NNj+8PPeJNqqk5S1Xp7GyAlMU0p2/QsANPkVFXBoaCaAHglOHV1yYccnJXGfaClGO7ttZQe9fdDUbUOJ5YCwLslZk6a7xuazuQ9kTDEtTlj+/smWFr696taWzPey5dGRSKpnjHeRXHCyb6ib7S4PG+aL8nCDLB9hQA74u+/Lc/o5F12cDqP/wgwAJG54Y1udZHlAAAAAElFTkSuQmCC);
                background-repeat: no-repeat;
                background-size: 12px 12px;
                background-position: left center;
                padding-left: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    border-radius: 14px;
                    background-color: rgba(7, 17, 27, .2);
                    padding: 0 8px;
                    height: 24px;
                    line-height: 24px;
                }
            }
        }
    }

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            vertical-align: middle;
            filter: blur(10px);
        }
    }
}
</style>
