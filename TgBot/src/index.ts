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

/*--------------------------------------*/ 
// Importing modules
/*--------------------------------------*/
import { Context, Telegraf, Input } from 'telegraf';
import 'dotenv/config';


/*--------------------------------------*/ 
// Controls
/*--------------------------------------*/
const debug = 1; // 0 - debug mode off, 1 - debug mode on

/*--------------------------------------*/ 
// Initializing bot
/*--------------------------------------*/
const BOT_TOKEN = process.env.BOT_TOKEN; // Telegram bot token
const bot = new Telegraf(process.env.BOT_TOKEN ?? "");



/*--------------------------------------*/ 
// Bot commands
/*--------------------------------------*/

bot.start((ctx) => ctx.reply('Welcome Message'));
bot.help((ctx) => ctx.reply('Bot Help Message'));

// on message
bot.on('message', async (ctx) => {
    if (debug) {
        console.log("---CONTEXT---\n", ctx, "\n");
        console.log("---FROM---\n", ctx.from, "\n");
        console.log("---CHAT---\n", ctx.chat, "\n");
        console.log("---INFO---");
        console.log("is Admin " + await isAdmin(ctx));
        console.log("Is Group " + await isGroup(ctx));
        console.log("\n\n\n");
    }
    //bot.telegram.sendSticker(ctx.chat.id, '6001278577734061329');
});


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


console.log("---SET_CREATED---");

// send last sticker in chat
var last_sticker_id = '';
bot.telegram.getStickerSet('test_sticker_by_volley_telegram_bot').then((res) => { last_sticker_id = res.stickers[res.stickers.length -1].file_id }).then(() => { bot.telegram.sendSticker(151216502, last_sticker_id) });


console.log("---MY_PACK1---");
bot.telegram.getStickerSet('volleyPackTest').then((res) => { console.log(res) });
console.log("---MY_PACK2---");
bot.telegram.getStickerSet('test_sticker_by_volley_telegram_bot').then((res) => { console.log(res) });
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
async function isGroup(ctx :Context): Promise<Boolean> {
    if (ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
        return true;
    } else {
        return false;
    }
}

// Function to check if user is admin
async function isAdmin(ctx :Context): Promise<Boolean> {
    return ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id).then((user) => {
        if (user.status === 'creator' || user.status === 'administrator' || ctx.from.id === ctx.chat.id) {
            return true;
        } else {
            return false;
        }
    });
}
