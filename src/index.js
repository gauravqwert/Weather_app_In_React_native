import { View, Text,StyleSheet,Alert,ActivityIndicator } from 'react-native'
import React,{useEffect,useState} from 'react'
import Constants from 'expo-constants'
import WeatherInfo from './WeatherInfo'

const API_KEYS ='Your Api Key';
const Weather = () => {

    const [weatherData , setWeatherData] = useState(null);
    const [loaded,setLoaded] = useState(false);

    // add a function to fetch the weather data

    const fetchWeatherData = async (cityName) => {
        try {
            setLoaded(false);
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEYS}&units=metric`);

            if(response.status == 200){
                const data = await response.json();
                setWeatherData(data);
            }
            else{
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
             Alert.alert("Error",error.message);
        }
    }

    // remember my city name
    useEffect(() => {
        fetchWeatherData('Ahmedabad');
    },[]);

    // if the data is not loaded show a loading message

    if(!loaded){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red"/>
            </View>
        )
    }
  return (
    <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.headerTitle}>Weather App</Text>
         </View>
         <WeatherInfo weatherData ={weatherData}  fetchWeatherData={fetchWeatherData}/>
    </View>
  )
}

export default Weather


const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#FCF5DB',
        paddingTop: Constants.statusBarHeight,
    },
    header:{
        alignItems:"center",
        backgroundColor:'#C5D2EF',
        height:80,
        justifyContent: 'center',
    },
    headerTitle:{
        fontSize:30,
        fontWeight:'bold',
    }
})