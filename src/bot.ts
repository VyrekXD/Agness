import { Client, MessageEmbed, GuildMember, TextChannel } from 'discord.js';
import Languages from './managers/Languages';
import Commands from './managers/Commands';
import nekosClient = require('nekos.life');
import { Embed } from './database/embed';
import Events from './managers/Events';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

interface ReplaceOptions {
    channel: TextChannel;
    member: GuildMember;
    prefix: string;
}

export default class Agness extends Client {
    languages = new Languages(this);
    commands = new Commands(this);
    events = new Events(this);
    color = '#66e7ae';
    nekos = new nekosClient()
    constructor() {
        super({
            partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
            intents: 5635
        });

        connect(process.env.MONGO_URL as string, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if (err) return console.log(`Mongo Error: ${err.stack ?? err}`);
            console.log('MONGODB - Base de datos conectada');
        });

        this.languages.load();
        this.commands.load();
        this.events.load();
        this.login(process.env.TOKEN);
    }

    replaceText(text: string, { channel, member, prefix }: ReplaceOptions): string {
        return text.replace(/{user}/gi, member.user.toString())
            .replace(/{user\.tag}/gi, member.user.tag)
            .replace(/{user\.discrim}/gi, member.user.discriminator)
            .replace(/{user\.avatar}/gi, member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .replace(/{user\.name}/gi, member.user.username)
            .replace(/{user\.id}/gi, member.user.id)
            .replace(/{user\.joindate}/gi, member.joinedAt!.toLocaleDateString())
            .replace(/{user\.nick}/gi, member.displayName)
            .replace(/{user\.createdate}/gi, member.user.createdAt!.toLocaleDateString())
            .replace(/{server\.prefix}/gi, prefix)
            .replace(/{server}/gi, member.guild.name)
            .replace(/{server\.id}/gi, member.guild.id)
            .replace(/{server\.membercount}/gi, member.guild.members.cache.size.toString())
            .replace(/{server\.membercount\.nobots}/gi, member.guild.members.cache.filter((m) => !m.user.bot).size.toString())
            .replace(/{server\.membercount\.bots}/gi, member.guild.members.cache.filter((m) => m.user.bot).size.toString())
            .replace(/{server\.rolecount}/gi, member.guild.roles.cache.size.toString())
            .replace(/{server\.channelcount}/gi, member.guild.channels.cache.size.toString())
            .replace(/{server\.channelcount\.text}/gi, member.guild.channels.cache.filter((c) => c.type === 'text').size.toString())
            .replace(/{server\.channelcount\.voice}/gi, member.guild.channels.cache.filter((c) => c.type === 'voice').size.toString())
            .replace(/{server\.emojiscount}/gi, member.guild.emojis.cache.size.toString())
            .replace(/{server\.emojiscount\.animate}/gi, member.guild.emojis.cache.filter((c) => c.animated).size.toString())
            .replace(/{server\.emojiscount\.noanimate}/gi, member.guild.emojis.cache.filter((c) => !c.animated).size.toString())
            .replace(/{server\.createdate}/gi, member.guild.createdAt!.toLocaleDateString())
            .replace(/{server\.boostlevel}/gi, member.guild.premiumTier.toString())
            .replace(/{server\.boostcount}/gi, member.guild.premiumSubscriptionCount?.toString() ?? '0')
            .replace(/{server\.icon}/gi, member.guild.iconURL({ dynamic: true, size: 4096 }) ?? 'https://cdn.discordapp.com/embed/avatars/0.png?size=2048')
            .replace(/{server\.owner}/gi, member.guild.owner?.user.toString() ?? '')
            .replace(/{server\.owner\.name}/gi, member.guild.owner?.user.username ?? '')
            .replace(/{server\.owner\.id}/gi, member.guild.owner?.user.id ?? '')
            .replace(/{server\.owner\.nick}/gi, member.guild.owner?.displayName ?? '')
            .replace(/{server\.owner\.avatar}/gi, member.guild.owner?.user.displayAvatarURL({ size: 4096, dynamic: true }) ?? '')
            .replace(/{server\.owner\.createdate}/gi, member.guild.owner?.user.createdAt!.toLocaleDateString() ?? '')
            .replace(/{channel}/gi, channel.toString())
            .replace(/{channel\.id}/gi, channel.id)
            .replace(/{channel\.name}/gi, channel.name)
            .replace(/{channel\.createdate}/gi, channel.createdAt!.toLocaleDateString());
    }

    // eslint-disable-next-line no-unused-vars
    generateEmbed(embedData: Embed, replaceText: (text: string) => string): MessageEmbed {
        const embed = new MessageEmbed();
        if (embedData.author.text)
            embed.setAuthor(replaceText(embedData.author.text), embedData.author.image ? replaceText(embedData.author.image) : undefined);
        if (embedData.title)
            embed.setTitle(replaceText(embedData.title));
        if (embedData.description)
            embed.setDescription(replaceText(embedData.description));
        if (embedData.thumbnail)
            embed.setThumbnail(replaceText(embedData.thumbnail));
        if (embedData.image)
            embed.setImage(replaceText(embedData.image));
        if (embedData.footer.text)
            embed.setAuthor(replaceText(embedData.footer.text), embedData.footer.image ? replaceText(embedData.footer.image) : undefined);
        if (embedData.timestamp)
            embed.setTimestamp();
        if (embedData.color)
            embed.setColor('#' + embedData.color);
        return embed;
    }
    async getImage(ruta: string): Promise<string> {
        const request = await fetch(`https://kapi.bulzykrown.repl.co/api/img/${ruta}`, {
            headers: {
                Authorization: process.env.KARU_TOKEN
            }
        });
        const json = await request.json();
        return json.url;
    }
}

new Agness();