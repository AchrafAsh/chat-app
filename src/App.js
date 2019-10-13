import React, { Component } from "react";
import MessageList from "./components/MessageList";
import RoomList from "./components/RoomList";
import SendMessageForm from "./components/SendMessageForm";
import NewRoomForm from "./components/NewRoomForm";
import "./style.css";

import {
  TokenProvider,
  ChatManager
} from "@pusher/chatkit-client/react-native";

const userId = "perborgen";
// const chatkitKeyApi = "282a4ee1-ea6f-428c-8095-a49ee783f478:MWgL6ngwT7tc3iNMzXBr/QuTzTV9EXwM72qntxsHo1U=";
const instanceLocator = "v1:us1:37bcdde8-4220-43fd-b301-7bbca64f2d15";
const tokenUrl =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/37bcdde8-4220-43fd-b301-7bbca64f2d15/token";

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
          roomId: "f9086dd7-7544-43b9-8d5d-a38298d3c742",
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
      roomId: "f9086dd7-7544-43b9-8d5d-a38298d3c742"
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
