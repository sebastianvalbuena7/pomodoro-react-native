import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { currentTimeEnum } from "../../App"

const options: string[] = ["Pomodoro", "Short Break", "Long Break"]

interface Props {
    time: number,
    setTime: Function
    currentTime: any,
    setCurrentTime: Function,
}

export const Header: React.FC<Props> = ({ time, currentTime, setCurrentTime, setTime }) => {

    const handlePress = (index:number) => {
        const newTime = index === 0 ? 25 : index === 1 ? 5 : 15
        setCurrentTime(index)
        setTime(newTime * 60)
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {options.map((option, index) => (
                <TouchableOpacity key={index} style={[styles.itemStyle, currentTime !== index && { borderColor: 'transparent' }]} onPress={() => handlePress(index)}>
                    <Text style={{ fontWeight: 'bold' }}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    itemStyle: {
        width: '33%',
        borderWidth: 3,
        padding: 5,
        borderColor: 'white',
        marginVertical: 20,
        borderRadius: 20,
        alignItems: 'center'
    }
})
