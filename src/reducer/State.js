import messageReducer from "./MessagePageReducer";
import profileReducer from "./ProfilePageReducer";

let mainStore = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you", likes: "99" },
        { id: 2, message: "Popka durak", likes: "22" },
        { id: 3, message: "Xua sebe", likes: "13" },
      ],
      resArrSymbl: " ",
    },

    messagesPage: {
      messages: [
        { id: 5, message: "hello" },
        { id: 6, message: "no, no, no" },
        { id: 7, message: "How are yoy?" },
        { id: 8, message: "I'd kill you motherfucker" },
      ],
      myMessage: [
        { id: 13, message: "It's me - Mario" },
        { id: 14, message: "Where is my princess?" },
        { id: 15, message: "You are bustard!" },
        { id: 16, message: "Sorry for that" },
      ],
      friends: [
        {
          src:
            "https://avatars.fastly.steamstatic.com/56b8469a229eea8ce274e021bbd36ffa15f5e370_full.jpg",
          name: "Billy",
          path: "1",
        },
        {
          src: "https://i1.sndcdn.com/avatars-000969716179-qch1v0-t500x500.jpg",
          name: "Michael",
          path: "2",
        },
        {
          src:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcKoCT_4-J6JH_DXeUjcXHfnzzSNO00yI1g&s",
          name: "Andrew",
          path: "3",
        },
        {
          src:
            "https://i1.sndcdn.com/avatars-P4gz3hubRa36tWEs-QTxJGQ-t240x240.jpg",
          name: "John",
          path: "4",
        },
      ],
      sendMessage: "",
    },
  },
  // не меняют состояние объекта
  getState() {
    return this._state;
  },
  // В файле index я сначала сделал импорт данного mainStore, запускаю метод, субскрайб , аргументом использую рендренТхри,
  // и теперь _callSubscriber уже является функцией renderTree, и каждый вызов _callSub.. на самом деле рисует страничку
  subscribe(observer) {
    this._callSubscriber = observer;
  },
  _callSubscriber() {
    console.log("state is changed");
  },
  // не меняют состояние объекта
  // --------------- для ПОСТОВ ---------------------
  _getSymbol(text) {
    this._state.profilePage.resArrSymbl = text;
    console.log(this._state.profilePage.resArrSymbl);
    this._callSubscriber(this._state);
  },

  _addPost() {
    let newPost = {
      id: 55,
      message: this._state.profilePage.resArrSymbl,
      likes: 0,
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.resArrSymbl = "";
    this._callSubscriber(this._state);
  },

  // --------------- для ПОСТОВ ---------------------

  // --------------- для СООБЩЕНИЙ ---------------------
  _getSymbolForAddMessage(text) {
    this._state.messagesPage.sendMessage = text;
    console.log(this._state.messagesPage.sendMessage);
    this._callSubscriber(this._state);
  },

  _addMyMessage() {
    let newMyMessage = {
      message: this._state.messagesPage.sendMessage,
    };
    this._state.messagesPage.myMessage.push(newMyMessage);
    this._state.messagesPage.sendMessage = "";
    this._callSubscriber(this._state);
  },
  // --------------- для СООБЩЕНИЙ ---------------------

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = messageReducer(this._state.messagesPage, action);
    this._callSubscriber(this._state);
    // //----------------- запуск для публикации постов -------------------
    // if (action.type === add_post) {
    //   let newPost = {
    //     id: 55,
    //     message: this._state.profilePage.resArrSymbl,
    //     likes: 0,
    //   };
    //   this._state.profilePage.posts.push(newPost);
    //   this._state.profilePage.resArrSymbl = "";
    //   this._callSubscriber(this._state);
    // } else if (action.type === get_symbol) {
    //   this._state.profilePage.resArrSymbl = action.newText;
    //   console.log(this._state.profilePage.resArrSymbl);
    //   this._callSubscriber(this._state);
    // } //----------------- запуск для публикации постов -------------------
    // //----------------- запуск для публикации сообщений -------------------
    // else if (action.type === add_my_message) {
    //   let newMyMessage = {
    //     message: this._state.messagesPage.sendMessage,
    //   };
    //   this._state.messagesPage.myMessage.push(newMyMessage);
    //   this._state.messagesPage.sendMessage = "";
    //   this._callSubscriber(this._state);
    // } else if (action.type === get_symbol_for_add_message) {
    //   this._state.messagesPage.sendMessage = action.newText;
    //   console.log(this._state.messagesPage.sendMessage);
    //   this._callSubscriber(this._state);
    // } //----------------- запуск для публикации сообщений -------------------
  },
};

export { mainStore };
