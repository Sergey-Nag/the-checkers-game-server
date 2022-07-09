import express, { Router } from 'express';
import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';
import Room from '../../models/Room';
import TGController from './TGController';
import CallbackData from './types/CallbackData';
import Command from './types/Command';
import { join } from 'path';
import InlineQuery from './types/InlineQuery';

const TOKEN = process.env.TG_TOKEN;

if (!TOKEN) throw new Error('TOKEN not provided');

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', (msg, _meta) => {
  if (msg.text && /^\//.test(msg.text)) return;

  bot.sendMessage(msg.chat.id, 'hello fellow');
});

bot.onText(/^\/(.+)/, (msg, match) => {
  if (!match) return;
  const command = match[1];
  const chatId = msg.chat.id;

  switch (command) {
    case Command.Start:
    case Command.Rooms:
      {
        const rooms = Room.rooms;
        if (rooms.length) {
          rooms.forEach((room) => {
            bot.sendMessage(
              chatId,
              ...TGController.getRoomMessage<SendMessageOptions>(room)
            );
          });

          return;
        }

        bot.sendMessage(chatId, ...TGController.getNoRoomsMessage());
      }
      break;
    case Command.Game: {
      const newRoom = new Room();

      bot.sendMessage(
        chatId,
        ...TGController.getRoomMessage<SendMessageOptions>(newRoom)
      );
      break;
    }
    case Command._TestApiBot: {
      bot.sendMessage(chatId, ...TGController.getTestMessage());
      break;
    }
  }
});

bot.on('callback_query', (q) => {
  if (!q.data) return;

  const query = q.data as CallbackData;
  const chatId = q.message?.chat.id;

  switch (query) {
    case CallbackData.CreateRoom: {
      if (!chatId || !q.message) return;
      new Room();
      bot.deleteMessage(chatId, q.message?.message_id.toString());

      Room.rooms.forEach((room) => {
        bot.sendMessage(
          chatId,
          ...TGController.getRoomMessage<SendMessageOptions>(room)
        );
      });

      break;
    }
    default: {
      console.log('def', q.data);
    }
  }
});

bot.on('inline_query', (q) => {
  const { query, id } = q;

  switch (query) {
    case InlineQuery.Game: {
      bot.answerInlineQuery(
        id,
        ...TGController.getAnswerOnInlineQueryMessage()
      );
      break;
    }
  }
});

bot.on('polling_error', (error) => {
  console.log(error);
});

const tgAppRouter = (
  host: string,
  wsHost: string,
  appEndpoint: string
): Router => {
  const tgRouter = Router();

  tgRouter.use(
    '/assets',
    express.static(
      join(__dirname, '../../../', 'public', 'tg-web-app', 'assets')
    )
  );
  tgRouter.use(
    '/',
    (req, res, next) => {
      console.log(req.url, req.header('host'), req.headers);
      next();
    },
    (req, res) => {
      res.render(
        join(__dirname, '../../../', 'public', 'tg-web-app', 'index.ejs'),
        { host, wsHost, appEndpoint }
      );
    }
  );

  return tgRouter;
};

export { tgAppRouter };
