
export const Sex={
    man:1,
    woman:0
} as const

export const sexEnum={
    [Sex.man]:{
        type:'primary',
        text:'男'
    },
    [Sex.woman]:{
        type:'danger',
        text:'女'
    }
}