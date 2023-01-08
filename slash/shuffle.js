const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("Shuffles queue"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("look around g, shits empty")

		queue.shuffle()
        await interaction.editReply(`${queue.tracks.length} joints shuffled`)
	},
}