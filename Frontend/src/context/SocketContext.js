import React, { useContext, useEffect } from "react";
import { createContext } from "react";

import { AuthContext } from "../auth/AuthContext";
import { ChatContext } from "./chat/ChatContext";
import { useSocket } from "../hooks/useSocket";

import { types } from "../types/types";
import { scrollToBottomAnimated } from "../helpers/scrollToBottom";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { socket, online, conectarSocket, desconectarSocket } = useSocket(
        "https://backchat1.herokuapp.com"
    );
    const { auth } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        if (auth.logged) {
            conectarSocket();
        }
    }, [auth, conectarSocket]);

    useEffect(() => {
        if (!auth.logged) {
            desconectarSocket();
        }
    }, [auth, desconectarSocket]);

    // Escuchar los cambios en los usuarios conectados
    useEffect(() => {
        socket?.on("user-list", (users) => {
            dispatch({
                type: types.usuariosCargados,
                payload: users,
            });
        });
    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on("personal-message", (mensaje) => {
            console.log(mensaje);
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje,
            });

            scrollToBottomAnimated("mensajes");
        });
    }, [socket, dispatch]);

    return (
        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>
    );
};
