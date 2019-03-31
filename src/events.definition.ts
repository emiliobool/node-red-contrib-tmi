export interface EventArgList {
    [action: string]: string[]
}
export const events: EventArgList = {
    action: ['channel', 'userstate', 'message', 'self'],
    anongiftpaidupgrade: ['channel', 'username', 'userstate'],
    ban: ['channel', 'username', 'reason', 'userstate'],
    chat: ['channel', 'username', 'reason', 'self'],
    cheer: ['channel', 'userstate', 'message'],
    clearchat: ['channel'],
    connected: ['address', 'port'],
    connecting: ['address', 'port'],
    disconnected: ['reason'],
    emoteonly: ['channel', 'enabled'],
    emotesets: ['sets', 'obj'],
    followersonly: ['channel', 'enabled', 'length'],
    giftpaidupgrade: ['channel', 'username', 'sender', 'userstate'],
    hosted: ['channel', 'username', 'viewers', 'autohost'],
    hosting: ['channel', 'target', 'viewers'],
    join: ['channel', 'username', 'self'],
    logon: [],
    // message: ['channel', 'userstate', 'message', 'self'],
    messagedeleted: ['channel', 'username', 'deleteMessage', 'userstate'],
    mod: ['channel', 'username'],
    mods: ['channel', 'mods'],
    notice: ['channel', 'msgid', 'message'],
    part: ['channel', 'username', 'self'],
    ping: [],
    pong: ['latency'],
    r9kbeta: ['channel', 'enabled'],
    raided: ['channel', 'username', 'viewers'],
    raw_message: ['messageCloned', 'message'],
    reconnect: [],
    resub: [
        'channel',
        'username',
        'streakMonths',
        'message',
        'userstate',
        'methods',
    ],
    roomstate: ['channel', 'state'],
    serverchange: ['channel'],
    slowmode: ['channel', 'enabled', 'length'],
    subgift: [
        'channel',
        'username',
        'streakMonths',
        'recipient',
        'methods',
        'userstate',
    ],
    submysterygift: [
        'channel',
        'username',
        'numbOfSubs',
        'methods',
        'userstate',
    ],
    subscribers: ['channel', 'enabled'],
    subscription: ['channel', 'username', 'methods', 'message', 'userstate'],
    timeout: ['channel', 'username', 'reason', 'duration', 'userstate'],
    unhost: ['channel', 'viewers'],
    unmod: ['channel', 'username'],
    vips: ['channel', 'vips'],
    whisper: ['from', 'userstate', 'message', 'self'],
}