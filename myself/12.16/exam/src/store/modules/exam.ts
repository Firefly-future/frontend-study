import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Question } from "@/services"

export type ExamHistoryItem = {
  id: number
  examTime: number
  list: Question[]
  score: number
  errorCount: number
  correctCount: number
}

type State = {
  examHistory: ExamHistoryItem[]
}

const initialState: State = {
  examHistory: [],
}

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    addExam: (state, action: PayloadAction<ExamHistoryItem>) => {
      state.examHistory.unshift(action.payload)
    },
  },
})

export const { addExam } = examSlice.actions
export default examSlice.reducer
