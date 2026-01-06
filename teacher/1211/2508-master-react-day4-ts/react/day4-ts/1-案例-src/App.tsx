import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  getData
} from './services'
import Keyboard, { type KeyboardItem } from './components/keyboard/Keyboard'
import Controller from './components/controller/Controller'



const App = () => {
  const [list, setList] = useState<KeyboardItem[]>([])
  const [power, setPower] = useState(true)
  const [bank, setBank] = useState(false)
  const [curMusic, setCurMusic] = useState<KeyboardItem | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const onPlay = useCallback((item: KeyboardItem) => {
    setList(prevlist => prevlist.map(listItem => {
      return {
        ...listItem,
        isDown: item.id === listItem.id ? true : listItem.isDown
      }
    }))
    if (power) {
      setCurMusic(item)
      audioRef.current!.src = bank ? item.bankUrl : item.url
      audioRef.current!.play()
    }
  }, [power, bank])

  const onMouseup = (keyCode: number) => {
    setList(prevlist => prevlist.map(listItem => {
      return {
        ...listItem,
        isDown: keyCode === listItem.keyCode ? false : listItem.isDown
      }
    }))
  }

  useEffect(() => {
    const getMusicList = async () => {
      try {
        const res = await getData()
        setList(res.data.map(item => ({ ...item, isDown: false })))
      } catch (e) {
        console.log(e)
      }
    }
    getMusicList()
  }, [])

  useEffect(() => {
    if (!power) {
      setCurMusic(null)
    }
  }, [power])

  return (
    <div className="app">
      <Keyboard
        power={power}
        list={list}
        onPlay={onPlay}
        onMouseup={onMouseup}
      />
      <Controller
        id={curMusic?.id}
        power={power}
        bank={bank}
        onChangePower={setPower}
        onChangeBank={setBank}
        onChangeVolume={value => {
          console.log(value)
          audioRef.current!.volume = value
        }}
      />
      <audio ref={audioRef}></audio>
    </div>
  )
}

export default App