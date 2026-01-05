const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
  REST,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("info")
    .setDescription("ดูข้อมูลต่าง ๆ")
].map(cmd => cmd.toJSON());

client.once("ready", async () => {
  console.log(`ออนไลน์แล้ว: ${client.user.tag}`);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands }
  );

  console.log("ลงทะเบียน /info เรียบร้อย");
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "info") {
      const menu = new StringSelectMenuBuilder()
        .setCustomId("info_menu")
        .setPlaceholder("เลือกหัวข้อ")
        .addOptions(
          { label: "📜 กติกา", value: "rules" },
          { label: "📘 วิธีใช้งาน", value: "howto" },
          { label: "📞 ติดต่อ", value: "contact" }
        );

      const row = new ActionRowBuilder().addComponents(menu);

      await interaction.reply({
        content: "เลือกหัวข้อที่ต้องการ",
        components: [row],
        ephemeral: true
      });
    }
  }

  if (interaction.isStringSelectMenu()) {
    let embed;

    if (interaction.values[0] === "rules") {
      embed = new EmbedBuilder()
        .setTitle("📜 กติกา")
        .setDescription("1. ห้ามสแปม\n2. ห้ามด่า");
    }

    if (interaction.values[0] === "howto") {
      embed = new EmbedBuilder()
        .setTitle("📘 วิธีใช้งาน")
        .setDescription("ใช้คำสั่ง /info");
    }

    if (interaction.values[0] === "contact") {
      embed = new EmbedBuilder()
        .setTitle("📞 ติดต่อ")
        .setDescription("@Admin");
    }

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
});

client.login(process.env.TOKEN);
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
