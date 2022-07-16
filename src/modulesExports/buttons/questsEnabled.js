const {MessageActionRow, MessageButton} = require('discord.js');

const quest = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId(false)
            .setLabel('DESABILITAR')
			.setStyle('DANGER'),
        new MessageButton()
            .setCustomId('delete')
            .setLabel('Refazer as perguntas')
			.setStyle('PRIMARY'),
        new MessageButton()
            .setCustomId('edit')
            .setLabel('Editar perguntas')
			.setStyle('SUCCESS'),
    )