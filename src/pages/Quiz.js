import React, { Component } from "react";
import { Text, View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import NoQuestion from "../components/NoQuestion";
import ShowResults from "../components/ShowResults";
import QuizCount from "../components/QuizCount";
import QuestionCard from "../components/QuestionCard";
import { setLocalStorage } from "../services/storageHelper";
import { getFullDate } from "../services/dateHelper";
import {
  clearLocalNotification,
  initNotification,
} from "../services/notifications";

let lastAttemptedDate = "lastAttemptedDate";

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

  render() {
    const { deck, showResults, currentQuestion, showAnswer } = this.state;

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

    let total = questions.length;

    let question = questions[currentQuestion].question;
    let answer = questions[currentQuestion].answer;

    let questionCardProps = {
      toggleAnswer: this.toggleAnswer,
      answer,
      showAnswer,
      question,
      handleCorrect: this.handleCorrect,
      handleInCorrect: this.handleInCorrect,
    };
    return (
      <View style={{ flex: 1 }}>
        <QuizCount current={currentQuestion} total={total} />
        <QuestionCard {...questionCardProps} />

        {/* {this.RenderQuestion()} */}
      </View>
    );
  }

  toggleAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };

  handleCorrect = async () => {
    const { deck, currentQuestion } = this.state;
    if (deck.questions.length === currentQuestion + 1) {
      await clearLocalNotification().then(initNotification);
      await setLocalStorage(lastAttemptedDate, getFullDate(new Date()));

      this.setState({
        showResults: true,
        correct: ++this.state.correct,
      });
      return;
    }
    this.setState({
      correct: ++this.state.correct,
      currentQuestion: ++this.state.currentQuestion,
      showAnswer: false,
    });
  };

  handleInCorrect = async () => {
    const { deck, currentQuestion } = this.state;
    if (deck.questions.length === currentQuestion + 1) {
      await clearLocalNotification().then(initNotification);
      await setLocalStorage(lastAttemptedDate, getFullDate(new Date()));
      this.setState({
        incorrect: ++this.state.incorrect,
        showResults: true,
      });
      return;
    }
    this.setState({
      incorrect: ++this.state.incorrect,
      currentQuestion: ++this.state.currentQuestion,
      showAnswer: false,
    });
  };
}
