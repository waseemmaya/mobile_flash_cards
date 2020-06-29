import { AsyncStorage } from "react-native";

const DECKS = "DECKS";
let lastAttemptedDate = "lastAttemptedDate";

export const getLastAttempted = async () => {
  try {
    return await AsyncStorage.getItem(lastAttemptedDate);
  } catch (error) {
    return null;
  }
};

export const removeLastDate = async () => {
  try {
    await AsyncStorage.removeItem(lastAttemptedDate);
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getDecks = async () => {
  try {
    let decks = await AsyncStorage.getItem(DECKS);
    if (!decks) {
      return [];
    }
    return JSON.parse(decks);
  } catch (error) {
    return [];
  }
};

export const getDeck = async (id) => {
  try {
    let decks = await getDecks();
    let currentDeck = decks.find((d) => d.title === id);

    return currentDeck;
  } catch (error) {
    return null;
  }
};

export const deleteDeck = async (id) => {
  let decks = await getDecks();
  let remainingDecks = decks.filter((d) => d.title !== id);
  await setLocalStorage(DECKS, remainingDecks);
};

// add new deck
export const saveDeckTitle = async (title) => {
  // 1- check if deck is already exist with given title
  let isExist = await getDeck(title);
  if (isExist) {
    return false;
  }
  let decks = await getDecks();
  let newDeck = {
    title,
    questions: [],
    createdAt: new Date(),
  };
  decks.push(newDeck);
  await setLocalStorage(DECKS, decks);
};

export const addCardToDeck = async (question, answer, title) => {
  let newQuestion = {
    question,
    answer,
  };
  let currentDeck = await getDeck(title);
  let oldQuestions = [...currentDeck.questions];
  oldQuestions.push(newQuestion);
  currentDeck.questions = oldQuestions;
  currentDeck.createdAt = new Date();
  let allDecks = await getDecks();
  allDecks = allDecks.filter((d) => d.title !== title);
  allDecks.push(currentDeck);
  await setLocalStorage(DECKS, allDecks);
};

export const setLocalStorage = async (key, value) =>
  await AsyncStorage.setItem(key, JSON.stringify(value));

// {
//     React: {
//       title: 'React',
//       questions: [
//         {
//           question: 'What is React?',
//           answer: 'A library for managing user interfaces'
//         },
//         {
//           question: 'Where do you make Ajax requests in React?',
//           answer: 'The componentDidMount lifecycle event'
//         }
//       ]
//     },
//     JavaScript: {
//       title: 'JavaScript',
//       questions: [
//         {
//           question: 'What is a closure?',
//           answer: 'The combination of a function and the lexical environment within which that function was declared.'
//         }
//       ]
//     }
//   }
