const axios = require("axios");
const { login } = require("ws3-fca");
const fs = require("fs");

let lastMessageTime = {};
let money = {};

function saveMoney() {
  fs.writeFileSync(
    "money.json",
    JSON.stringify(money, null, 2)
  );
}

if (fs.existsSync("money.json")) {
   money = JSON.parse(fs.readFileSync("money.json"));
}

login({email:"tranhalinh2122232425@gmail.com",password:"Sinh290908"}, (err, api) => {

 api.listenMqtt((err, event) => {

   if (!event || !event.body) return;

   console.log(event.body);

   if (event.body == "/ping") {

     api.sendMessage(
       "pong 🏓",
       event.threadID
     );

   }

 if (event.body.startsWith("/AI ")) {

const question = event.body.slice(4);

api.sendMessage("🔎 Đang tìm kiếm...", event.threadID);

axios.get(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(question)}&owner=Sinh&botname=Trợ lý AI`)
.then(res => {

api.sendMessage(
`🤖 AI trả lời:\n${res.data.response}`,
event.threadID
);

})
.catch(err => {

console.log(err);

api.sendMessage(
"❌ AI lỗi hoặc API chết",
event.threadID
);

});

}

const badWords = ["ngu", "con chó", "đần", "cút", "cm", "cái buồi", "Đ", "đ", "ngáo", "dit con cu may", "lm"];

if (event.body) {

const msg = event.body.toLowerCase();

for (const word of badWords) {

if (msg.includes(word)) {

api.sendMessage(
`⚠️ ${event.senderID}, vui lòng không dùng từ ngữ bị cấm!`,
event.threadID
);

break;
}

}

}

   if (event.body == "/admin1") {

   api.sendMessage(
      "👑 Chúc mừng! Bạn vừa được thăng làm admin tưởng tượng",
      event.threadID
   );

}
if (event.body == "/crush") {
   api.sendMessage("💘 crush thích bạn rồi đó", event.threadID);
}

if (event.body == "Captain") {
  api.sendMessage("Captain là Nguyễn Thành Nhân🐶", event.threadID);
}

if (event.body.startsWith("/admin ")) {

  let name = event.body.slice(7);

  api.sendMessage(
    `👑 Chúc mừng, ${name} đã được thăng làm Captain ảo tưởng!`,
    event.threadID
  );

}

if (event.body == "Phó Captain") {
  api.sendMessage("Captain là Nguyên Dú Ấn Đụ🐶", event.threadID);
}
   // MENU
   if (event.body == "/menu") {

      api.sendMessage(
`🎮 MENU BOT 🎮

💰 KINH TẾ
/sodu → xem số dư
/taixiu → chơi tài xỉu

🎲 Bói Tình Yêu
/Bói → % bên nhau

🎲 Oẳn tù tì 
/ott → hên xui

🎰 JACKPOT
/slot "🍎", "🍌", "🍇", "💎", "7️⃣" (1 trong 5 cái này)

🧠TEST IQ
/iq -> Số IQ của bạn

🎲 XÚC XẮC CỜ BẠC
/xx -> chọn số 1-6

🐟 CÂU CÁ KIẾM TIỀN 
/fish -> câu cá

⛏️ ĐÀO VÀNG KIẾM LÚA 
/mine -> đào vàng 

⚔️ ĐẤU BOSS KIẾM TIỀN
/boss -> đánh boss

🐉 BẮT POKEMON
/pokemon -> bắt pokemon

🕒 NGÀY GIỜ HIỆN TẠI
/gio -> là ra

🤖 BOT ONLINE`,
         event.threadID
      );
   }

if (event.body == "/fish") {

const fish = [
"🐟 Cá rô",
"🐠 Cá vàng",
"🦈 Cá mập",
"🐡 Cá nóc",
"🦑 Mực"
];

const reward = Math.floor(Math.random() * 500000) + 10000;

const randomFish = fish[Math.floor(Math.random() * fish.length)];

if (!money[event.senderID]) {
money[event.senderID] = 10000000;
}

money[event.senderID] += reward;

saveMoney();

api.sendMessage(
`🎣 Bạn câu được ${randomFish}
💰 +${reward.toLocaleString()}đ`,
event.threadID
);

}

if (event.body == "/mine") {

const reward = Math.floor(Math.random() * 1000000) + 50000;

if (!money[event.senderID]) {
money[event.senderID] = 10000000;
}

money[event.senderID] += reward;

saveMoney();

api.sendMessage(
`⛏️ Bạn đào được vàng!
💰 +${reward.toLocaleString()}đ`,
event.threadID
);

}

if (event.body == "/boss") {

const hp = Math.floor(Math.random() * 100) + 1;

if (!money[event.senderID]) {
money[event.senderID] = 10000000;

}

if (hp >= 50) {

const reward = 1000000;

money[event.senderID] += reward;

saveMoney();

api.sendMessage(
`🐉 Bạn đã đánh bại Boss!
💰 +1.000.000đ`,
event.threadID
);

} else {

money[event.senderID] -= 500000;

saveMoney();

api.sendMessage(
`💀 Boss quá mạnh!
💸 -500.000đ`,
event.threadID
);

}

}

if (event.body == "/pokemon") {

const poke = [
"⚡ Pikachu",
"🔥 Charizard",
"🌊 Squirtle",
"🌱 Bulbasaur",
"👻 Gengar"
];

const random = poke[Math.floor(Math.random() * poke.length)];

api.sendMessage(
`🎉 Bạn bắt được ${random}`,
event.threadID
);

}


   // TIỀN
   if (!money[event.senderID]) {
      money[event.senderID] = 10000000;
   }

if (event.body == "/iq") {

const iq = Math.floor(Math.random() * 201);

api.sendMessage(
`🧠 IQ của bạn là: ${iq}`,
event.threadID
);

}

if (event.body.startsWith("/xx ")) {

const bet = parseInt(event.body.slice(4));

if (!money[event.senderID]) {
money[event.senderID] = 10000000;
}

if (isNaN(bet) || bet <= 0) {
return api.sendMessage("❌ Nhập số tiền hợp lệ", event.threadID);
}

if (bet > money[event.senderID]) {
return api.sendMessage("💸 Không đủ tiền", event.threadID);
}

const dice = Math.floor(Math.random() * 6) + 1;

if (dice >= 4) {

money[event.senderID] += bet;

api.sendMessage(
`🎲 Xúc xắc ra ${dice}
🎉 Bạn thắng ${bet.toLocaleString()}đ`,
event.threadID
);

} else {

money[event.senderID] -= bet;

api.sendMessage(
`🎲 Xúc xắc ra ${dice}
💀 Bạn thua ${bet.toLocaleString()}đ`,
event.threadID
);

}

saveMoney();

}


   // XEM SỐ DƯ
   if (event.body == "/sodu") {

      api.sendMessage(
         `💰 Bạn đang có ${money[event.senderID].toLocaleString()}Đồng`,
         event.threadID
      );
   }

if (event.body == "/slot") {

const icon = ["🍎", "🍌", "🍇", "💎", "7️⃣"];

const a = icon[Math.floor(Math.random() * icon.length)];
const b = icon[Math.floor(Math.random() * icon.length)];
const c = icon[Math.floor(Math.random() * icon.length)];

let msg = `🎰 ${a} | ${b} | ${c}\n`;

if (a == b && b == c) {
msg += "\n💰 JACKPOT!!!";
} else {
msg += "\n😢 Thua rồi!";
}

api.sendMessage(msg, event.threadID);

}

if (event.body.startsWith("/ott ")) {

const choose = event.body.slice(5).toLowerCase();

const bot = ["búa", "bao", "kéo"];
const botChoose = bot[Math.floor(Math.random() * bot.length)];

let result = "";

if (choose === botChoose) {
result = "🤝 HÒA!";
}
else if (
(choose === "búa" && botChoose === "kéo") ||
(choose === "kéo" && botChoose === "bao") ||
(choose === "bao" && botChoose === "búa")
) {
result = "🎉 Bạn THẮNG!";
}
else {
result = "💀 Bạn THUA!";
}

api.sendMessage(
`🧠 Bạn chọn: ${choose}
🤖 Bot chọn: ${botChoose}

${result}`,
event.threadID
);

}

    // BÓI TÌNH YÊU
    if (event.body.startsWith("/Bói")) {

      const input = event.body.slice(6);

      if (!input.includes("-")) {

        api.sendMessage(
          "💘 Dùng:\n/love tên1 - tên2",
          event.threadID
        );

        return;
      }

      const names = input.split("-");

      const name1 = names[0].trim();
      const name2 = names[1].trim();

      const percent = Math.floor(Math.random() * 101);

      let result = "";

      if (percent >= 90) {
        result = "💍 Cưới luôn đi!";
      }

      else if (percent >= 70) {
        result = "❤️ Rất hợp đôi";
      }

      else if (percent >= 50) {
        result = "🥰 Có tương lai";
      }

      else if (percent >= 30) {
        result = "😅 Hơi khó nha";
      }

      else {
        result = "💀 Friendzone toàn tập";
      }

      api.sendMessage(
`💘 BÓI TÌNH YÊU 💘

👦 ${name1}
❤️
👧 ${name2}

📊 Hợp nhau: ${percent}%

${result}`,
        event.threadID
      );
    }

    if (event.body == "/gio") {

const now = new Date();

const time = now.toLocaleTimeString("vi-VN");
const date = now.toLocaleDateString("vi-VN");

api.sendMessage(
`🕒 Giờ hiện tại: ${time}
📅 Ngày: ${date}`,
event.threadID
);

}

// ======================= 👮 ANTI SPAM =======================

let spam = {};

if (event.body) {

if (!spam[event.senderID]) {
spam[event.senderID] = 0;
}

spam[event.senderID]++;

setTimeout(() => {
spam[event.senderID]--;
}, 5000);

if (spam[event.senderID] >= 5) {

api.sendMessage(
"🚫 Bạn đang spam quá nhanh!",
event.threadID
);

}

}

   // GAME TÀI XỈU
   if (event.body == "/taixiu") {

    
  
        if (!money[event.senderID]) {
        money[event.senderID] = 10000000;
        saveMoney();
        }

        let win = Math.random() < 0.5;

        if (win) {
          money[event.senderID] += 500000;
        saveMoney();

         api.sendMessage(
            `🎉 Bạn THẮNG\n💵 +500.000 Đồng\n💰 Số dư: ${money[event.senderID].toLocaleString()}Đồng`,
            event.threadID
         );

      } else {

         money[event.senderID] -= 300000;
        saveMoney();

         api.sendMessage(
            `💀 Bạn THUA\n💸 -300.000 Đồng\n💰 Số dư: ${money[event.senderID].toLocaleString()}Đồng`,
            event.threadID
         );
      }
    
  }
});

});