const Discord = require('discord.js');
var bot = new Discord.Client();

var initFG = 0

var piafchan = ""

//Declaration Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var channelStockId = "557123254947676161";  //Max, met ici l'id du channel !
 
var dataBank = []; //Contient des tableaux : C'est la base de données quand le bot est actif !

//Declaration Fonction~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function read () { //lit le stockage discord et le met dans le stockage variable

    // met le contenu des messages dans dataBank
        (bot.channels.get(channelStockId).fetchMessages({ limit: 100 }) 
            .then(messages => 
               
                messages.forEach(function(valeur , clé) {
                    dataBank.push(valeur.content.split(" * "));
                })
            )
            .catch(console.error)
        )
        
    
};

function postReserve (id) { //poste un message dans l'espace de stockage discord ( en théorie, l'id des utilisateurs ayant fait !!OwOLog)
    bot.channels.get(channelStockId).send(id);
    
}

function findUser (id) { //à partir de l'id d'un user, trouve l'indice de sa "fiche" dans le stockage => -1 si pas de fiche
    var userIndice;
    dataBank.forEach(function(valeur, clé) {
        if (id ===  valeur[0]) {
            userIndice = clé;
        }
    })
    if (userIndice === undefined) {
        return -1;
    } else { 
        return userIndice;
    }
}

function add (id, numOwO) { //Ajoute un OwO à un user
    if (findUser(id) != -1) {    
        bot.channels.get(channelStockId).fetchMessages({ limit: 100 }) //Trouve le message de stockage discord de l'user puis l'edit pour ajouter le owo
            .then(messages => 
                messages.forEach(function(msg, idMsg) {
                    if (msg.content.split(' * ')[0] == id) {
                        bot.channels.get(channelStockId).fetchMessage(idMsg)
                            .then(message => 
                                message.edit(msg.content + " * " + numOwO)
                            )
                            .catch(console.error)
                    }
                })
            )
            .catch(console.error)
        dataBank[findUser(id)].push(numOwO); //Ajoute le owo dans le stockage variable
    }
}
 
function gotOwO (id, numOwO) { //Verifie si un user a un OwO ! return true si il l'a, return false sinon
    var got = false;
    if (findUser(id) != -1 ) {
        dataBank[findUser(id)].forEach(function (valeur) {
            if (valeur === numOwO) {
                got = true;
            } 
        });
    return got;
    }
}

function Jojcalc(pv){ //transforme les point de vie en var de texte (la jauge)
    var i = 0
    var JoJ = ""
        while (i < 10)
    {
        i++;
        if (pv >= 10*i){
            JoJ+='♥ '
        }
        else{
            JoJ+='♡ '
        }
    }
    return JoJ
}

var nomai = { //stoque (temporaiement) toutes les infos sur les duels
    Un: {
      Nom: (""),
      PV: (100)
    },
    Deux: {
      Nom: (""),
      PV: (100)
    },
    Trois: {
      Nom: (""),
      PV: (100)
    },
    Quatre: {
      Nom: (""),
      PV: (100)
    },
    Cinq: {
      Nom: (""),
      PV: (100)
    },
    Six: {
      Nom: (""),
      PV: (100)
    },
  }

bot.on('ready',() => {
    console.log('Bot Ready')
})

bot.login (process.env.token);

bot.on('message', message => { //Log
  read()
  console.log("Wesh les relous, ce soir on fout le zbeul")
})

bot.on('message', message => { //help
    if(message.content === "&help"){
      var embedhelp = new Discord.RichEmbed()
        .setTitle("Infos sur le bot")
        .setDescription("Ce bot vous fais entrer dans une simulation de Trial de Danganronpa ! Je sais que cela parait farfelu, mais attendez la fin de mes explications ! >:3")
        .addField("Prefix :", "&", true)
        .addBlankField() 
        .addField("&help", "Affiche les commandes du bot.")
        .addField("&mtrial", "Réalisable uniquement par un <@&565461390731509770>, elle permet de lancer un Trial dans le lieu séléctionné")
        .setColor("#68f17d")
        .setFooter("Amusez vous bien ! - Maxoin | Baz")
        message.channel.send(embedhelp);
    }
})

bot.on('message', message => { //Log
    read()
    console.log("Wesh les relous, ce soir on fout le zbeul")
  })

bot.on('message', message => { // &OwOLog ! faisable plusieurs fois !
    if (message.content.includes("Je participe")) {
        if (findUser(message.author.id) === -1) {
            postReserve(message.author.id); //stockage discord
            dataBank.push([message.author.id]); //stockage variable
            add(message.author.id, message.author.username)
        } else {

        }}
});
bot.on('message', message => {
 if(message.content === "0642"){
  var embedmsg = new Discord.RichEmbed()
   .setTitle("~**GROS TOURNOIS SES GRANDS MORTS, OLALA**~")
   .setDescription("Dans quelques jours aura lieu un tournoi de duels magiques !\nEt j'aurais besoin de vos participations dans la boite grace à un petit\n*''Je participe''*")
   .setThumbnail("https://media.discordapp.net/attachments/517283327099797504/555105881600032784/gif1.gif?width=473&height=473")
   bot.channels.get("568193436365094912").send(embedmsg)
 }
})
