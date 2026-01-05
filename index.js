const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("messageCreate", async (msg) => {
  if (msg.content === "!info") {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("info_menu")
      .setPlaceholder("เลือกข้อมูลที่ต้องการ")
      .addOptions(
        {
          label: "กติกาเซิร์ฟเวอร์",
          value: "rules"
        },
        {
          label: "วิธีใช้งาน",
          value: "howto"
        },
        {
          label: "ติดต่อแอดมิน",
          value: "contact"
        }
      );

    const row = new ActionRowBuilder().addComponents(menu);

    await msg.reply({
      content: "กรุณาเลือกรายการ",
      components: [row]
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  if (interaction.customId === "info_menu") {
    let replyText = "";

    if (interaction.values[0] === "rules") {
      replyText = "📌 กติกาเซิร์ฟเวอร์\n1. ห้ามสแปม\n2. ห้ามด่ากัน";
    }
    if (interaction.values[0] === "howto") {
      replyText = "📘 วิธีใช้งาน\nใช้คำสั่ง !info เพื่อดูข้อมูล";
    }
    if (interaction.values[0] === "contact") {
      replyText = "📞 ติดต่อแอดมิน\n@Admin";
    }

    await interaction.reply({
      content: replyText,
      ephemeral: true // เห็นเฉพาะคนกด
    });
  }
});

client.login(process.env.TOKEN);
