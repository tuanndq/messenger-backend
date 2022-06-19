const Conversation = require("./src/models/Conversation");
const Message = require("./src/models/Message");
const { default: mongoose } = require("mongoose");

const SocketServer = (socket, users) => {
  socket.on(
    "video-call-start",
    ({ senderId, receiverId, chatBoxId, offer, isVideoCall }) => {
      const socketReceiver = users.find(
        (e) => e.userId === receiverId
      ).socketId;
      socket.to(socketReceiver).emit("video-call-start", {
        senderId,
        receiverId,
        chatBoxId,
        offer,
        isVideoCall,
      });
    }
  );

  socket.on("video-call-stop", ({ senderId, receiverId, chatBoxId }) => {
    const socketReceiver = users.find((e) => e.userId === receiverId).socketId;
    socket.to(socketReceiver).emit("video-call-stop", {
      senderId,
      receiverId,
      chatBoxId,
    });
  });

  socket.on("video-call-answer", ({ senderId, receiverId, payload }) => {
    const socketReceiver = users.find((e) => e.userId === receiverId).socketId;
    socket.to(socketReceiver).emit("video-call-answer", {
      senderId,
      receiverId,
      answer: payload,
    });
  });

  socket.on("video-call-candidate", ({ senderId, receiverId, payload }) => {
    const socketReceiver = users.find((e) => e.userId === receiverId).socketId;
    socket.to(socketReceiver).emit("video-call-candidate", {
      senderId,
      receiverId,
      candidate: payload,
    });
  });

  socket.on("video-call-media-active", ({ receiverId, mic, camera }) => {
    const socketReceiver = users.find((e) => e.userId === receiverId).socketId;
    socket.to(socketReceiver).emit("video-call-media-active", {
      mic,
      camera,
    });
  });

  socket.on("join_room", async (room) => {
    socket.join(room);

    const messages = await Message.aggregate([
      {
        $match: {
          conversationId: mongoose.Types.ObjectId(room),
        },
      },
      {
        $lookup: {
          from: "conversations",
          localField: "conversationId",
          foreignField: "_id",
          as: "conversation",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);

    const mapGetMessages = messages.map((e) => ({
      room: e.conversationId,
      userName: e.users[0].firstName,
      idUser: e.senderId,
      avatar: e.users[0].avatar,
      type: e.msgType,
      message: e.content,
      time: e.createAt,
    }));

    socket.emit("receive_message", mapGetMessages);
  });

  socket.on("send_message", async ({ messageData: data, currentCon }) => {
    const { room, userName, idUser, type, message } = data;

    const newMessage = new Message({
      conversationId: room,
      senderId: idUser,
      msgType: type,
      content: message,
      isDeleted: false,
    });

    await newMessage.save();

    await Conversation.findOne({ _id: room }).then((doc) => {
      const mapMembers = doc.members.map((e) => ({
        ...e,
        show: true,
      }));

      doc.members = mapMembers;

      doc.save();
    });

    socket.broadcast.emit("last_message", data);

    socket.to(room).emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
};

module.exports = SocketServer;
