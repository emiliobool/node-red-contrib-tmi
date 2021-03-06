import { Red, Node, NodeProperties, NodeStatus } from 'node-red'
import tmi from 'tmi.js'

export interface TmiClientConfig extends NodeProperties {
    name: string
    username: string
    channels: string
    reconnect: boolean
    secure: boolean
    log_info: boolean
    log_warn: boolean
    log_error: boolean
}
export interface TmiClientNode extends Node {
    client: tmi.Client
}

export const connectedStatus: NodeStatus = {
    fill: 'green',
    shape: 'dot',
    text: 'connected',
}
export const connectingStatus: NodeStatus = {
    fill: 'green',
    shape: 'ring',
    text: 'connecting...',
}
export const disconnectedStatus: NodeStatus = {
    fill: 'red',
    shape: 'ring',
    text: 'disconnected',
}

export function statusUpdater(node: any, client: any) {
    const readyState = client.readyState()
    node.status({})
    const onConnected = () => node.status(connectedStatus)
    const onConnecting = () => node.status(connectingStatus)
    const onDisconnected = () => node.status(disconnectedStatus)
    if (readyState === 'OPEN') onConnected()
    else if (readyState === 'CONNECTING') onConnecting()
    else onDisconnected()

    client.on('connected', onConnected)
    client.on('connecting', onConnecting)
    client.on('disconnected', onDisconnected)

    return function() {
        client.removeListener('connected', onConnected)
        client.removeListener('connecting', onConnecting)
        client.removeListener('disconnected', onDisconnected)
    }
}

export function ConfigNode(RED: Red) {
    function TmiClient(this: TmiClientNode, config: TmiClientConfig) {
        RED.nodes.createNode(this, config)
        const channels = config.channels
            .split(',')
            .map(channel => channel.trim())
            .filter(Boolean)

        const logger: any = {}
        if (config.log_info) logger.info = this.log.bind(this)
        else logger.info = () => {}
        if (config.log_warn) logger.warn = this.warn.bind(this)
        else logger.warn = () => {}
        if (config.log_error) logger.error = this.error.bind(this)
        else logger.error = () => {}

        if (config.reconnect === undefined) config.reconnect = true
        if (config.secure === undefined) config.secure = true

        const options: tmi.Options = {
            connection: {
                reconnect: config.reconnect,
                secure: config.secure,
            },
            channels,
            logger,
        }

        const username = config.username
        const password = (this as any).credentials.password
        if (username || password) {
            options.identity = {}
            if (username) options.identity.username = username
            if (password) options.identity.password = password
        }

        this.client = new (tmi.client as any)(options)
        this.client.connect().catch(() => {})

        this.on('close', done => {
            this.client.removeAllListeners()
            if (!['CLOSED', 'CLOSING'].includes(this.client.readyState())) {
                this.client.disconnect()
            }
            done()
        })
    }
    RED.nodes.registerType('tmi-config', TmiClient, {
        credentials: {
            username: { type: 'text' },
            password: { type: 'password' },
        },
    })
}
