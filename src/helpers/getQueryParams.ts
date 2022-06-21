import { RoomQueryParams } from '../types/RoomQueryParams';

const getRoomQueryParams = (url: string): RoomQueryParams => {
  const params = new URLSearchParams(url.slice(1));
  const roomId = params.get('roomId');
  const userName = params.get('userName');

  if (!roomId || !userName) throw 'No params';

  return { roomId, userName };
};

export { getRoomQueryParams };
