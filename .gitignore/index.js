const Discord = require('discord.js');
var bot = new Discord.Client();

var varlvl = 0
var catnum = ""
var salon = ""
var kispawn1 = 0
var initDuelUn= 0
var initDuelDeux= 0
var NumberOwOFin = 0
var NumberOwO = 0
var yuser = ""

//Declaration Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var channelStockId = "556218122026352641";  //Max, met ici l'id du channel !

var channelStockIdK = "555852140849922068"; 

var dataBank = []; //Contient des tableaux : C'est la base de données quand le bot est actif !

var dataBankK = [];

var channelStockIdF = "558001965972455454"; 

var dataBankF = []; 

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

function readF () { //lit le stockage discord et le met dans le stockage variable

    // met le contenu des messages dans dataBank
        (bot.channels.get(channelStockIdF).fetchMessages({ limit: 100 }) 
            .then(messages => 
               
                messages.forEach(function(valeur , clé) {
                    dataBankF.push(valeur.content.split(" * "));
                })
            )
            .catch(console.error)
        )
        
    
};

function readK () { //lit le stockage discord et le met dans le stockage variable

    // met le contenu des messages dans dataBank
        (bot.channels.get(channelStockIdK).fetchMessages({ limit: 100 }) 
            .then(messages => 
               
                messages.forEach(function(valeur , clé) {
                    dataBankK.push(valeur.content.split(" * "));
                })
            )
            .catch(console.error)
        )
        
    
};

