import axios from "axios"

export type MusicItem = {
  keyCode: number
  keyTrigger: string
  id: string
  url: string
  bankUrl: string
}

export const getData = () => {
  return axios.get<MusicItem[]>('http://39.96.210.90:3000/api/music')
}