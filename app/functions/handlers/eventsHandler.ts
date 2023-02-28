const { readdirSync } = require('fs');
const { connection } = require('mongoose');

module.exports = (client: any) => {
    client.eventsHandler = async () => {
        const eventFolders = readdirSync('./dist/events');
        for (const folder of eventFolders) {
            const eventFiles = readdirSync(`./dist/events/${folder}`).filter((file: any) => file.endsWith('.js'));

            switch (folder) {
                case 'client':
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) client.once(event.name, (...args: any) => event.execute(...args, client));
                        else client.on(event.name, (...args: any) => event.execute(...args, client));
                    }
                    break;
                case 'mongo':
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if (event.once) connection.once(event.name, (...args: any) => event.execute(...args, client));
                        else connection.on(event.name, (...args: any) => event.execute(...args, client));
                    }
                    break;

                default:
                    break;
            }
        }
    }
}
