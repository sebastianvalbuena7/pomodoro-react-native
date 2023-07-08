import { StyleSheet, Text, View, Platform, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { Header } from './src/components/Header'
import { Timer } from './src/components/Timer'
import { Audio } from 'expo-av'

const colors = ['#F7DC6F', '#A2D9CE', '#D7BDE2']

export enum currentTimeEnum {
  'POMO',
  'SHORT',
  'BREAK'
}

export default function App() {
  const [isWorking, setIsWorking] = useState<boolean>(false)
  const [time, setTime] = useState<number>(25 * 60)
  const [currentTime, setCurrentTime] = useState<currentTimeEnum>(currentTimeEnum.POMO)
  const [isActive, setIsActive] = useState<boolean>(false)

  useEffect(() => {
    let interval: any = null

    if (isActive) {
      interval = setInterval(() => setTime(time - 1), 1000)
    } else {
      clearInterval(interval)
    }

    if (time === 0) {
      setIsActive(false)
      setIsWorking(prev => !prev)
      setTime(isWorking ? 300 : 1500)
    }

    return () => clearInterval(interval)
  }, [isActive, time])


  const handleStartStop = () => {
    playSound()
    setIsActive(!isActive)
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/clic.mp3')
    )

    await sound.playAsync()
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors[currentTime] }]}>
      <View style={styles.viewPackage}>
        <Text style={styles.title}>Pomodoro</Text>
        <Header time={time} currentTime={currentTime} setCurrentTime={setCurrentTime} setTime={setTime} />
        <Timer time={time} />
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>{isActive ? 'STOP' : 'START'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#333333',
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  viewPackage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 0
  }
})