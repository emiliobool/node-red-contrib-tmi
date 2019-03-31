/// <reference path="types.d.ts" />
import { commands } from './commands.definition'
import { getRegisterTypeTag, wrapTemplate, wrapHelp } from './helpers';


export let contents = ''

for (let command in commands) {
    const paletteLabel = command.charAt(0).toUpperCase() + command.slice(1)
    contents += getRegisterTypeTag(`tmi-command-${command}`, {
        category: 'Streaming Tools',
        color: '#6441a5',
        defaults: {
            config: {
                type: 'tmi-config',
                value: '',
            },
            name: {
                value: '',
            },
        },
        align: 'right',
        icon: 'twitch-arrow.png',
        inputs: 1,
        outputs: 1,
        labelStyle: 'tmi_node_label',
        paletteLabel,
        label: function() {
            // @ts-ignore
            return this.name
        },
    })
    contents += wrapTemplate(`tmi-command-${command}`, `
    <div class="tmi-template">
        <div class="form-row">
            <label for="node-input-client"><i class="icon-tag"></i> Config</label>
            <input type="text" id="node-input-client">
        </div>
        <div class="form-row">
            <label for="node-input-name"><i class="icon-tag"></i> Name</label>
            <input type="text" id="node-input-name">
        </div>
    </div>
`)
    contents += wrapHelp(`tmi-command-${command}`, `<p>${command} node</p>`)
}
