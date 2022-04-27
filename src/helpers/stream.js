export default function Stream(
  url = "wss://polyfeed.polygon.io/stocks",
  subscribeParams = "",
  source = "polygon"
) {
  // 1.Connect To WSS
  var ws = new WebSocket(url);
  var cb = () => {};

  // 2.Source And Subscribe Channel
  if (subscribeParams) {
    ws.onopen = function () {
      if (source === "polygon") {
        ws.send(
          '{"action":"auth", "params":"yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy"}'
        );
      }
      if (subscribeParams.length > 0) {
        ws.send(`{"action":"subscribe", "params":"${subscribeParams}"}`);
      }
    };
  }

  // 3.Collect Data
  ws.onmessage = function (data) {
    try {
      data = JSON.parse(data.data);
      // console.log(data);
      cb(data);
    } catch (e) {
      // console.log(e);
    }
  };

  // 4. Subscribe
  var subscribe = (subscribeParams) => {
    ws.onopen = function () {
      ws.send('{"action":"auth", "params":"yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy"}');
      ws.send(`{"action":"subscribe", "params":"${subscribeParams}"}`);
    };
  };

  // 4. UnSubscribe
  var unsubscribe = (unsubscribeParams) => {
    ws.onopen = function () {
      ws.send('{"action":"auth", "params":"yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy"}');
      ws.send(`{"action":"unsubscribe", "params":"${unsubscribeParams}"}`);
    };
  };

  var sendSubscriptions = ( subscription ) => {
    ws.send(`{"action":"subscribe","params":"${subscription}"}`)
  };

  var sendUnSubscriptions = ( subscription ) => {
    ws.send(`{"action":"unsubscribe","params":"${subscription}"}`)
  }

  // 5.Result
  return {
    set ontrades(val) {
      cb = val;
    },
    unsubscribe,
    subscribe,
    sendSubscriptions,
    sendUnSubscriptions,
    off() {
      ws.close(1000);
    },
  };
}
