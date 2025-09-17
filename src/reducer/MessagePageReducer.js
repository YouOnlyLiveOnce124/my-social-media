const add_my_message = "ADD-MY-MESSAGE";
const get_symbol_for_add_message = "GET-SYMBOL-FOR-ADD-MY-MESSAGE";

let initialState = {
  messages: [
    { id: 1, message: "hello" },
    { id: 2, message: "no, no, no" },
    { id: 3, message: "How are yoy?" },
    { id: 4, message: "I'd kill you motherfucker" },
  ],
  myMessage: [
    { id: 1, message: "It's me - Mario" },
    { id: 2, message: "Where is my princess?" },
    { id: 3, message: "You are bustard!" },
    { id: 4, message: "Sorry for that" },
  ],
  friends: [
    {
      src:
        "https://avatars.fastly.steamstatic.com/56b8469a229eea8ce274e021bbd36ffa15f5e370_full.jpg",
      name: "Billy",
      path: "1",
      id: 1,
    },
    {
      src: "https://i1.sndcdn.com/avatars-000969716179-qch1v0-t500x500.jpg",
      name: "Michael",
      path: "2",
      id: 2,
    },
    {
      src:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcKoCT_4-J6JH_DXeUjcXHfnzzSNO00yI1g&s",
      name: "Andrew",
      path: "3",
      id: 3,
    },
    {
      src: "https://i1.sndcdn.com/avatars-P4gz3hubRa36tWEs-QTxJGQ-t240x240.jpg",
      name: "John",
      path: "4",
      id: 4,
    },
  ],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case add_my_message:
      return {
        ...state,
        myMessage: [
          ...state.myMessage,
          { id: state.myMessage.length + 1, message: action.sendMessage },
        ],
      };
    case get_symbol_for_add_message:
      return {
        ...state,
        sendMessage: action.newText,
        see() {
          console.log(this.sendMessage);
        },
      };

    default:
      return state;
  }
};

export const addMyMessage = (sendMessage) => ({
  type: add_my_message,
  sendMessage,
});

export const getSymbolForAddMyMessage = (text) => ({
  type: get_symbol_for_add_message,
  newText: text,
});

export default messageReducer;
