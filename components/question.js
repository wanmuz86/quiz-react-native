import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Answer from './answer'
export default class Question extends React.Component {
  constructor(){
  super();
  this.state = {
    questions: [], // same like usestate
    currentQuestion: 0,
    score: 0
  }
  // Refer to FCC (binding) - module 2 revision
  this.answerPress = this.answerPress.bind(this);
}
//When Page loaded
componentDidMount(){
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

answerPress(answer){
  console.log('pressed '+answer)
  // DO logic - if else , increase the score if answer is correct
  if (answer == this.state.questions[this.state.currentQuestion].correct_answer){
    // Increase the score
    this.setState({
      score: this.state.score+1
    })
  }
  console.log(this.state.score)

  // Increase the question number - > Move to next question
  this.setState({
    currentQuestion:this.state.currentQuestion+1
  })

}
render(){
  if(this.state.questions.length > 0){
    if (this.state.currentQuestion<10){
    let currentQuestion = this.state.questions[this.state.currentQuestion]
    let options = this.shuffle(currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer))
    return (
      <View style={styles.container}>
        <Text>{currentQuestion.question}</Text>
        {
          options.map(val => <Answer answer={val} answerPress={this.answerPress}/>)
        }
      </View>
      );
    }
    else {
      return (
      <View><Text>Your score is : {this.state.score}</Text></View>
      )
    }
    }
    else{
      return(
        <View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});