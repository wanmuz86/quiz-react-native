import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Answer from './answer';
// Definition of a Component defined as a class
export default class Question extends React.Component {

    constructor() {
        super();
        this.state = {
            questions: [], // const [questions,setQuestions] = useState([])
            currentQuestion: 0,
            score: 0
        }
    }
    // When the page loaded
    componentDidMount() {
        fetch('https://opentdb.com/api.php?amount=10&category=18')
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.setState({
                    questions: json["results"] // equivalent to setQuestions
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.questions.length > 0) {
            let currentQuestion = this.state.questions[this.state.currentQuestion]
            let options = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer)
            return (
                <View style={styles.container}>
                    <Text>{currentQuestion.question}</Text>
                    {
                        options.map(val=> <Answer answer={val}/>)
                    }
                   
                </View>

            );
        }
        else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
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
