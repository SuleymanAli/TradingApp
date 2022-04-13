export default function Stream(url, subscribeParams = "", source = "polygon") {
  var ws = new WebSocket(url);
  var cb = () => {};

  if (subscribeParams) {
    ws.onopen = function() {
      if (source === "polygon") {
        ws.send(
          '{"action":"auth", "params":"yrCiFAvpCU41Sq6cN0FI2lj0nohWNqJy"}'
        );
      }
      if (subscribeParams.length > 0) {
        ws.send(`{"action":"subscribe", "params":"${subscribeParams}"}`);
      }
      // console.log("...");
    };
  }
  ws.onmessage = function(data) {
    try {
      data = JSON.parse(data.data);
      // console.log(data);
      cb(data);
    } catch (e) {
      console.log(e);
    }
  };
  return {
    set ontrades(val) {
      cb = val;
    },
    off() {
      ws.close(1000);
    }
  };
}
