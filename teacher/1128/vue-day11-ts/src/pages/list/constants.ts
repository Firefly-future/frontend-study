

export const Sex = {
  man: 1,
  woman: 0
} as const

export const sexEnum = {
  [Sex.woman]: {
    type: 'success',
    text: '女'
  },
  [Sex.man]: {
    type: 'primary',
    text: '男'
  }
}