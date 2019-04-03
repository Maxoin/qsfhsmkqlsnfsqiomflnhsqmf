const Discord = require('discord.js');
var bot = new Discord.Client();

var initFG = 0

var piafchan = ""

//Declaration Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var channelStockId = "562731733880012801";  //Max, met ici l'id du channel !
 
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
    Sept: {
      Nom: (""),
      PV: (100)
    },
    Huit: {
      Nom: (""),
      PV: (100)
    },
  }

bot.on('ready',() => {
    console.log('Bot Ready')
})

bot.login ("process.env.token");

bot.on('message', message => { //Log
  read()
  console.log("Wesh les relous, ce soir on fout le zbeul")
})

bot.on('message', message => { //help
    if(message.content === "&help"){
      var embedhelp = new Discord.RichEmbed()
        .setTitle("Infos sur le bot")
        .setDescription("Ce bot vous donnes la possibilitée de participer au Fluffer Gam ! Un combat sans merci ou s'affrontes plusieurs participants pour se disputer le titre de Fluff Ultime !")
        .addField("Prefix :", "&", true)
        .addBlankField() 
        .addField("&help", "Affiche les commandes du bot.")
        .setColor("#68f17d")
        .setFooter("Amusez vous bien ! - Maxoin | Baz")
        message.channel.send(embedhelp);
    }
  })

bot.on('message', message => { //Log
    read()
    console.log("Wesh les relous, ce soir on fout le zbeul")
  })

bot.on('message', message => { //Création d'un Fluffer Gam
  if(message.content === "&fg"){
    if(initFG === 0){
      piafchan = message.channel.id
      message.channel.send("OwO\nQui seront les participants aux Fluffer Gam ? >:3\n\n*Utilisez un nom à la fois, pour finnallement en avoir 8*")
      initFG = 1
    }else{
      message.channel.send("ÈwÉ\nUn Fluffer Gam est déjà en cours !")
}}})

bot.on('message', message => { //Nom1
  if(initFG === 1 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[1].Nom = message.content
        message.channel.send("Oh ? Qui d'autres ?\n*7 Restants*")
        initFG = 2
  }else{
      nomai[1].Nom = message.content
      message.channel.send("Oh ? Qui d'autres ?\n*7 Restants*")
      initFG = 2
}})

bot.on('message', message => { //Nom2
  if(initFG === 2 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[2].Nom = message.content
        message.channel.send("Oh ? Qui d'autres ?\n*6 Restants*")
        initFG = 3
  }else{
      nomai[2].Nom = message.content
      message.channel.send("Oh ? Qui d'autres ?\n*6 Restants*")
      initFG = 3
}})

bot.on('message', message => { //Nom3
  if(initFG === 3 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[3].Nom = message.content
        message.channel.send("Oh ? Qui d'autres ?\n*5 Restants*")
        initFG = 4
  }else{
      nomai[3].Nom = message.content
      message.channel.send("Oh ? Qui d'autres ?\n*5 Restants*")
      initFG = 4
}})

bot.on('message', message => { //Nom4
  if(initFG === 4 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[4].Nom = message.content
        message.channel.send("Oh ? Qui d'autres ?\n*4 Restants*")
        initFG = 5
  }else{
      nomai[4].Nom = message.content
      message.channel.send("Oh ? Qui d'autres ?\n*4 Restants*")
      initFG = 5
}})

bot.on('message', message => { //Nom5
  if(initFG === 5 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[5].Nom = message.content
        message.channel.send("Oh ? Qui d'autres ?\n*3 Restants*")
        initFG = 6
  }else{
      nomai[5].Nom = message.content
      message.channel.send("Oh ? Qui d'autres ?\n*3 Restants*")
      initFG = 6
}})

bot.on('message', message => { //Nom6
  if(initFG === 6 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[6].Nom = message.content
        message.channel.send("Oh ? Qui d'autres ?\n*2 Restants*")
        initFG = 7
  }else{
      nomai[6].Nom = message.content
      message.channel.send("Oh ? Qui d'autres ?\n*2 Restants*")
      initFG = 7
}})

bot.on('message', message => { //Nom7
  if(initFG === 7 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[7].Nom = message.content
        message.channel.send("Oh ? Qui sera le dernier ?\n*1 Restant*")
        initFG = 8
  }else{
      nomai[7].Nom = message.content
      message.channel.send("Oh ? Qui sera le dernier ?\n*1 Restant*")
      initFG = 8
}})

bot.on('message', message => { //Nom8
  if(initFG === 8 && piafchan === message.channel.id){
      var trouv = findUser(message.content)
      if(trouv === -1)
        postReserve(message.content)
        nomai[8].Nom = message.content
        message.channel.send("Bien ! Et bien que le Fluffer Gam commence ! >:3")
        initFG = 9
  }else{
      nomai[8].Nom = message.content
      message.channel.send("Bien ! Et bien que le Fluffer Gam commence ! >:3")
      initFG = 9
}})

bot.on('message', message => { //Nom8
  if(initFG === 9 && piafchan === message.channel.id && message.content === "&n"){
    var saipourki = Math.floor(Math.random() * Math.floor(8))  
    var ispaskwa = 1
    if(ispaskwa === 1){
      message.channel.send(nomai[saipourki] + " se perd dans la forêt pendant une heure. '^'")
    }
}})