export default (params, messageHandler) => {
  const ws = new WebSocket(`${process.env.API_SOCKET_BASE_URL}/?${params}`);

  let ping;

  ws.onopen = () => {
    ping = setInterval(() => {
      ws.send('ping');
    }, 60 * 1000);

    console.info('Соединение установлено.');
  };

  ws.onclose = event => {
    if (event.wasClean) {
      console.info('Соединение закрыто чисто');
    } else {
      console.info('Обрыв соединения'); // например, "убит" процесс сервера
    }

    clearInterval(ping);

    console.info(`Код: ${event.code} причина: ${event.reason}`);
  };

  ws.onmessage = messageHandler;

  ws.onerror = error => {
    clearInterval(ping);
    console.info('Ошибка', +error);
  };

  return ws;
};
