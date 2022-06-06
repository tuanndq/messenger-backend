const { createMsg } = require("./src/controllers/message.controller");
const Conversation = require("./src/models/Conversation");
const Message = require("./src/models/Message");
const User = require("./src/models/User");
const { default: mongoose } = require("mongoose");
const e = require("express");

const SocketServer = (socket) => {
  // Send and receive message
  // const getRooms = await clientRedis.lrange('listRooms', 0, -1);
  // socket.emit('show_rooms', getRooms);

  socket.on("join_room", async (room) => {
    // const foundRoom = getRooms.findIndex((data) => data === room);

    // if (foundRoom === -1) {
    //   socket.broadcast.emit('show_new_rooms', room);

    //   await clientRedis.lpush('listRooms', room);
    // }

    socket.join(room);

    // const getMessages = (await clientRedis.lrange(room, 0, -1)).map((e) => JSON.parse(e));

    // const getMessages = await Message.find({ room }).sort({ createdAt: -1 });

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
    // await clientRedis.lpush(roomName, JSON.stringify(data));

    const newMessage = new Message({
      conversationId: room,
      senderId: idUser,
      msgType: type,
      content: message,
      isDeleted: false,
    });

    await newMessage.save();

    const conversation = await Conversation.findOne();

    const mapMembers = conversation.members.map((e) => ({
      ...e,
      show: true,
    }));

    await Conversation.findOneAndUpdate(
      { _id: room },
      {
        members: mapMembers,
      },
      {
        new: true,
      }
    );

    socket.to(room).emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
};

module.exports = SocketServer;
