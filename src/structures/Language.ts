/* eslint-disable no-unused-vars, max-lines */
import { PermissionString, MessageEmbed, User, Guild } from 'discord.js';
import Command, { Category } from './Command';
import { Welcome } from '../database/welcome';
import { Leave } from '../database/leave';
import Agness from '../bot';

interface CommandStrings {
    /* General */
    channelRemoved(): string;
    messageRemoved(): string;
    reasonDays(reason: string | null, days: string | null): string;
    waiting(): string;

    /* help */
    help(prefix: string): string;
    helpCategory(prefix: string, category: Category, commands: string, quantity: number): string;
    helpCommand(prefix: string, command: Command): string;

    /* prefix */
    prefix(prefix: string): string;

    /* lang */
    langs(languages: string): string;
    langsSet(): string;

    /* General Category */
    guilds(members: number, guilds: number, shardID: string): MessageEmbed;
    vote(): MessageEmbed
    avatar(user: string, avatar: string): string;
    variables(): MessageEmbed;
    invite(): MessageEmbed;
    userInfo(user: User, guild: Guild | null, author: User): MessageEmbed;

    /* reaction role */
    rrHelp(prefix: string): MessageEmbed;
    rrReact(role: string): string;
    rr(role: string, emoji: string): string;
    rrNormal(): MessageEmbed;
    rrUnique(): MessageEmbed;
    rrOnly(): MessageEmbed;
    rrDelete(emoji: string): string;

    /* embeds */
    embedHelp(prefix: string): MessageEmbed;
    embedCreated(prefix: string, embed: string): string;
    embedDeleted(embed: string): string;
    embedList(embeds: string, icon: string | undefined): MessageEmbed;
    embedEdited(property: string, name: string): string;
    embedProperties(prefix: string): MessageEmbed;

    /* tags */
    tagsHelp(prefix: string): MessageEmbed;
    tagsCreated(name: string): string;
    tagsEdited(name: string): string;
    tagsDeleted(name: string): string;
    tagsList(tags: string, icon: string | undefined): MessageEmbed;
    tagsProperties(): MessageEmbed;

    /* welcome */
    welcomeHelp(prefix: string): MessageEmbed;
    welcomeChannel(channel: string): string;
    welcomeEmbed(prefix: string, embed: string): string;
    welcomeMessage(prefix: string, embed: boolean): string;
    welcomeRoleRemoved(type: string): string;
    welcomeRole(role: string, type: string, prefix: string): string;
    welcomeConfig(welcome: Welcome, prefix: string): MessageEmbed;

    /* leave */
    leaveHelp(prefix: string): MessageEmbed;
    leaveChannel(channel: string): string;
    leaveEmbed(prefix: string, embed: string): string;
    leaveMessage(prefix: string, embed: boolean): string;
    leaveConfig(leave: Leave, prefix: string): MessageEmbed;

    /* emit */
    emitEvent(event: string): string;

    /* interact */
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

    /* images */
    dog(): string;
    cat(): string;
    bunny(): string;
    duck(): string;

    /* nsfw */
    nsfw(): string;
    nsfwRequest(author: User): string;

    /* purge */
    purge(messages: number): string;
    purgeNothing(): string;

    /* kick */
    kickCheck(): string;

    /* ban */
    banCheck(): string;

    /* unban */
    unbanOK(user: string): string;
}

interface CommandErrorStrings {

    /* General */
    noImage(): string;
    noChannel(): string;
    noChannelView(): string;
    noChannelWrite(): string;
    noRole(): string;
    noRoleAdd(): string;
    reasonInvalid(): string;
    reasonNoComillas(): string;

    /* Commands CanRun */
    cmdServer(): string;
    cmdCooldown(cooldown: string): string;
    cmdEnabled(): string;
    cmdNSFW(): string;
    cmdMemberGuild(perms: string): string;
    cmdMemberChannel(perms: string): string;
    cmdBotGuild(perms: string): string;
    cmdBotChannel(perms: string): string;

    /* prefix */
    prefixArgs(): string;
    prefixLength(): string;

    /* lang */

    langNo(): string;

    /* help */
    helpNo(): string;

    /* say */
    sayNoText(): string;
    sayNoPerms(): string;

    /* blacklist */
    blacklist(reason: string, date: string): string;

    /* reaction roles */
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
    cooldownReactionAdd(cooldown: string): string;
    cooldownReactionRemove(cooldown: string): string;

    /* embeds */
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

    /* tags */
    tagsMax(): string;
    tagsName(): string;
    tagsExists(): string;
    tagsNoMessage(): string;
    tagsNoRolePerms(): string;
    tagsNoRole(): string;
    tagsNoExists(): string;
    tagsNoCommand(): string;

    /* welcome */
    welcomeNoMessage(): string;
    welcomeRoleType(): string;

    /* leave */
    leaveNoMessage(): string;

    /* emit */
    emitNoEvent(): string;

    /* interact */
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

    /* purge */
    purgeNoArgs(prefix: string): MessageEmbed;
    purgeNoNumber(): string;
    purgeNoValid(): string;
    purgeNoUsers(): string;

    /* kick */
    kickNoArgs(): string;
    kickNoUsers(): string;
    kickError(): string;
    kickUsersMax(): string;

    /* ban */
    banNoArgs(): string;
    banNoUsers(): string;
    banError(): string;
    banUsersMax(): string;
    banDaysInvalid(): string;

    /* unban */
    unbanNoUser(): string;
    unbanUserNoBan(): string;
    unBanNo(user: string): string;
}

interface CommandDescriptionStrings {
    /* General */
    avatar: string;
    djs: string;
    guilds: string;
    help: string;
    invite: string;
    ping: string;
    say: string;
    userinfo: string;
    variables: string;
    vote: string;

    /* Config */
    embed: string;
    emit: string;
    lang: string;
    leave: string;
    prefix: string;
    reactrole: string;
    tags: string;
    welcome: string;

    /* Mod */
    ban: string;
    kick: string;
    purge: string;
    unban: string;

    /* Developer */
    eval: string;
    bl: string;
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