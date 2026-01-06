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

/* ===== Client ===== */
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

/* ===== Embed ร้าน ===== */
const FOOTER = {
  text: "ICE SHOP | บริการจำหน่ายไอดีเกมราคาถูก",
  iconURL: "https://img5.pic.in.th/file/secure-sv1/file_000000009abc622f8c05295909c167e1.md.png"
};

const shopEmbed = new EmbedBuilder()
  .setTitle("🛒 ICE SHOP")
  .setDescription("บริการจำหน่ายไอดีเกมราคาถูก")
  .setFooter(FOOTER);

/* ===== Slash Command ===== */
const commands = [
  new SlashCommandBuilder()
    .setName("service")
    .setDescription("ดูรายการบริการทั้งหมด")
].map(c => c.toJSON());

/* ===== Register Command ===== */
client.once("ready", async () => {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands }
  );
  console.log(`Bot ready: ${client.user.tag}`);
});

/* ===== Interaction ===== */
client.on("interactionCreate", async (interaction) => {

  /* ===== /service ===== */
  if (interaction.isChatInputCommand() && interaction.commandName === "service") {

    const menu = new StringSelectMenuBuilder()
      .setCustomId("service_menu")
      .setPlaceholder("เลือกบริการที่ต้องการดู")
      .addOptions(
        { label: "รับฟาร์มเวล", value: "level" },
        { label: "ฟาร์มเงิน", value: "money" },
        { label: "ฟาร์มเงินม่วง", value: "purple" },
        { label: "มาสเตอรี่หมัด", value: "fist" },
        { label: "มาสเตอรี่ดาบ", value: "sword" },
        { label: "มาสเตอรี่ผล", value: "fruit" },
        { label: "มาสเตอรี่ปืน", value: "gun" },
        { label: "ฟาร์มกระดูก", value: "bone" },
        { label: "ผลตื่น", value: "awake" },
        { label: "ทำหมัด", value: "martial" },
        { label: "หาดาบ", value: "findsword" },
        { label: "หาปืน", value: "findgun" },
        { label: "ของตกแต่ง", value: "cosmetic" },
        { label: "เผ่า V3", value: "v3" },
        { label: "อีเว้นมังกร / Dojo", value: "dragon" },
        { label: "เผ่า V4", value: "v4" },
        { label: "ฮาคิสังเกต", value: "haki" },
        { label: "ชิ้นส่วน / คราฟ", value: "craft" }
      );

    await interaction.reply({
      embeds: [shopEmbed],
      content: "📌 เลือกรายการบริการ (กดแล้วเห็นเฉพาะคุณ)",
      components: [new ActionRowBuilder().addComponents(menu)]
    });
  }

  /* ===== Select Menu ===== */
  if (interaction.isStringSelectMenu() && interaction.customId === "service_menu") {

    const data = {
      cosmetic: `ผ้าคลุมคาตาคุริ 5฿
หมวกบอสนก 10฿
หมวกแอดมิน 15฿
ผ้าคลุมหนวดดำ 40฿`,

      level: `Lv1-700 = 15฿
Lv700-1500 = 25฿
Lv1500-MAX = 70฿
Lv700-MAX = 100฿
Lv1-MAX = 140฿`,

      money: `1M มี x2 = 5฿
1M ไม่มี x2 = 7฿
10M มี x2 = 20฿
10M ไม่มี x2 = 30฿`,

      purple: `1k = 2฿
10k = 15฿`,

      fist: `Mas 10 = 1฿
Mas 1-300 = 20฿
Mas 1-600 = 40฿`,

      sword: `Mas 1-300 = 20฿
Mas 1-600 = 40฿`,

      fruit: `Mas 1-300 = 30฿
Mas 1-600 = 50฿`,

      gun: `Mas 1-300 = 30฿
Mas 1-600 = 50฿`,

      bone: `1000 = 5฿
5000 = 20฿
10k = 35฿`,

      awake: `ผลตื่นทุกสกิล 20฿ (สกิลละ 5฿)
โมจิ / ฟีนิกซ์ 30฿
เปิดดัน +10฿`,

      martial: `Superhuman 20฿
Death Step 15฿
Karate V2 15฿
Dragon Talon 20฿
Electric Claw V2 15฿
God Human 30฿`,

      findsword: `สมอ 50฿
ดาบคู่ 40฿
สามดาบ 30฿
เคียว 20฿
บิ๊กมัม 20฿`,

      findgun: `Serpent Bow 15฿
ปืนทั่วไป 5฿
ปืนพิษ 15฿
กีต้าบรู๊ค 30฿`,

      v3: `มนุษย์ / สกาย / มิ้ง / เงือก 15฿
ไซ 50฿
กูล 25฿`,

      dragon: `V1-3 ขั้นละ 30฿
V1 รวม Dojo 120฿
V3 รวม Dojo 300฿
Dojo 3 วัน 100฿
ไอเท่มมังกร เริ่ม 10฿`,

      v4: `เหมาทำ T10 = 80฿
ขั้น 1-5 = 20฿
ขั้น 6-10 = 10฿`,

      haki: `ฮาคิ V1 = 20฿
ฮาคิ V2 = 25฿
ฟาม 1000 = 10฿`,

      craft: `Dark Fragment 15฿
เศษอื่น 10 ชิ้น = 1฿`
    };

    const embed = new EmbedBuilder()
      .setTitle("📋 รายละเอียดบริการ")
      .setDescription(data[interaction.values[0]])
      .setFooter(FOOTER);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
});

/* ===== Login ===== */
client.login(process.env.TOKEN);
