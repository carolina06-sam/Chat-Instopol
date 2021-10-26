const {
  userConnect,
  userDisconnect,
  getUsers,
  saveMessage,
} = require("../controllers/sockets");
const { comprobateJWR } = require("../helpers/jwt");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      const [valide, uid] = comprobateJWR(socket.handshake.query["x-token"]);

      if (!valide) {
        console.log("socket no identificado");
        return socket.disconnect();
      }

      console.log("cliente conectado");
      await userConnect(uid);

      // Unir al usuario a una sala de socket.io
      socket.join(uid);

      //Si el token no es válido, desconectar

      //Saber cuál usuario está activo mediuante el uid

      //Emitir todos los usuarios conectados
      this.io.emit("user-list", await getUsers());

      //Socket join, uid

      //Escuchar cuando el cliente envía un mensaje
      socket.on("personal-message", async (payload) => {
        console.log(payload);
        const message = await saveMessage(payload);
        this.io.to(payload.to).emit("personal-message", message);
        this.io.to(payload.from).emit("personal-message", message);
      });

      // Disconnect
      //Marcar en la DB que el usuario se desconectó
      //Emitir todos los usuarios conectados
      socket.on("disconnect", async () => {
        await userDisconnect(uid);
        this.io.emit("user-list", await getUsers());
      });
    });
  }
}

module.exports = Sockets;
