const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  Routes,
  REST,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

/* ===== Slash Command ===== */
const commands = [
  new SlashCommandBuilder()
    .setName("panel")
    .setDescription("ส่งแผงข้อมูลให้กดดู")
].map(cmd => cmd.toJSON());

/* ===== Register Command ===== */
client.once("ready", async () => {
  console.log(`ออนไลน์แล้ว: ${client.user.tag}`);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands }
  );

  console.log("ลงทะเบียน /panel เรียบร้อย");
});

/* ===== Interaction ===== */
client.on("interactionCreate", async (interaction) => {

  // /panel → ส่งข้อความค้างไว้
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "panel") {

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("rules_btn")
          .setLabel("📜 กติกา")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("howto_btn")
          .setLabel("📘 วิธีใช้งาน")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("contact_btn")
          .setLabel("📞 ติดต่อ")
          .setStyle(ButtonStyle.Success)
      );

      const embed = new EmbedBuilder()
        .setTitle("📢 ข้อมูลเซิร์ฟเวอร์")
        .setDescription("กดปุ่มด้านล่างเพื่อดูรายละเอียด\n(เห็นเฉพาะคนที่กด)");

      await interaction.reply({
        embeds: [embed],
        components: [row]
      });
    }
  }

  // ===== ปุ่ม =====
  if (interaction.isButton()) {
    let embed;

    if (interaction.customId === "rules_btn") {
      embed = new EmbedBuilder()
        .setTitle("📜 กติกา")
        .setDescription("1. ห้ามสแปม\n2. ห้ามด่ากัน");
    }

    if (interaction.customId === "howto_btn") {
      embed = new EmbedBuilder()
        .setTitle("📘 วิธีใช้งาน")
        .setDescription("ใช้คำสั่ง /panel เพื่อเรียกแผงนี้");
    }

    if (interaction.customId === "contact_btn") {
      embed = new EmbedBuilder()
        .setTitle("📞 ติดต่อ")
        .setDescription("@Admin");
    }

    await interaction.reply({
      embeds: [embed],
      ephemeral: true // 👈 เห็นคนเดียว
    });
  }
});

client.login(process.env.TOKEN);
