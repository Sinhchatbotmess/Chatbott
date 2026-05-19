const login = require("ws3-fca");

let money = {};

login({
  email: "hackios100004@gmail.com",
  password: "Sinh290908"
},
(err, api) => {

  if (err) return console.log(err);

  console.log("✅ BOT ONLINE");

  api.listenMqtt((err, event) => {

    if (err) return console.log(err);
    if (!event.body) return;

    const msg = event.body.toLowerCase();
    const id = event.senderID;

    if (!money[id]) money[id] = 1000;

    if (msg == "/menu") {
      api.sendMessage(
`🎮 MENU GAME

💰 Tiền: ${money[id]}$

/taikhoan
/lammoi
/coin
/xucxac`,
        event.threadID
      );
    }

    if (msg == "/taikhoan") {
      api.sendMessage(
        `💵 Bạn có ${money[id]}$`,
        event.threadID
      );
    }

    if (msg == "/lammoi") {

      const earn = Math.floor(Math.random() * 500);

      money[id] += earn;

      api.sendMessage(
        `💸 Bạn nhận ${earn}$`,
        event.threadID
      );
    }

    if (msg == "/coin") {

      if (Math.random() < 0.5) {

        money[id] += 500;

        api.sendMessage(
          "🪙 WIN +500$",
          event.threadID
        );

      } else {

        money[id] -= 300;

        api.sendMessage(
          "💀 LOSE -300$",
          event.threadID
        );
      }
    }

    if (msg == "/xucxac") {

      const dice = Math.floor(Math.random() * 6) + 1;

      api.sendMessage(
        `🎲 Bạn lắc ra số ${dice}`,
        event.threadID
      );
    }

  });

});