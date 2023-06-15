import User from "../models/user.js";
import Message from "../models/message.js";

const loadMessages = async (req, res, next) => {
  const currentUser = req.userId;
  const selectedUser = req.body.selectedUser;
  try {
    const messages = await Message.find({
      $or: [
        { owner: currentUser, recipient: selectedUser },
        { owner: selectedUser, recipient: currentUser },
      ],
    })
      .populate("owner", "name") // Загрузить данные владельца (пользователя) сообщения
      .populate("recipient", "name") // Загрузить данные получателя сообщения
      .exec();

    res.send(messages);
  } catch (error) {
    console.log("Ошибка при загрузке сообщений:", error);
  }
};

const create = async (req, res) => {
  try {
    const newMessage = new Message({
      text: req.body.text,
      owner: req.userId,
      recipient: req.body.recipient,
    });

    const message = await newMessage.save();

    res.json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось сохранить сообщение",
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const userId = req.userId;

    // Найти сообщения, владельцем или получателем которых является пользователь
    const messages = await Message.find({
      $or: [{ owner: userId }, { recipient: userId }],
    })
      .populate({
        path: "owner",
        model: User,
        select: "name",
      })
      .populate({
        path: "recipient",
        model: User,
        select: "name",
      })
      .exec();

    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить сообщение",
    });
  }
};

export { create, getMessage, loadMessages };
