import TelegramBot, {
  InlineKeyboardMarkup,
  SendMessageOptions
} from 'node-telegram-bot-api';
import Room from '../../models/Room';
import CallbackData from './types/CallbackData';

const WEB_APP_HOST = `https://${process.env.HOST}/tg-web-app`;

export default class TGController {
  static getAnswerOnInlineQueryMessage(): [
    TelegramBot.InlineQueryResult[],
    TelegramBot.AnswerInlineQueryOptions
  ] {
    const room = new Room();

    return [
      [
        {
          id: 'createGameRoom',
          type: 'article',
          title: 'Start game',
          description: 'Create a new checkers room',
          input_message_content: {
            message_text: 'Start game'
          },
          reply_markup: TGController.getButtons(CallbackData.JoinRoom, room.id)
        }
      ],
      {
        is_personal: true,
        cache_time: 10
      }
    ];
  }

  static getButtons(type: CallbackData, data?: any): any | undefined {
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
      this.getRoomMessageText(room),
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

  private static getRoomMessageText({ id, isAlive, playersArr, board }: Room) {
    const status = isAlive ? '🟢' : '🔴';

    return `
${status} Room id: \`${id}\`
    Players: ${playersArr.filter((p) => !!p).length}
    ⚪: ${board.eatenFigures.white.length}
    ⚫: ${board.eatenFigures.black.length}
    `;
  }
}
