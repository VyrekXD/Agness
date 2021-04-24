/* eslint-disable no-unused-vars, max-lines */
import { PermissionString, MessageEmbed, User, Guild } from 'discord.js';
import Command, { Category } from './Command';
import { Welcome } from '../database/welcome';
import { Leave } from '../database/leave';
import Agness from '../bot';

interface CommandStrings {
    help(prefix: string): string;
    helpCategory(prefix: string, category: Category, commands: string, quantity: number): string;
    helpCommand(prefix: string, command: Command): string;
    prefix(prefix: string): string;
    langs(prefix: string, languages: string): MessageEmbed;
    guilds(members: number, guilds: number, shardID: string): MessageEmbed;
    vote(): MessageEmbed
    avatar(user: string, avatar: string): string;
    rrHelp(prefix: string): MessageEmbed;
    rrReact(role: string): string;
    rr(role: string, emoji: string): string;
    rrNormal(): MessageEmbed;
    rrUnique(): MessageEmbed;
    rrOnly(): MessageEmbed;
    rrDelete(emoji: string): string;
    embedHelp(prefix: string): MessageEmbed;
    embedCreated(prefix: string, embed: string): string;
    embedDeleted(embed: string): string;
    embedList(embeds: string, icon: string | undefined): MessageEmbed;
    embedEdited(property: string, name: string): string;
    embedProperties(prefix: string): MessageEmbed;
    tagsHelp(prefix: string): MessageEmbed;
    tagsCreated(name: string): string;
    tagsEdited(name: string): string;
    tagsDeleted(name: string): string;
    tagsList(tags: string, icon: string | undefined): MessageEmbed;
    tagsProperties(): MessageEmbed;
    welcomeHelp(prefix: string): MessageEmbed;
    leaveHelp(prefix: string): MessageEmbed;
    welcomeChannel(channel: string): string;
    leaveChannel(channel: string): string;
    channelRemoved(): string;
    messageRemoved(): string;
    welcomeEmbed(prefix: string, embed: string): string;
    leaveEmbed(prefix: string, embed: string): string;
    welcomeMessage(prefix: string, embed: boolean): string;
    leaveMessage(prefix: string, embed: boolean): string;
    welcomeRoleRemoved(type: string): string;
    welcomeRole(role: string, type: string, prefix: string): string;
    welcomeConfig(welcome: Welcome, prefix: string): MessageEmbed;
    leaveConfig(leave: Leave, prefix: string): MessageEmbed;
    emitEvent(event: string): string;
    variables(): MessageEmbed;
    invite(): MessageEmbed;
    userInfo(user: User, guild: Guild | null, author: User): MessageEmbed;
    kill(author: User, mention: User): string;
    smug(author: User): string;
    disgust(author: User): string;
    laugh(author: User): string;
    baka(author: User, mention: User): string;
    slap(author: User, mention: User): string;
    hug(author: User, mention: User): string;
    cuddle(author: User, mention: User): string;
    pat(author: User, mention: User): string;
    kiss(author: User, mention: User): string;
    feed(author: User, mention: User): string;
    dog(): string;
    cat(): string;
    bunny(): string;
    duck(): string;
    nsfw(): string;
    nsfwRequest(author: User): string;
    purge(messages: number): string;
    purgeNothing(): string;
    Waiting(): string;
    kickCheck(): string;
    banCheck(): string;
    unbanOK(user: string): string;
    reasonDays(reason: string | null, days: string | null): string;
}

