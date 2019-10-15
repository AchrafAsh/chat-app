import React, { Component } from "react";
import MessageList from "./components/MessageList";
import RoomList from "./components/RoomList";
import SendMessageForm from "./components/SendMessageForm";
import NewRoomForm from "./components/NewRoomForm";
import "./style.css";
import * as constants from "./constants";
import {
  TokenProvider,
  ChatManager
} from "@pusher/chatkit-client/react-native";

const userId = "perborgen";
const chatkitKeyApi = constants.KEY_API;
const instanceLocator = constants.INSTANCELOCATOR;
const tokenUrl = constants.TOKEN_URL;

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      joinedRooms: [],
      joinableRooms: []
    };
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator,
      userId,
      tokenProvider: new TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser
          .getJoinableRooms()
          .then(joinableRooms => {
            this.setState({
              joinableRooms,
              joinedRooms: this.currentUser.rooms
            });
          })
          .catch(err => console.log("error on joinable rooms", err));
        currentUser.subscribeToRoomMultipart({
          roomId: constants.ROOM_ID,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              });
            }
          }
        });
      })
      .catch(err => console.log("error on connecting", err));
  }

  sendMessage = text => {
    this.currentUser.sendMessage({
      text: text,
      roomId: constants.ROOM_ID
    });
  };

  render() {
    console.log(this.state.messages);
    return (
      <div className="app">
        <RoomList
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
