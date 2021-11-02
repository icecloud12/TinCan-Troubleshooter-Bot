// NOTE: This code is ripped from another bot of mine. As such there may be some old/irrelevant stuff, feel free to Pull Request this out.

const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Fully online.');
	client.user.setActivity("Online and ready to help you troubleshoot - !troubleshoot :)")
});

client.on('message', async message => {

	// KNOWN ISSUE: Bot will NOT convert command names to lowercase in order to match with below code. All "name" values in command files **must be in lowercase**. If anyone knows how to fix I'd appreciate it. -GTink911

	if (message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName)
<<<<<<< HEAD
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;
=======
>>>>>>> GTLINK/help-command-update

	await command.execute(message, args, client, config, Discord)
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
// client.on("debug", (e) => console.info(e));

client.login(config.token);