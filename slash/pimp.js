const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pimp")
        .setDescription("loads audio from YouTube")
        .addSubcommand((subCommand)=>
            subCommand
            .setName("song")
            .setDescription("Loads a single song from a url")
            .addStringOption((option) => option.setName("url").setDescription("the audio's url").setRequired(true))
        )
        .addSubcommand((subCommand)=> 
            subcommand
                .setName("playlist")
                .setDescription("Loads a playlist of songs from a URL")
                .addStringOption((option) => option.setName("url").setDescription("the playlist's URL").setRequired(true))
        )
        .addSubcommand((subcommand) => 
            subCommand.setName("search").setDescription("searches for song")
            .addStringOption((option) => 
                option.setName("searchterms").setDescription("the search keywords").setRequired(true))
        ),

        run: async ({ client, interaction }) => {
            if (!interaction.member.voice.channel)
                return interaction.editReply("Must be in voice chat channel to use this command")

                const queue = await client.player.createQueue(interaction.guild)
                if (!queue.connection) await queue.connect(interaction.member.voice.channel)

                let embed = new MessageEmbed()

                if (interaction.options.getSubcommand() == "song"){
                    let url = interaction.options.getString("url")
                    const result = await client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.YOUTUBE_VIDEO
                    })
                    if (result.tracks.length === 0)
                        return interaction.editReply("No results")

                    const song = result.tracks[0]
                    await queue.addTrack(song)
                    embed
                        .setDescription(`**[${song.title}](${song.url})** has been added to queue`)
                        .setThumbnail(song.setThumbnail)
                        .setFooter({ text: `Duration: ${song.duration}`})

                } else if (interaction.options.getSubcommand() === "playlist"){
                    let url = interaction.options.getString("url")
                    const result = await client.player.search(url, {
                        requestedBy: interaction.user,
                        searchEngine: QueryType.YOUTUBE_PLAYLIST
                    })
                    if (result.tracks.length === 0)
                        return interaction.editReply("No results")

                    const playlist = result.tracks[0]
                    await queue.addTracks(result.tracks)
                    embed
                        .setDescription(`**${result.tracks.length} songs from [${playlist.title}](${playlist.url})** has been added to queue`)
                        .setThumbnail(song.setThumbnail)

                } else if (interaction.options.getSubcommand() === "search"){

                }

        }
        

}