import React from "react";

const RoomList = props => {
  console.log(props.rooms);
  return (
    <div className="room-list">
      <ul>
        <h3>Your Rooms</h3>
        {props.rooms.map(room => {
          return (
            <li key={room.id} className="room">
              <a href="">{room.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RoomList;
