const {MessageActionRow, MessageButton} = require('discord.js');

const quest = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId(false)
            .setLabel('HABILITAR')
			.setStyle('DANGER'),
        new MessageButton()
            .setCustomId('delete')
            .setLabel('Habilitar e Refazer as perguntas')
			.setStyle('PRIMARY')
    )