import React, { useContext } from "react";

import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken } from "../helpers/fetch";
import { scrollToBottom } from "../helpers/scrollToBottom";

import { types } from "../types/types";

export const SidebarChatItem = ({ user }) => {
  //console.log(user);
  const { chatState, dispatch } = useContext(ChatContext);
  const { activeChat } = chatState;

  const onClick = async () => {
    dispatch({
      type: types.activarChat,
      payload: user.uid,
    });

    // Cargar los mensajes del chat
    const resp = await fetchConToken(`messages/${user.uid}`);
    console.log(resp);
    dispatch({
      type: types.cargarMensajes,
      payload: resp.messages,
    });

    scrollToBottom("mensajes");
  };

  return (
    <div
      className={`chat_list ${user.uid === activeChat && "active_chat"}`}
      onClick={onClick}
    >
      {/* active_chat */}
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://p.kindpng.com/picc/s/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5 style={{ fontWeight: "500" }}> {user.name}</h5>
          <p>{user.position}</p>
          {user.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};
