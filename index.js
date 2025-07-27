require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { delay } = require('./utils');

const {
  BOT_TOKEN: TOKEN,
  OWNER_ID,
  ROLE_6_ID,
  ROLE_7_ID,
  ROLE_8_ID,
  ROLE_CAP_ID
} = process.env;

// 校验环境变量
if (!TOKEN || !OWNER_ID) {
  console.error('❌ 缺少 BOT_TOKEN 或 OWNER_ID，请检查 .env');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  allowedMentions: {
    parse: ['users','roles','everyone'],
    repliedUser: false
  }
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async msg => {
  if (msg.author.bot) return;
  const raw = msg.content.trim();

  if (raw === '!strategy') {
    const embed = new EmbedBuilder()
      .setTitle('Common abyss strategy')
      .setColor(0x1ABC9C)
      .setDescription([
        '**Preparation before abyss start:** [Click here](https://discord.com/channels/1082595320074092574/1363695806841880656/1363732897982582964)',
        '',
        '**Tips of abyss:**',
        '- Avoid shield [Click here](https://discord.com/channels/1082595320074092574/1363695806841880656/1381455399336808489)',
        '- Charge multiple Ninjasu [Click here](https://discord.com/channels/1082595320074092574/1363695806841880656/1373203013031952445)',
        '- Sacrifice [Click here](https://discord.com/channels/1082595320074092574/1363695806841880656/1363733485696716903)',
        '',
        '**What team captains should do:** [Click here](https://discord.com/channels/1082595320074092574/1363695806841880656/1382113056552779887)'
      ].join('\n'));
    return msg.channel.send({ embeds: [embed] });
  }
  if (raw === '!攻略') {
    const embed = new EmbedBuilder()
      .setTitle('通用深淵攻略')
      .setColor(0x1ABC9C)
      .setDescription([
        '**深淵前的準備：** [點這裡](https://discord.com/channels/1082595320074092574/1363734401791430868/1363734640556249188)',
        '',
        '**深淵的出傷技巧：**',
        '- 躲減傷盾 [點這裡](https://discord.com/channels/1082595320074092574/1363734401791430868/1381465507944861697)',
        '- 單角二大 [點這裡](https://discord.com/channels/1082595320074092574/1363734401791430868/1373210571432005684)',
        '- 獻祭策略 [點這裡](https://discord.com/channels/1082595320074092574/1363734401791430868/1363734942915367044)',
        '',
        '**特殊王的打法：**',
        '- 暗之身 [點這裡](https://discord.com/channels/1082595320074092574/1363734401791430868/1381474295032844500)',
        '',
        '**隊長應該做的事情：** [點這裡](https://discord.com/channels/1082595320074092574/1363734401791430868/1370435360697352353)'
      ].join('\n'));
    return msg.channel.send({ embeds: [embed] });
  }
  if (raw === '!戦略') {
    const embed = new EmbedBuilder()
      .setTitle('共通深淵戦略')
      .setColor(0x1ABC9C)
      .setDescription([
        '**深淵開始前の準備：** [こちら](https://discord.com/channels/1082595320074092574/1381483438640730242/1382550116833165412)',
        '',
        '**深淵のヒント：**',
        '- シールドを避ける [こちら](https://discord.com/channels/1082595320074092574/1381483438640730242/1382577816398204978)',
        '- 複数回数の忍術 [こちら](https://discord.com/channels/1082595320074092574/1381483438640730242/1382566525382168646)',
        '- 深淵犠牲 [こちら](https://discord.com/channels/1082595320074092574/1381483438640730242/1382557150987030548)',
        '',
        '**キャプテンがやるべきこと：** [こちら](https://discord.com/channels/1082595320074092574/1381483438640730242/1382588080594227220)'
      ].join('\n'));
    return msg.channel.send({ embeds: [embed] });
  }
 
  const m = raw.match(/^!(\d+)(?:\s*(en|cn|jp))?$/i);
  if (m) {
    const key  = m[1];                   
    const lang = m[2]?.toLowerCase() || 'en';
    const strategies = {
      '58': {
        en: {
          titleSuffix: 'Abyss Strategy for 58',
          goal: 58,
          link: ''
        },
        cn: {
          titleSuffix: '58層深淵攻略',
          goal: 58,
          link: ''
        },
        jp: {
          titleSuffix: '58層の深淵戦略',
          goal: 58,
          link: ''
        }
      },
      '59': {
        en: {
          titleSuffix: 'Abyss Strategy for 59',
          goal: 59,
          link: ''
        },
        cn: {
          titleSuffix: '59層深淵攻略',
          goal: 59,
          link: ''
        },
        jp: {
          titleSuffix: '59層の深淵戦略',
          goal: 59,
          link: ''
        }
      },
      '60': {
        en: {
          titleSuffix: 'Abyss Strategy for 60',
          goal: 60,
          link: ''
        },
        cn: {
          titleSuffix: '60層深淵攻略',
          goal: 60,
          link: ''
        },
        jp: {
          titleSuffix: '60層の深淵戦略',
          goal: 60,
          link: ''
        }
      }
    };

    const cfg = strategies[key]?.[lang];
    if (!cfg) return;

    const today = new Date();
    const diff  = 5 - today.getDay();
    const fri   = new Date(today);
    fri.setDate(today.getDate() + diff);
    const fridayStr = `${fri.getMonth()+1}/${fri.getDate()}`;

    const embed = new EmbedBuilder()
      .setTitle(`${fridayStr} ${cfg.titleSuffix}`)
      .setColor(lang === 'cn' ? 0xFF4500 : lang === 'jp' ? 0xFFD700 : 0x1ABC9C)
      .setDescription(
        lang === 'cn'
          ? `**目標：** ${cfg.goal}層\n\n**攻略：** [點這裡](${cfg.link})`
        : lang === 'jp'
          ? `**目標：** ${cfg.goal}層\n\n**戦略：** [こちら](${cfg.link})`
        : `**Goal:** ${cfg.goal}\n\n**Guide:** [Click here](${cfg.link})`
      );
    return msg.channel.send({ embeds: [embed] });
  }

  if (msg.author.id !== OWNER_ID) return;
  const ownerCmds = {
    'cteam': () => `<@&${ROLE_CAP_ID}> create team 創建隊伍`,
    'jteam': () => '@everyone time to join the team, if you cant find the team pls contact me \n 所有人請加入對應的隊伍，如果找不到隊伍請聯繫我',
    'adj':   () => '@everyone adjust card調卡',
    'sac':   () => '@everyone sac獻祭',
    '2u':    () => '@everyone 2ult二大',
    'fla':   () => '@everyone take flash帶閃',

    'azs':   () => '@everyone use flash at beginning開局丟閃',
    'azs0':  () => `<@&${ROLE_6_ID}> <@&${ROLE_7_ID}> <@&${ROLE_8_ID}> use flash at begining`,
    'jian':  () => `<@&${ROLE_6_ID}> <@&${ROLE_7_ID}> <@&${ROLE_8_ID}> use flash at 50%hp`
  };

  if (ownerCmds[raw]) {
    return msg.channel.send(ownerCmds[raw]());
  }

  if (raw === 'surv0') {
    await msg.channel.send('@everyone take gold dmg card帶金輸出卡');
    await delay(5000);
    return msg.channel.send('@everyone slowing down節奏放緩');
  }
  if (raw === 'surv1') {
    await msg.channel.send('@everyone survival team保命隊');
    await delay(5000);
    return msg.channel.send(`<@&${ROLE_CAP_ID}> join later if your team lacks survivability or people \n 晚進如果隊伍存活能力不高或是人少`);
  }
});

client.login(TOKEN);
