import {createStackNavigator} from 'react-navigation-stack'; 
import { createAppContainer } from "react-navigation"; 
import Home from '../components/home'; 
import Question from '../components/question'

const screens = { Home: { screen: Home }, 
Question: { screen:Question }, 
 } 
 const HomeStack = createStackNavigator(screens); 
 
 export default createAppContainer(HomeStack);