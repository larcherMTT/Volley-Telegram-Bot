"use strict";
/*---------------------------------------------------------------------
__     __    _ _            _           _ _   ____        _           |
\ \   / /__ | | | ___ _   _| |__   __ _| | | | __ )  ___ | |_         |
 \ \ / / _ \| | |/ _ \ | | | '_ \ / _` | | | |  _ \ / _ \| __|        |
  \ V / (_) | | |  __/ |_| | |_) | (_| | | | | |_) | (_) | |_         |
   \_/ \___/|_|_|\___|\__, |_.__/ \__,_|_|_| |____/ \___/ \__|        |
                      |___/                                           |
                                                                      |
author: Matteo Larher - 2022                                          |
email: matteo.larcher94@hotmail.it                                    |
---------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/*--------------------------------------*/
// Importing modules
/*--------------------------------------*/
const telegraf_1 = require("telegraf");
require("dotenv/config");
/*--------------------------------------*/
// Controls
/*--------------------------------------*/
const debug = 1; // 0 - debug mode off, 1 - debug mode on
/*--------------------------------------*/
// Initializing bot
/*--------------------------------------*/
const BOT_TOKEN = process.env.BOT_TOKEN; // Telegram bot token
const bot = new telegraf_1.Telegraf((_a = process.env.BOT_TOKEN) !== null && _a !== void 0 ? _a : "");
/*--------------------------------------*/
// Bot commands
/*--------------------------------------*/
bot.start((ctx) => ctx.reply('Welcome Message'));
bot.help((ctx) => ctx.reply('Bot Help Message'));
// on message
bot.on('message', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (debug) {
        console.log("---CONTEXT---\n", ctx, "\n");
        console.log("---FROM---\n", ctx.from, "\n");
        console.log("---CHAT---\n", ctx.chat, "\n");
        console.log("---INFO---");
        console.log("is Admin " + (yield isAdmin(ctx)));
        console.log("Is Group " + (yield isGroup(ctx)));
        console.log("\n\n\n");
    }
    //bot.telegram.sendSticker(ctx.chat.id, '6001278577734061329');
}));
/*--------------------------------------*/
// Bot launch
/*--------------------------------------*/
bot.launch();
if (debug) {
    console.log("Bot started");
}
// !!!!!
// bot.telegram.createNewStickerSet(151216502, 'test_sticker_by_volley_telegram_bot', 'test_sticker_by_volley_telegram_bot',{png_sticker: 'https://assets.stickpng.com/images/580b585b2edbce24c47b2a1f.png', emojis: '👍' });
//bot.telegram.addStickerToSet(151216502, 'test_sticker_by_volley_telegram_bot', {png_sticker: Input.fromURLStream('http://127.0.0.1:3000/png/512/512', 'img.png'), emojis: '👍' });
//bot.telegram.sendPhoto(151216502, Input.fromLocalFile('512.png', 'test.png'));
//bot.telegram.sendPhoto(151216502, Input.fromURLStream('http://95.245.173.244/png/512/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Sunglasses&hairColor=SilverGray&facialHairType=Blank&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=Blue03&graphicType=Selena&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Twinkle&skinColor=Tanned', 'img.png'));
//bot.telegram.sendPhoto(151216502, Input.fromURLStream('http://127.0.0.1:3000/png', 'img.png'));
bot.telegram.sendMessage(151216502, 'AA 6001152327170395465', { entities: [{ type: 'custom_emoji', offset: 3, length: 19, custom_emoji_id: '6001152327170395465' }] });
console.log("---SET_CREATED---");
// send last sticker in chat
var last_sticker_id = '';
bot.telegram.getStickerSet('test_sticker_by_volley_telegram_bot').then((res) => { last_sticker_id = res.stickers[res.stickers.length - 1].file_id; }).then(() => { bot.telegram.sendSticker(151216502, last_sticker_id); });
console.log("---MY_PACK1---");
bot.telegram.getStickerSet('volleyPackTest').then((res) => { console.log(res); });
console.log("---MY_PACK2---");
bot.telegram.getStickerSet('test_sticker_by_volley_telegram_bot').then((res) => { console.log(res); });
// !!!!!
/*--------------------------------------*/
// Bot stop
/*--------------------------------------*/
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
/*--------------------------------------*/
// Bot functions
/*--------------------------------------*/
// Function to check if group or private chat
function isGroup(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
            return true;
        }
        else {
            return false;
        }
    });
}
// Function to check if user is admin
function isAdmin(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        return ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id).then((user) => {
            if (user.status === 'creator' || user.status === 'administrator' || ctx.from.id === ctx.chat.id) {
                return true;
            }
            else {
                return false;
            }
        });
    });
}
//# sourceMappingURL=index.js.map