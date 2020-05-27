import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Answer from './answer'
import AsyncStorage from '@react-native-community/async-storage';
export default class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [], // same like usestate
      currentQuestion: 0,
      score: 0,
      win:false
    }
    // Refer to FCC (binding) - module 2 revision
    this.answerPress = this.answerPress.bind(this);
  }
  //When Page loaded
  componentDidMount() {
    fetch('https://opentdb.com/api.php?amount=10&category=23&type=multiple')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        this.setState({
          questions: json['results'] //equivalent to setQuestion
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async answerPress(answer) {
    // DO logic - if else , increase the score if answer is correct


    if (answer == this.state.questions[this.state.currentQuestion].correct_answer) {
      // Increase the score
      this.setState({
        score: this.state.score + 1
      })
    }

    // When I reach last question == 9 , I will check the high score
    console.log('here is current question ')
    if (this.state.currentQuestion == 9) {
      console.log('arrived')
      try {
        const value = await AsyncStorage.getItem('highscore')
        if (value !== null) {
          console.log('old score score')
          console.log(value)

          // If there is a high score
          if (parseInt(value) < this.state.score) {
            // Save as high score
            try {
              await AsyncStorage.setItem('highscore', this.state.score.toString())
            } catch (e) {
              // saving error
              console.log(e)
            }
            this.setState({
              win:true
            });

          }
        }
        else {
          console.log('new score')
          //Scenario first time playing == no high score 
          // Save as new high score
          try {
            await AsyncStorage.setItem('highscore', this.state.score.toString())
          } catch (e) {
            // saving error
            console.log(e)
          }
        }
      } catch (e) {
        // error reading value
        console.log(e)
      }
    }

    // Increase the question number - > Move to next question
    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    })

  }
  render() {
    let message = "";
    if (this.state.win){
      message="Congratulation you win!!"
    }
    if (this.state.questions.length > 0) {
      if (this.state.currentQuestion < 10) {
        let currentQuestion = this.state.questions[this.state.currentQuestion]
        let options = this.shuffle(currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer))
        return (
          <View style={styles.container}>
            <Text style={{ fontSize: 20, marginBottom: 30, textAlign: "center" }}>{currentQuestion.question}</Text>
            {
              options.map(val => <Answer answer={val} answerPress={this.answerPress} />)
            }
          </View>
        );
      }
      else {
        return (
        <View style={styles.container}><Text style={{ fontSize: 20, marginBottom: 30, textAlign: "center" }}>
          Your score is : {this.state.score}. {message}</Text></View>
        )
      }
    }
    else {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});