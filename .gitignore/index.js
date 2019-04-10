const Discord = require('discord.js');
var bot = new Discord.Client();

var initFG = 0

var piafchan = ""

//Declaration Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var channelStockId = "565462540264669184";  //Max, met ici l'id du channel !
 
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

bot.on('message', message => {
    if(message.content.includes("Emilia :") && message.author.id === "366263554711486468"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Max :") && message.author.id === "258571960987025408"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
        
    }
})

bot.on('message', message => {
    if(message.content.includes("Anabelle :") && message.author.id === "366263554711486468"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Lily :") && message.author.id === "394217638701694986"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Oscar :") && message.author.id === "394217638701694986"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Zélia :") && message.author.id === "394217638701694986"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Tiana :") && message.author.id === "339848621908426752"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Oliver :") && message.author.id === "339848621908426752"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Naomi :") && message.author.id === "339848621908426752"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Yoan :") && message.author.id === "258571960987025408"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Axel :") && message.author.id === "258571960987025408"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})

bot.on('message', message => {
    if(message.content.includes("Elli :") && message.author.id === "366263554711486468"){
        if(message.channel.id === "565544998943064064"){ //Classe 1-1
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546770562809876")
            }
        }
        if(message.channel.id === "565545063283949578"){ //Classe 1-2
            if(message.content.includes("&go <#565456384590741509>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565544957465722891"){ //Couloir
            if(message.content.includes("&go <#565544998943064064>")){
                message.author.addRole("565546770562809876")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545063283949578>")){
                message.author.addRole("565546768935419905")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545374379409428>")){
                message.author.addRole("565540259866214427")
                message.author.removeRole("565540921018417152")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540921018417152")
            }
        }
        if(message.channel.id === "565545374379409428"){ //Cuisine
            if(message.content.includes("&go <#565544957465722891>")){
                message.author.addRole("565540921018417152")
                message.author.removeRole("565546768935419905")
            }
            if(message.content.includes("&go <#565545233509777409>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565546768935419905")
            }
        }
        if(message.channel.id === "565545233509777409"){ //Couloir-Dortoir
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540250173177867")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545540725506059>")){
                message.author.addRole("565543504659611688")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545555502301184>")){
                message.author.addRole("565543501903691793")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545661521461248>")){
                message.author.addRole("565542840948752410")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545718375251998>")){
                message.author.addRole("565542842659766272")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545752051318784>")){
                message.author.addRole("565540922532823077")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545784679071754>")){
                message.author.addRole("565540924202024960")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565546271763333125>")){
                message.author.addRole("565540923627536384")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545823413469205>")){
                message.author.addRole("565542839002595368")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545852521938964>")){
                message.author.addRole("565542839446929428")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565545868103647233>")){
                message.author.addRole("565542840940101662")
                message.author.removeRole("565540259018833920")
            }
            if(message.content.includes("&go <#565598599602241536>")){
                message.author.addRole("565543228049326092")
                message.author.removeRole("565540259018833920")
            }
        }
        if(message.channel.id === "565545510128320535"){ //Chambre Max
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540250173177867")
            }
        }
        if(message.channel.id === "565545540725506059"){ //Chambre Yoan
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543504659611688")
            }
        }
        if(message.channel.id === "565545555502301184"){ //Chambre Axel
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543501903691793")
            }
        }
        if(message.channel.id === "565545661521461248"){ //Chambre Emilia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840948752410")
            }
        }
        if(message.channel.id === "565545718375251998"){ //Chambre Anabelle
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542842659766272")
            }
        }
        if(message.channel.id === "565545752051318784"){ //Chambre Lily
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540922532823077")
            }
        }
        if(message.channel.id === "565545784679071754"){ //Chambre Oscar
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540924202024960")
            }
        }
        if(message.channel.id === "565546271763333125"){ //Chambre Zélia
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565540923627536384")
            }
        }
        if(message.channel.id === "565545823413469205"){ //Chambre Tiana
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839002595368")
            }
        }
        if(message.channel.id === "565545852521938964"){ //Chambre Olivier
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542839446929428")
            }
        }
        if(message.channel.id === "565545868103647233"){ //Chambre Naomi
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565542840940101662")
            }
        }
        if(message.channel.id === "565598599602241536"){ //Chambre Elli
            if(message.content.includes("&go <#565545510128320535>")){
                message.author.addRole("565540259018833920")
                message.author.removeRole("565543228049326092")
            }
        }
    }
})
