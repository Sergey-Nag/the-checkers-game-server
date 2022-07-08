import {
  InlineKeyboardMarkup,
  SendMessageOptions
} from 'node-telegram-bot-api';
import Room from '../../models/Room';
import CallbackData from './types/CallbackData';

const WEB_APP_HOST = `https://${process.env.HOST}/tg-web-app`;

export default class TGController {
  static connections: TGController[] = [];

  private static getButtons(type: CallbackData, data?: any): any | undefined {
    if (type === CallbackData.CreateRoom) {
      return {
        inline_keyboard: [
          [
            {
              text: 'Create room',
              callback_data: CallbackData.CreateRoom
            }
          ]
        ]
      };
    } else if (type === CallbackData.JoinRoom && data) {
      return {
        inline_keyboard: [
          [
            {
              text: 'Join room',
              web_app: {
                url: `${WEB_APP_HOST}/game/${data}`
              }
            }
          ]
        ]
      };
    }
  }

  static getRoomMessage<T extends SendMessageOptions | InlineKeyboardMarkup>(
    room: Room
  ): [string, T | undefined] {
    return [
      `Players ${room.playersArr.filter((p) => !!p).length}`,
      {
        parse_mode: 'Markdown',
        reply_markup: this.getButtons(CallbackData.JoinRoom, room.id)
      } as T
    ];
  }

  static getTestMessage(): [string, SendMessageOptions] {
    return [
      '`Test telegram web app api`',
      {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Go to test',
                web_app: {
                  url: `${WEB_APP_HOST}/tg-test`
                }
              }
            ]
          ]
        }
      }
    ];
  }

  static getNoRoomsMessage(): [string, SendMessageOptions] {
    return [
      '*No rooms*',
      {
        parse_mode: 'Markdown',
        reply_markup: this.getButtons(CallbackData.CreateRoom)
      }
    ];
  }
}
