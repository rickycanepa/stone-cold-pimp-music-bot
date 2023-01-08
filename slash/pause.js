const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses audio"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
            return await interaction.editReply("queue empty as a mf")

            queue.setPaused(true)
            await interaction.editReply("hol up, stop the track. use `/resume` to start it again")
    },
}