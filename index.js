const Discord = require("discord.js")
const client = new Discord.Client()
const db = require("quick.db")
const config = require('./config.json')
client.login(config.token)
client.on('ready', async ()=> {
    client.user.setActivity(`AntiPD Wassim v2`, { type: "PLAYING" })

console.log(`----------- AntiPD Wassim v2 -----------`)
console.log(` - Connecter sur ${client.user.tag}`)
console.log(`----------------------------------------`)


})


client.on("message", async (message ) => {
    if(message.author.id === client.user.id) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


if(command === "pd") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.edit("Ta pas assez de perm sur ce serveur")
    if(!message.member.hasPermission("MOVE_MEMBERS")) return message.edit("Ta pas assez de perm sur ce serveur")

    message.delete()
    if(!args[0]) return  message.channel.send('Merci *__d\'entrer un usage corect__* sois `add`, `remove`, `list` ou `reset` ')
    if(args[0] === "add") {

        let user =  message.mentions.users.first()
        if(!user) {
           
          
    
             message.channel.send("Merci de metionner quelqu'un qui deviendrat pd !")
        }
        let trustedusers = db.get(`trustedusers_${client.user.id}`)
        if(trustedusers && trustedusers.find(find => find.user == user.id)) {
            return message.channel.send(`Ce membres est déjà pd !`)
            }
let data = {
    user: user.id
}
        db.push(`trustedusers_${client.user.id}`, data)
      

        return message.channel.send(`J'ai ajouter *__${user.tag}__* à la liste des pd !`);
    } else if(args[0] === "remove") {

        let user =  message.mentions.users.first()
        if(!user) {
           
          
    
             message.channel.send("Merci d'entrer une id valide !")
        }
        let database = db.get(`trustedusers_${client.user.id}`)
        if(database) {
            let data = database.find(x => x.user === user.id)
     
          
            if(!data) return message.channel.send(`Je ne trouve pas ce membres dans la liste des pd !`)
          
            let value = database.indexOf(data)
            delete database[value]
          
            var filter = database.filter(x => {
              return x != null && x != ''
            })
          
            db.set(`trustedusers_${client.user.id}`, filter)
            return message.channel.send(`J'ai enlever *__${user.tag}__* de la liste des pd !`);

          
        } else {          
     message.channel.send(`Je ne trouve pas ce membres dans la liste des pd !`)
        }
    } else if(args[0] === "list") {

  let database = db.get(`trustedusers_${client.user.id}`)

  if(database && database.length) {
     let array =[]
       database.forEach(m => {
       array.push(` - <@${m.user}>`)
     })
     return message.channel.send(`**__Liste des pd:__**\n\n${array.join("\n")}`);

    }
   
    } else if(args[0] === "reset") {
        if(db.get(`trustedusers_${client.user.id}`) === null )        return message.channel.send(`La database n'est pas encore configurer *__tu ne peux donc pas la reset__* !`);

        db.delete(`trustedusers_${client.user.id}`)
        return message.channel.send(`J'ai reset *__la liste des pd__* avec succès !`);
    }
    
  
}



if(command === "help") {
    message.delete()
    message.channel.send(`**__AntiPD Wassim v2__**\n\n\`help\`: **permet de voir les commandes de l'antipd**\n\`pd (add/remove/list/reset)\`: **permet gerer les pd**`);

}

}

})
client.on("voiceStateUpdate", (oldMember, newMember) => {


        let trustedusers = db.get(`trustedusers_${client.user.id}`)
        if(trustedusers && trustedusers.find(find => find.user == newMember.id)) {
            newMember.kick()
  

    } 

})


client.on("message", async (message ) => {
  

        let trustedusers = db.get(`trustedusers_${client.user.id}`)
        if(trustedusers && trustedusers.find(find => find.user == message.member.id)) {
          message.delete()
          
    


        }  else {
            return;
        }

   
})