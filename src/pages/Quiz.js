import React, { Component } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator, Colors, Button } from "react-native-paper";
import NoQuestion from "../components/NoQuestion";
import { TouchableOpacity } from "react-native-gesture-handler";
import ShowResults from "../components/ShowResults";

export default class Quiz extends Component {
  state = {
    deck: null,
    showAnswer: false,
    currentQuestion: 0,
    correct: 0,
    showResults: false,
    incorrect: 0,
  };

  componentDidMount() {
    this.setQuiz();
  }

  setQuiz = () => {
    const deck = this.props.route.params;
    this.setState({
      deck,
      showResults: false,
    });
  };

  restartQuiz = () => {
    this.setState({
      deck: null,
      showAnswer: false,
      currentQuestion: 0,
      correct: 0,
      showResults: false,
      incorrect: 0,
    });
    this.setQuiz();
  };

  RenderProgres = () => {
    const { currentQuestion, deck } = this.state;
    let { questions } = deck;
    let total = questions.length;

    return (
      <View>
        <Text>
          Rendering question {currentQuestion + 1} / {total}
        </Text>
      </View>
    );
  };

  RenderQuestion = () => {
    const { deck, currentQuestion, showAnswer } = this.state;
    let { questions } = deck;
    let question = questions[currentQuestion].question;
    let answer = questions[currentQuestion].answer;

    return (
      <View>
        <Text>Question: {question}</Text>
        <TouchableOpacity
          onPress={() => this.setState({ showAnswer: !this.state.showAnswer })}
        >
          <Text>{showAnswer ? answer : "Show Answer"}</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          color="red"
          onPress={() => {
            const { deck, currentQuestion } = this.state;
            console.log("deck.questions.length: ", deck.questions.length);
            console.log("currentQuestion + 1: ", currentQuestion + 1);
            if (deck.questions.length === currentQuestion + 1) {
              this.setState({
                incorrect: ++this.state.incorrect,

                showResults: true,
              });
              return;
            }
            this.setState({
              incorrect: ++this.state.incorrect,
              currentQuestion: ++this.state.currentQuestion,
            });
          }}
        >
          Incorrect
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            const { deck, currentQuestion } = this.state;
            if (deck.questions.length === currentQuestion + 1) {
              this.setState({
                showResults: true,
                correct: ++this.state.correct,
              });
              return;
            }
            this.setState({
              correct: ++this.state.correct,
              currentQuestion: ++this.state.currentQuestion,
            });
          }}
        >
          Correct
        </Button>
      </View>
    );
  };

  render() {
    const { deck, showResults } = this.state;

    if (showResults) {
      return (
        <ShowResults
          {...this.props}
          state={this.state}
          restartQuiz={this.restartQuiz}
        />
      );
    }

    if (!deck) {
      return (
        <ActivityIndicator
          style={{ marginTop: 50 }}
          animating={true}
          color={Colors.red800}
        />
      );
    }
    let { questions } = deck;

    if (questions.length === 0) {
      return <NoQuestion />;
    }

    return (
      <View>
        {this.RenderProgres()}
        {this.RenderQuestion()}
      </View>
    );
  }
}
