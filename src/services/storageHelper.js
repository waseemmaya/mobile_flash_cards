import { AsyncStorage } from "react-native";

const DECKS = "DECKS";
const DECK = "DECK";

export const getDecks = async () => {
  try {
    let decks = await AsyncStorage.getItem(DECKS);
    if (!decks) {
      return [];
    }
    return JSON.parse(decks);
  } catch (error) {
    console.log("error: ", error);
    return [];
  }
};

export const getDeck = async (id) => {
  try {
    let decks = await getDecks();
    let currentDeck = decks.find((d) => d.title === id);
    console.log("currentDeck: ", currentDeck);
    return currentDeck;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};

// add new deck
export const saveDeckTitle = async (title) => {
  // 1- check if deck is already exist with given title
  let isExist = await getDeck(title);
  if (isExist) {
    console.log("already exist");
    return false;
  }
  let decks = await getDecks();
  let newDeck = {
    title,
    questions: [],
  };
  decks.push(newDeck);
  await setLocalStorage(DECKS, decks);
};

export const addCardToDeck = async (title, card) => {};

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
