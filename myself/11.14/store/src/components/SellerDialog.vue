<script>
import Star from './Star.vue';
export default {
    props: ['info'],
    components: {
        Star
    },
    data() {
        return {
            list: [
                {
                    title: this.info.supports[0].description,
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQwQzhEOEE0REI5MTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjU4QjNENUM0REI5MTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNDBDOEQ4ODREQjkxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNDBDOEQ4OTREQjkxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhKXH6IAAAKjSURBVHja3Fc9T8MwEL006QdjUScYywYjHdsRNlj5CzDyG/gNXWFkgKFiKmKCkbUjjDDCgBAQSs09KweOsdMEUCOw5DaNY9/zu3cvLimlWtyPuD+o2bWHJGYr4I8BEW1QOe0EAF74olYSgBgAFJXYKr+94Pj8nManp/Q2Gunf8u1rkW9gcn1NwcICBXNz+rd6eiJ1e5u652oIiLlo1fV1eh0OKVxZoerWlnNe5Av+0u/rCdHaGkW9ng6Oe2i439jbm8pG2O1qQOiViwu9lt2cGgCNr4PB50K8g7DToXh///u5Xlyk+u5uPgawY7Ag+cM1Fkgt2G47A4EppMt+xp4/VQPVzU0NAHTXtreJnp9T4/WdHec8pEklGvA9kwtAMD+vmQhXVzV6EdZHmljptvggUBOoMJEl2lw+gGBBs0nx4WGhvIMBMIINQIDQUm4GzIpAKdk59NGLZ4Wtyc1N6vtbRiS7jrikUmJjeiUQqB9fXhI1GmnwLMgPqpnBQhqQclR3d1rN0IStduw2FdByPWUA8FWBlwHsUIQWsQd4KWRwYTIOkCZQod5XspkAYEQAAQWHGQDCpaVPgEiBlQYxskIAgPwNOcXkjOA+QD8GYNqwLb5pde2yYFs/U0VoisdpHjAcMaCrK5qwUF1jsgEt5vt77a65GDBpjw8OUiVnK1q/M5J0+dbSr2iPF7gBsP2aekBKzAXMnCKAuTPbogEQuy/0MtJ54zyLl2OHknfkE2WFMRw4cI2O9waC296AV7hUU6EyNGvXBFNNDhVgAf4uzwGkBDdFJ/MK+4BQhp2h26bjqxw5eHx5zuEPmVZcWV6mGvt3aJhMlifI+UHOfqILnT5mxDf3/x3L/ySAxxLjxwBwViKAISV/z4+5xzP8ex4nMVvvAgwAfUE0sZNv/EQAAAAASUVORK5CYII='
                },
                {
                    title: this.info.supports[1].description,
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzQwQzhEODI0REI5MTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzQwQzhEODM0REI5MTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNDBDOEQ4MDREQjkxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNDBDOEQ4MTREQjkxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpN4y5gAAAJhSURBVHjaxFexThtBEJ0YY0FsEBjHAQJIgARpoMA0qUyTLiBaPiCkD/TwAUAP9FRQJNBESYEbKkyRFCiREqTEigMROIpjiRxCx72Vx1qfd40PL74nrXW+vfN7O/Nmdk22bcecse2MvN045IucsQfOxxsimiF/sAsB/52LkE8CLAiwyUcEq8bna472vv2h3kiIesLN9GKoQ1wDX3KXlLeuKfE4rH1/4+MZ7f/4S+vPB6kt1ORdQLZwRenTghgAyFjA6mG27D5IAIgC6ean3/TznyXuvXp/ohURNBFGkG4dn9PRWUGQu4ForaV/0dKzJ/UJ+HxxKVYx0tmiIMhWPI/nRqOtNBF/SFP97bWngEOLFMgACQSsJAcqiBYme0rf4RdO1Z1MiPxiVbpwL6a+CxIGRFUzo2cB8+NxIUA2IDA93CmIEU6IrNUfiKQ7bVUFgAADZSQLQBmqVgoS+Tl3NCEAaVO9a6QKEC2UWjVg/u3sSIU3gl7LDVGZe9pVdh8/iuiwcdHA3HNIgcqYngTAfCrAF/ANV5AsQJ5TIaCbQBdTVQJWoqtpI1UA0uWDjJIcxOhmur5+FwRU4dT1AOSeyd1NypgAENQSYt5o7mU7Tva1lVYqG0pHPhptMRcB7njItdxu3T6RMREPmxVwG1KZfFmd11MVnnZDhrznvxx7ZN4DaDjoerpjGs+htyNdRqsAeJ3oVtY6PIEzIofefS4wbkL3Pd4PmNxEQ9Iey1FqvFq5/XL4deT8XqS5SZSn6ghXk4BGIUA+AwIKPvJbEPDBRwHvqPj3fMcZVgP/nltFztiNAAMAmsEHVNjW5TsAAAAASUVORK5CYII='
                },
                {
                    title: this.info.supports[2].description,
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUFBMjcwRUE0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUFBMjcwRUI0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1QUEyNzBFODREQjQxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1QUEyNzBFOTREQjQxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmCrdL8AAAKgSURBVHjaxJc7aBRRFIaPYfAZEZIl4kJSBEywEFxMZQoDWpq0RjvFR2Hno47pBB+dhTZ2EkELExtBQUHtJIKFREEhQkRxC9msMUtknG/YM8zjzOxsEjM/3H3M3DvnP//577mMuK5b8sZDb9TcjUOtGbO0yft4LCJjUgxmILDs/dhcEIEGBFwpEE6rCXfnp/1R3lqSPVu65c7+K4k5b3/Nyfn31+XgrkHZ6WyXw10HZHT38OoJzHx/7Qcc2NEbXFv489MfWYAIqK38DghwDWJtEXjy403wsHN9Y5nBwFx9PnIPAtznOSQzsfdUqiLOamt38/OUfKx/Ne9xnZIoJj/d81VA1VwENDtLOvww0l2RS/3jwbxvy1U/UwWBjvUcCv5TSis4MHfB0KszmdljNMyoHlETKiBumbXtEhBg8e9SxHyqCjsiD1jLM8KGziQQruvVgdPyojrry64gMzIOz0szId/UX9dZJBIEWKR1ZAEE2jGgZUJwcnZSpoeuJbzgpBlwpKuSGuBE+ahvPAthQ6rzKVeaERMEmIzJxstHzABISgArG01ACWgTSuslJgEaRrhpLK4sJbokBDFWHlBCSkIzYl3LbYhrtROyUD0R3xlpu4D5lj9YhxHjJBxrj4ddHwcPufzhdqQV58FgZ5+pgEmAEoQ7W/z+jX0X5NaXB2afjzcl6p/lgQ7rorZRDJR2kqkCmDJLsVYwCRD0fmXCl9sigApne0cj54M2nHUhoKbJArKHt2He1pybQB6gAmrgA5SiLO2a01kLAY5lAk8tPF//EuQB2WsZ0s77/0pAcbH/uN+a+bYMvaYSYC6kxpSdzrZsY/YMy8vqu8ih1YpA4e8FHVIwIFAvMH4DAs8KJPBUmq/nj7zR2MDX80YzZumfAAMAT9Ay2IE9eG0AAAAASUVORK5CYII='
                },
                {
                    title: this.info.supports[3].description,
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzRBOEZBRjE0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzRBOEZBRjI0REI0MTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NEE4RkFFRjREQjQxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NEE4RkFGMDREQjQxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjEX/Z4AAAKKSURBVHja3Fc9TNtAFH4gBFn4GVyBxJANyBJ3SiYyVXRAVCoSiIGIBTYYmcrIBls6QYdWWVB/QCXqwM8EE0zAAixIGZD4G4CoUpLFve+acxz7zjmrIZb6pLOt8/ned9/73rszWZZlsPadtYLVPCtUfBot7PKTiN5ROJYDgBJ7aA8JQBkALArRWl/awfHyAW2OZKn0WJS+lzKQiSw3HMgrs5emjuY8/W2ywa8XEnR/eusN2FOxpr8/FeX364N8jaP27ojn21g6rs8ADLTBISbDpMMrI9wR+oUtFJc8jI3vpjkwUL6R/ERv1sdsoDJr86NNrBaOOxiQ5/yTJ75uO8+e8fFXuUs2/pEDTi6lKMFaYAac1P6rqUBoZwHoBr3uPhEGZwjQ56QdIVQx0NqMXJeJUksD9VJT1ucUqY5pA/BTsswezm6VxUcLQFe0hyj1994V7Q4M4IhlCESM9EVdUZkyC662L+nX5LeGaEDUhkAM4IOgq1aVYN95XvrksTe7bX0eyFh3JzfS954QQDhrfasNT8WOngjNXMzzu28IMCCWNnkZhRVY+cUz+o14r1Llzo0Jwu1kwnVvRm7nSg1gAxG2kVwnypPtbPTrBJ/IXaohNCHaEtvEYqm4svppV8L9uVzN9ouVyVZhA18b46IDWKThl8GP0m1dC8B59pS3KoUmW9Fw3Ti/30nbIBE6MHiSOQ5WiOAYq3eGBAB0TkoCxNbb6jHscHHXPujUZQCohXNQjmOUECUm4BVS4tSd+4kP1fj7VUNpJQQDUL85n/BMLk46Ikv89nqsfGja5IACl2I/EwCRaka8z9dBPfv//wt0APwO0X8ZAPZDBLBDld/zH6yVm/h7Xq74NP4IMAB7J5cF7YRXigAAAABJRU5ErkJggg=='
                },
                {
                    title: this.info.supports[4].description,
                    url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjU4QjNENjM0REI5MTFFNkJGNzlFOUVCREZEMzI2ODciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjU4QjNENjQ0REI5MTFFNkJGNzlFOUVCREZEMzI2ODciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNThCM0Q2MTREQjkxMUU2QkY3OUU5RUJERkQzMjY4NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNThCM0Q2MjREQjkxMUU2QkY3OUU5RUJERkQzMjY4NyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqkGEWkAAAKDSURBVHjaYvj//78IEK8B4s//6Qc+Q+0UYQQSGxkYGPwYBgZsBjngJ5DBNkAO+AVywH+GAQRMhBQc+PyMwfHWFoYJry4zPPj1GS4GwvgASG3g3V0MF769xauOYAg0Pj/L0PDsLJzfL2vJUPj4OJyvwMbLkCCihqFvwsvLDB/+/mIQYGYD6rFiSBBWw2o+C6EQ2PDhAQrfgUcKw6fIDkQHIEckPjgAZmNzBAuhYEQOQpBvDbiEUdTgCgFkRwUIKJAXAui+r5cyxlCjwM7LUC9pjNcB6I4mOhFOfHkFzgbFJcgndMsFoFQOS/UQX4iAHUFtwII79Z8jyoAL396AsylVHQCKe0L5HDmVE6uWqCgAGYiczwkBUOpuQEuc/43TwLnDgVcKLG/PI0l8CICCFDnusYH9aj4oaQJUWKGD+7qRUPPeMlz4/pZ4B4BcfV4zGBgSPzHidsHbWwwPoY47+OU5UoJ9jlF6opeIuAoivEUx49lZKA4z4BQG1wnkAlDIgcwhqShGBvFAHwiwsKH4HFcCLBDTRVGrD3Q8uuUkOwBUosFKNVCwLnhzC3ct+uUZ0Me+BMsOJnKDsxFY1OJLrKDE53hrMzz+qeoAULAjpwV0X8KCGuQIxcvL8JYTJDsA1tBALgcKxHVRKy1JI5RyBZSbQGULttAgyQEgA0CWI2er+QoODNiyMnqCA6UJikMAuYkFSuXYLIeB+Qr28KgBJVxcCZIkB/TLWIINWa/sBm6a4QOgohjkQHyWk5UN7+tGEV0tg9oPhNoQeEtCUJEKq0jwtQdAqRxU3oNKSuRcQAwY/P0Cejjg6wDa/wvkgD0D6ICdDNDu+Vog/kXH7vkvqJ0iAAEGADpWEt2Pbne5AAAAAElFTkSuQmCC'
                },
            ]
        }
    }
}
</script>
<template>
    <div class="dialog">
        <main>
            <div class="title">{{ info.name }}</div>
            <div class="star">
                <Star :num="info.serviceScore" :size="20"></Star>
            </div>
            <div class="cheap">
                <div class="line"></div>
                <div class="cheap-info">优惠信息</div>
                <div class="line"></div>
            </div>
            <div class="support">
                <ul>
                    <li v-for="item in list" :key="item">
                        <img :src="item.url" alt="">
                        <span>{{ item.title }}</span>
                    </li>
                </ul>
            </div>
            <div class="notice">
                <div class="line"></div>
                <div class="notice-info">商家公告</div>
                <div class="line"></div>
            </div>
            <div class="tip">
                {{ info.bulletin }}
            </div>
            <div class="close" @click="$emit('close')">X</div>
        </main>
    </div>
