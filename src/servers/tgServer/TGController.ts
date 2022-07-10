import TelegramBot, {
  InlineKeyboardMarkup,
  SendMessageOptions
} from 'node-telegram-bot-api';
import Room from '../../models/Room';
import CallbackData, { InlineCallbackData } from './types/CallbackData';

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
          reply_markup: TGController.getButtons(
            InlineCallbackData.RequestToJoin,
            room.id
          )
        }
      ],
      {
        is_personal: true,
        cache_time: 10,
        switch_pm_text: 'go',
        switch_pm_parameter: 'letsgo'
      }
    ];
  }

  static getButtons(
    type: CallbackData | InlineCallbackData,
    data?: any
  ): any | undefined {
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
    } else if (type === InlineCallbackData.RequestToJoin && data) {
      return {
        inline_keyboard: [
          [
            {
              text: 'Join',
              switch_inline_query_current_chat: data
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

  private static getRoomMessageText({ id, isAlive, players, board }: Room) {
    const status = isAlive ? '🟢' : '🔴';
    const whiteName = players.white ? players.white.name + ' ' : '';
    const blackName = players.black ? players.black.name + ' ' : '';

    return `
${status} Room id: \`${id}\`
    ⚪: ${whiteName}(${board.eatenFigures.white.length})
    ⚫: ${blackName}(${board.eatenFigures.black.length})
    `;
  }
}
