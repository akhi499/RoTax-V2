const Discord = require("discord.js");
const bot = new Discord.Client();

bot.login('');

require("dotenv").config();

const fees = {
  ["Amount Before Tax"]: (n) => n,
  ["Amount After Tax"]: (n) => n - 0.3 * n,
  ["Amount Needed To Cover Tax"]: (n) => n / 0.7,
  ["Amount Lost To Tax"]: (n) => 0.3 * n,
};

bot.on("message", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith("!fee")) return;
  const [, number] = msg.content.split(" ");
  const embed = new Discord.MessageEmbed();

  if (isNaN(number))
    return msg.channel.send({
      embed: {
        color: 3447003,
        description: ":interrobang: Argument must be a number.",
      },
    });

  Object.keys(fees).forEach((fee) => {
    embed.addField(
      `${fee} Payout`,
      `$${Number(Math.ceil(fees[fee](number)).toFixed(2))}`
    );
    embed.setColor("GREEN")
    embed.setTitle("Roblox Tax")
    embed.setDescription("Showing calculated Roblox tax info for the given amount of Robux")
  });

  msg.channel.send(embed);
});

bot.login(process.env.BOT_TOKEN);
  
