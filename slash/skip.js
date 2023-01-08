const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("skips current track"),
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
            return await interaction.editReply("aint shit in the queue playa")

            const currentSong = queue.current
            
            queue.skip()
            await interaction.editReply({
                embeds: [
                    newMessageEmbed().setDescription(`${currentSong.title} has been skipped. get that weak shit outta here`).setThumbnail(currentSong.thumbnail)
                ]
            })
    },
}