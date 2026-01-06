import os
import discord
from discord.ext import commands
from discord import app_commands

intents = discord.Intents.default()
bot = commands.Bot(command_prefix="!", intents=intents)

FOOTER_TEXT = "ICE SHOP | บริการจำหน่ายไอดีเกมราคาถูก"
FOOTER_ICON = "https://img5.pic.in.th/file/secure-sv1/file_000000009abc622f8c05295909c167e1.md.png"

SERVICE_DATA = {
    "cosmetic": """ผ้าคลุมคาตาคุริ 5฿
หมวกบอสนก 10฿
หมวกแอดมิน 15฿
ผ้าคลุมหนวดดำ 40฿""",

    "level": """Lv1-700 = 15฿
Lv700-1500 = 25฿
Lv1500-MAX = 70฿
Lv700-MAX = 100฿
Lv1-MAX = 140฿""",

    "money": """1M มี x2 = 5฿
1M ไม่มี x2 = 7฿
10M มี x2 = 20฿
10M ไม่มี x2 = 30฿""",

    "purple": """1k = 2฿
10k = 15฿""",

    "fist": """Mas 10 = 1฿
Mas 1-300 = 20฿
Mas 1-600 = 40฿""",

    "sword": """Mas 1-300 = 20฿
Mas 1-600 = 40฿""",

    "fruit": """Mas 1-300 = 30฿
Mas 1-600 = 50฿""",

    "gun": """Mas 1-300 = 30฿
Mas 1-600 = 50฿""",

    "bone": """1000 = 5฿
5000 = 20฿
10k = 35฿""",

    "awake": """ผลตื่นทุกสกิล 20฿ (สกิลละ 5฿)
โมจิ / ฟีนิกซ์ 30฿
เปิดดัน +10฿""",

    "martial": """Superhuman 20฿
Death Step 15฿
Karate V2 15฿
Dragon Talon 20฿
Electric Claw V2 15฿
God Human 30฿""",

    "findsword": """สมอ 50฿
ดาบคู่ 40฿
สามดาบ 30฿
เคียว 20฿
บิ๊กมัม 20฿""",

    "findgun": """Serpent Bow 15฿
ปืนทั่วไป 5฿
ปืนพิษ 15฿
กีต้าบรู๊ค 30฿""",

    "v3": """มนุษย์ / สกาย / มิ้ง / เงือก 15฿
ไซ 50฿
กูล 25฿""",

    "dragon": """V1-3 ขั้นละ 30฿
V1 รวม Dojo 120฿
V3 รวม Dojo 300฿
Dojo 3 วัน 100฿
ไอเท่มมังกร เริ่ม 10฿""",

    "v4": """เหมาทำ T10 = 80฿
ขั้น 1-5 = 20฿
ขั้น 6-10 = 10฿""",

    "haki": """ฮาคิ V1 = 20฿
ฮาคิ V2 = 25฿
ฟาม 1000 = 10฿""",

    "craft": """Dark Fragment 15฿
เศษอื่น 10 ชิ้น = 1฿"""
}

class ServiceSelect(discord.ui.Select):
    def __init__(self):
        options = [
            discord.SelectOption(label="รับฟาร์มเวล", value="level"),
            discord.SelectOption(label="ฟาร์มเงิน", value="money"),
            discord.SelectOption(label="ฟาร์มเงินม่วง", value="purple"),
            discord.SelectOption(label="มาสเตอรี่หมัด", value="fist"),
            discord.SelectOption(label="มาสเตอรี่ดาบ", value="sword"),
            discord.SelectOption(label="มาสเตอรี่ผล", value="fruit"),
            discord.SelectOption(label="มาสเตอรี่ปืน", value="gun"),
            discord.SelectOption(label="ฟาร์มกระดูก", value="bone"),
            discord.SelectOption(label="ผลตื่น", value="awake"),
            discord.SelectOption(label="ทำหมัด", value="martial"),
            discord.SelectOption(label="หาดาบ", value="findsword"),
            discord.SelectOption(label="หาปืน", value="findgun"),
            discord.SelectOption(label="ของตกแต่ง", value="cosmetic"),
            discord.SelectOption(label="เผ่า V3", value="v3"),
            discord.SelectOption(label="อีเว้นมังกร / Dojo", value="dragon"),
            discord.SelectOption(label="เผ่า V4", value="v4"),
            discord.SelectOption(label="ฮาคิสังเกต", value="haki"),
            discord.SelectOption(label="ชิ้นส่วน / คราฟ", value="craft"),
        ]
        super().__init__(placeholder="เลือกบริการที่ต้องการดู", options=options)

    async def callback(self, interaction: discord.Interaction):
        embed = discord.Embed(
            title="📋 รายละเอียดบริการ",
            description=SERVICE_DATA[self.values[0]],
            color=0x00b0f4
        )
        embed.set_footer(text=FOOTER_TEXT, icon_url=FOOTER_ICON)

        await interaction.response.send_message(
            embed=embed,
            ephemeral=True
        )

class ServiceView(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)
        self.add_item(ServiceSelect())

@bot.event
async def on_ready():
    await bot.tree.sync()
    print(f"Bot ready: {bot.user}")

@bot.tree.command(name="service", description="ดูรายการบริการทั้งหมด")
async def service(interaction: discord.Interaction):
    embed = discord.Embed(
        title="🛒 ICE SHOP",
        description="บริการจำหน่ายไอดีเกมราคาถูก",
        color=0x00b0f4
    )
    embed.set_footer(text=FOOTER_TEXT, icon_url=FOOTER_ICON)

    await interaction.response.send_message(
        embed=embed,
        view=ServiceView()
    )

bot.run(os.environ["TOKEN"])