interface CommandErrorStrings {
    noImage(): string;
    noChannel(): string;
    noChannelView(): string;
    noChannelWrite(): string;
    noRole(): string;
    noRoleAdd(): string;
    cmdServer(): string;
    cmdCooldown(cooldown: string): string;
    cmdEnabled(): string;
    cmdDevs(): string;
    cmdNSFW(): string;
    cmdMemberGuild(perms: string): string;
    cmdMemberChannel(perms: string): string;
    cmdBotGuild(perms: string): string;
    cmdBotChannel(perms: string): string;
    prefixArgs(): string;
    prefixLength(): string;
    langNo(): string;
    helpNo(): string;
    sayNoText(): string;
    sayNoPerms(): string;
    blacklist(reason: string, date: string): string;
    rrMax(): string;
    rrNoOption(prefix: string): string;
    rrNoType(prefix: string): string;
    rrNoChannelReactions(): string;
    rrNoMessage(): string;
    rrNoMessageFound(): string;
    rrErrorMessage(): string;
    rrNoEmoji(): string;
    rrExists(): string;
    rrTime(): string;
    rrDeleteNoEmoji(): string;
    rrDeleteNoMessage(): string;
    rrDeleteEmoji(): string;
    rrDeleteNo(): string;
    embedMax(): string;
    embedName(): string;
    embedExists(): string;
    embedNoExists(): string;
    embedNoValue(property: string): string;
    embedNoValues(prefix: string, embed: string): string;
    embedMaxCharacters(property: string, max: number): string;
    embedNoTimestamp(): string;
    embedNoColor(): string;
    embedNoProperty(prefix: string): string;
    tagsMax(): string;
    tagsName(): string;
    tagsExists(): string;
    tagsNoMessage(): string;
    tagsNoRolePerms(): string;
    tagsNoRole(): string;
    tagsNoExists(): string;
    tagsNoCommand(): string;
    welcomeNoMessage(): string;
    leaveNoMessage(): string;
    welcomeRoleType(): string;
    emitNoEvent(): string;
    killNoMention(): string;
    killMentionMe(): string;
    killMentionAuthor(): string;
    bakaNoMention(): string;
    bakaMentionMe(): string;
    bakaMentionAuthor(): string;
    slapNoMention(): string;
    slapMentionMe(): string;
    slapMentionAuthor(): string;
    hugNoMention(): string;
    hugMentionAuthor(): string;
    cuddleNoMention(): string;
    cuddleMentionAuthor(): string;
    patNoMention(): string;
    patMentionAuthor(): string;
    kissNoMention(): string;
    kissMentionAuthor(): string;
    feedNoMention(): string;
    feedMentionAuthor(): string;
    cooldownReactionAdd(cooldown: string): string;
    cooldownReactionRemove(cooldown: string): string;
    purgeNoArgs(prefix: string): MessageEmbed;
    purgeNoNumber(): string;
    purgeNoValid(): string;
    purgeNoUsers(): string;
    kickNoArgs(): string;
    kickNoUsers(): string;
    kickError(): string;
    kickUsersMax(): string;
    banNoArgs(): string;
    banNoUsers(): string;
    banError(): string;
    banUsersMax(): string;
    banDaysInvalid(): string;
    unbanNoUser(): string;
    unbanUserNoBan(): string;
    unBanNo(user: string): string;
    reasonInvalid(): string;
    reasonNoComillas(): string;
}

interface CommandDescriptionStrings {
    help: string;
    ping: string;
    eval: string;
    prefix: string;
    guilds: string;
    say: string;
    avatar: string;
    vote: string;
    lang: string;
    bl: string;
    reactrole: string;
    embed: string;
    tags: string;
    welcome: string;
    leave: string;
    emit: string;
    variables: string;
}

interface LanguageStrings {
    commands: CommandStrings;
    commandErrors: CommandErrorStrings;
    permissions: Record<PermissionString, string>;
    commandDescriptions: CommandDescriptionStrings;
}

interface LanguageOptions {
    code: string;
    flag: string;
    nativeName: string;
    strings: LanguageStrings;
}

export default class Language {
    code: string;
    flag: string;
    nativeName: string;
    strings: LanguageStrings;

    constructor(public client: Agness, options: LanguageOptions) {
        this.code = options.code;
        this.flag = options.flag;
        this.strings = options.strings;
        this.nativeName = options.nativeName;
    }

    get<K extends keyof CommandStrings>(string: K, ...args: Parameters<CommandStrings[K]>): ReturnType<CommandStrings[K]> {
        const value = (this.strings.commands)[string];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value(...args);
    }

    getError<K extends keyof CommandErrorStrings>(string: K, ...args: Parameters<CommandErrorStrings[K]>): ReturnType<CommandErrorStrings[K]> {
        const value = (this.strings.commandErrors)[string];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value(...args);
    }

    getDescription(string: string): string | undefined {
        const value = (this.strings.commandDescriptions)[string as keyof CommandDescriptionStrings];
        return value;
    }

    parsePermission(permission: PermissionString): string {
        return this.strings.permissions[permission];
    }
}