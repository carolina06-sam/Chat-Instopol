import { types } from "../../types/types";

// const initialState = {
//     uid: '',
//     activeChat: null, // UID del usuario al que yo quiero enviar messages
//     usuarios: [], // Todos los usuarios de la base datos
//     messages: [], // El chat seleccionado
// }

export const chatReducer = (state, action) => {
  //console.log(action);

  switch (action.type) {
    case types.cerrarSesion:
      return {
        uid: "",
        activeChat: null,
        users: [],
        messages: [],
      };

    case types.usuariosCargados:
      return {
        ...state,
        users: [...action.payload],
      };

    case types.activarChat:
      if (state.activeChat === action.payload) return state;

      return {
        ...state,
        activeChat: action.payload,
        messages: [],
      };

    case types.nuevoMensaje:
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }

    case types.cargarMensajes:
      return {
        ...state,
        messages: [...action.payload],
      };

    default:
      return state;
  }
};