function postReserve (id) { //poste un message dans l'espace de stockage discord ( en théorie, l'id des utilisateurs ayant fait !!OwOLog)
    bot.channels.get(channelStockId).send(id);
    bot.channels.get(channelStockIdF).send(id);
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
 
function FricChange (id, numOwO) { //Ajoute un OwO à un user
    if (findUser(id) != -1) {    
        bot.channels.get(channelStockIdF).fetchMessages({ limit: 100 }) //Trouve le message de stockage discord de l'user puis l'edit pour ajouter le owo
            .then(messages => 
                messages.forEach(function(msg, idMsg) {
                    if (msg.content.split(' * ')[0] == id) {
                        bot.channels.get(channelStockIdF).fetchMessage(idMsg)
                            .then(message => 
                                message.edit(id + " * " + numOwO)
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
            JoJ+=':heart: '
        }
        else{
            JoJ+='♡ '
        }
    }
    return JoJ
}

var duel = { //stoque (temporaiement) toutes les infos sur les duels
    Un: {
      Channel: (""),
      Idj1: (""),
      PVj1: (""),
      Idj2: (""),
      PVj2: (""),
    },
    Deux: {
      Channel: (""),
      Idj1: (""),
      PVj1: (""),
      Idj2: (""),
      PVj2: (""),
    }
}

bot.on('ready',() => {
    console.log('Bot Ready')
})

bot.login (process.env.token);

bot.on('message', message => { //help
    if(message.content === "&help"){
      var embedhelp = new Discord.RichEmbed()
        .setTitle("Infos sur le bot")
        .setDescription("Ce bot vous donnes la possibilitée de possédé des Kyard, des cartes vous donnant leurs pouvoir afin de vous en servir dans des duels de monstres !")
        .addField("Prefix :", "&", true)
        .addBlankField() 
        .addField("&help", "Affiche les commandes du bot.")
        .addField("&OwOLog", "Commande pour se connecter au Bot. Nécéssaire qu'une seule fois.")
        .addField("&pack", "Voici la commande à réaliser pour l'achat d'un Pakei.")
        .setColor("#68f17d")
        .setFooter("Amusez vous bien ! - Maxoin | Baz")
        message.channel.send(embedhelp);
    }
  })

bot.on('message', message => {
  if(message.content === "665-82"){
    var wazo = dataBank[findUser(message.author.id)][1]
    console.log(wazo)
  }
})

bot.on('message', message => { // &OwOLog ! faisable plusieurs fois !
    if (message.content === "&OwOLog") {
        read();
        if (findUser(message.author.id) === -1) {
            postReserve(message.author.id); //stockage discord
            dataBank.push([message.author.id]); //stockage variable
            FricChange(message.author.id, 600)
            message.channel.send("Ok, c'est noté !")
        } else {
            message.channel.send("Tu es déjà enregistré ! Tu n'as pas à refaire cette commande.")
        }
    }
});

bot.on('message', message => { //Log
    read()
    readK()
    readF()
    console.log("Wesh les relous, ce soir on fout le zbeul")
  })

bot.on('message', message => { //Achat Pack
  if(message.content === "&pack"){
    var kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p1 = kispawn
    add(message.author.id, dataBankK[p1][0])
    kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p2 = kispawn
    add(message.author.id, dataBankK[p2][0])
    kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p3 = kispawn
    add(message.author.id, dataBankK[p3][0])
    kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p4 = kispawn
    add(message.author.id, dataBankK[p4][0])
    kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p5 = kispawn
    add(message.author.id, dataBankK[p5][0])
    kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p6 = kispawn
    add(message.author.id, dataBankK[p6][0])
    kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p7 = kispawn
    add(message.author.id, dataBankK[p7][0])
    kispawn =  Math.floor(Math.random() * Math.floor(7))
    var p8 = kispawn
    add(message.author.id, dataBankK[p8][0])
    FricChange(message.author.id, dataBankF[message.author.id][1] - 100)
    var embedpak = new Discord.RichEmbed()
        .setTitle("Ouverture de Pakei\nVous remportez :")
        .setDescription("Il vous restes " + dataBank[findUser(message.author.id)][1])
        .addField(":arrow_forward: " + dataBankK[p1][1], ". . . . .")
        .addField(":arrow_forward: " + dataBankK[p2][1], ". . . . .")
        .addField(":arrow_forward: " + dataBankK[p3][1], ". . . . .")
        .addField(":arrow_forward: " + dataBankK[p4][1], ". . . . .")
        .addField(":arrow_forward: " + dataBankK[p5][1], ". . . . .")
        .addField(":arrow_forward: " + dataBankK[p6][1], ". . . . .")
        .addField(":arrow_forward: " + dataBankK[p7][1], ". . . . .")
        .addField(":arrow_forward: " + dataBankK[p8][1], ". . . . .")
        .setFooter("Regardez votre collection avec un &card (WIP)")
    message.channel.send(embedpak)

}})
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
/////UN/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
bot.on('message', message => { //Duel1
    if(message.content === "&duel" && initDuelUn === 0){
        if(findUser(message.author.id) === -1){
            message.channel.send("Tu n'es pas enregistré !")
        }else{
            duel.Un.Idj1 = message.author.id,
            message.channel.send('Qui sera votre Adversaire, <@' + duel.Un.Idj1 + '> ?')
            initDuelUn = 1;
            duel.Un.Channel = message.channel.id
            duel.Un.PVj1 =4000
            duel.Un.PVj2 =4000
            console.log(initDuelUn)
    }}})
  bot.on('message', message => { //Duel2
    if(message.content[0]+ message.content[1] === "<@" && initDuelUn === 1 && message.content.length === 21) {
      duel.Un.Idj2 = message.content[2]+ message.content[3]+message.content[4]+ message.content[5]+message.content[6]+ message.content[7]+message.content[8]+ message.content[9]+message.content[10]+ message.content[11]+message.content[12]+ message.content[13]+message.content[14]+ message.content[15]+message.content[16]+ message.content[17]+message.content[18]+ message.content[19]
      if(findUser(duel.Un.Idj2) === -1){
        message.channel.send("Cette personne n'es pas OwOLoguée !")
         initDuelUn = 0
      }else{
        message.channel.send('<@' + duel.Un.Idj2 + '>, acceptez-vous ce défi ?\n>&Oui\n>&Non')
        console.log(duel.Un.Idj2)
        initDuelUn = 2
    }}})
  
  bot.on('message', message => { //Duel3
    if(message.content === "&Oui" && message.author.id === duel.Un.Idj2){
        message.channel.send('Bien ! Que le combat commence !!')
        console.log(duel.Un.Idj2)
        initDuelUn = 3
    }else if(message.content === "&Non" && message.author.id === duel.Un.Idj2){
      message.channel.send('Le duel est alors annulé !')
      initDuelUn = 0
        duel.Un.Channel = ""
        duel.Un.PVj1 = 4000
        duel.Un.PVj2 = 4000
        duel.Un.Idj1 = ""
        duel.Un.Idj2 = "" 
      }})
  
  
  bot.on('message', message => {//Victoire
    if(duel.Un.PVj1 <= 0 && initDuelUn === 3){
        message.channel.send("<@" + duel.Un.Idj1 + "> est K.O !\n<@" + duel.Un.Idj2 + "> remporte la victoire !!")
        initDuelUn = 0
        duel.Un.Channel = ""
        duel.Un.PVj1 = 4000
        duel.Un.PVj2 = 4000
        duel.Un.Idj1 = ""
        duel.Un.Idj2 = ""
    }else if(duel.Un.PVj2 <= 0 && initDuelUn === 3){
        message.channel.send("<@" + duel.Un.Idj2 + "> est K.O !\n<@" + duel.Un.Idj1 + "> remporte la victoire !!")
        initDuelUn = 0
        duel.Un.Channel = ""
        duel.Un.PVj1 = 4000
        duel.Un.PVj2 = 4000
        duel.Un.Idj1 = ""
        duel.Un.Idj2 = ""
    }})
  /////DEUX/////
  bot.on('message', message => { //Duel1
    if (message.content === "&duel" && initDuelDeux === 0){
      if(duel.Un.Channel === ""){
        
      }else{
        duel.Deux.Idj1 = message.author.id,
        message.channel.send('Qui sera votre Adversaire, <@' + duel.Deux.Idj1 + '> ?')
        initDuelDeux = 1;
        duel.Deux.Channel = message.channel.id
        duel.Deux.PVj1 =4000
        duel.Deux.PVj2 =4000
        console.log(initDuelDeux)
    }}})
  
  bot.on('message', message => { //Duel2
    if(message.content[0]+ message.content[1] === "<@" && initDuelDeux === 1 && message.content.length === 21) {
      duel.Deux.Idj2 = message.content[2]+ message.content[3]+message.content[4]+ message.content[5]+message.content[6]+ message.content[7]+message.content[8]+ message.content[9]+message.content[10]+ message.content[11]+message.content[12]+ message.content[13]+message.content[14]+ message.content[15]+message.content[16]+ message.content[17]+message.content[18]+ message.content[19]
        message.channel.send('<@' + duel.Deux.Idj2 + '>, acceptez-vous ce défi ?\n>&Oui\n>&Non')
        console.log(duel.Deux.Idj2)
        initDuelDeux = 2
    }})
  
  bot.on('message', message => { //Duel3
    if(message.content === "&Oui" && message.author.id === duel.Deux.Idj2){
        message.channel.send('Bien ! Que le combat commence !!')
        console.log(duel.Deux.Idj2)
        initDuelDeux = 3
    }else if(message.content === "&Non" && message.author.id === duel.Deux.Idj2){
      message.channel.send('Le duel est alors annulé !')
      initDuelDeux = 0
        duel.Deux.Channel = ""
        duel.Deux.PVj1 = 4000
        duel.Deux.PVj2 = 4000
        duel.Deux.Idj1 = ""
        duel.Deux.Idj2 = "" 
      }})
  bot.on('message', message => {//Victoire
    if(duel.Deux.PVj1 <= 0 && initDuelDeux === 3){
        message.channel.send("<@" + duel.Deux.Idj1 + "> est K.O !\n<@" + duel.Deux.Idj2 + "> remporte la victoire !!")
        initDuelDeux = 0
        duel.Deux.Channel = ""
        duel.Deux.PVj1 = 4000
        duel.Deux.PVj2 = 4000
        duel.Deux.Idj1 = ""
        duel.Deux.Idj2 = ""
    }else if(duel.Deux.PVj2 <= 0 && initDuelDeux === 3){
        message.channel.send("<@" + duel.Deux.Idj2 + "> est K.O !\n<@" + duel.Deux.Idj1 + "> remporte la victoire !!")
        initDuelDeux = 0
        duel.Deux.Channel = ""
        duel.Deux.PVj1 = 4000
        duel.Deux.PVj2 = 4000
        duel.Deux.Idj1 = ""
        duel.Deux.Idj2 = ""
    }})
