import UserSchema from "../models/user.js";
import Message from "../models/message.js";

const create = async (req, res) => {
  try {
    const newMessage = new Message({
      text: req.body.text,
      owner: req.userId,
      recipient: req.body.recipeId,
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
      .populate("owner", "User") // Загрузить данные владельца (пользователя) сообщения
      .populate("recipient", "User") // Загрузить данные получателя сообщения
      .exec();

    res.json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить сообщение",
    });
  }
};

export { create, getMessage };