</template>

<style lang="scss" scoped>
.dialog {
    backdrop-filter: blur(10px);
    background: rgba(7, 17, 27, .8);
    color: #fff;
    height: 100%;
    left: 0;
    overflow: auto;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;

    main {
        margin-top: 64px;
        padding: 0 40px;
        padding-bottom: 64px;
        width: 100%;
        text-align: center;
    }

    .star {
        display: flex;
        justify-content: center;
    }

    .title {
        font-size: 16px;
        font-weight: 700;
        line-height: 16px;
        margin-bottom: 20px;
    }

    .notice {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 28px auto 24px;

        .notice-info {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
        }
    }

    .cheap {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 28px auto 24px;

        .cheap-info {
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
        }
    }

    .line {
        flex: 1;
        border-bottom: 1px solid hsla(0, 0%, 100%, .2);
    }

    .support ul {
        text-align: left;

        li {
            display: flex;
            align-items: center;
            margin-left: 10px;
            font-size: 14px;
        }

        img {
            width: 14px;
            height: 14px;
            margin-right: 5px;
        }
    }

    .close {
        font-size: 30px;
        height: 30px;
        width: 30px;
        position: absolute;
        left: 50%;
        top: 90%;
        transform: translate(-50%, -90%);
    }
}

.tip {
    text-align: left;
    font-size: 12px;
}
</style>
