const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("resumes audio"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
            return await interaction.editReply("queue empty as a mf")

            queue.setPaused(false)
            await interaction.editReply("spin it. use `/pause` to to pause, pimp")
    },
}