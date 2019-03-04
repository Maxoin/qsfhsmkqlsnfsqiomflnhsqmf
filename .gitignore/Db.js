//*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*//
/*

        SYSTEME DE STOCKAGE DE DONNEES SUR DISCORD, V. 1.0 A
                DESTINEE AU BOT POKECOLO [!!]

            Fait par Baz#8025 pour Maxoin#2469

*/
//*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*//



//Declaration Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var channelStockId = "552143842309046272";  //Max, met ici l'id du channel !

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
        );
    
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
    if (userIndice == undefined) {
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



//Declaration Commandes~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~




bot.on('message', message => { // !!OwOLog ! faisable plusieurs fois !

    if (message.content === "!!OwOLog") {
        read();
        if (findUser(message.author.id) == -1) {
            postReserve(message.author.id); //stockage discord
            dataBank.push([message.author.id]); //stockage variable
            message.reply("tu es désormais enregistré !")
        } else {
            message.reply("tu es déjà enregistré ! Tu n'as pas à refaire cette commande.")
        }
    }



});

bot.on('message', message => {// commande de test à supprimer ! fait "add " + "quelque chose" pour edit ton message dans le stockage discord.

    if (message.content.split(' ')[0] === "add") {
        add(message.author.id, message.content.split(' ')[1] );
    }

});

bot.on('message', message => {// same ^^^^ fait "check " + "quelque chose" pour vérifier si tu l'as dans ton message dans le stockage discord. (le bot return un boolean)

    if(message.content.split(' ')[0] === "check") {

    
        if(gotOwO(message.author.id, message.content.split(' ')[1] )) {

            message.reply("true");
        }else {
            message.reply("false");
        }
    }

});



/* GUIDE DESTINE A MAX

Dans l'ordre, à quoi servent les choses :


channelStockId ===> L'id de ton channel de stockage ! Il faut que le bot puisse être dessus, et vaux mieux éviter que quelqu'un puisse y écrire.
dataBank ===> Simplement, le tableau qui contient toute les données ! Demandes moi si tu veux modifier/rajouter des choses, je t'expliquerais 
    comment il marche.


read() ===> Met les infos du stockage discord dans dataBank ! Il faut ABSOLUMENT le faire à chaque redemarrage du bot, d'une façon ou d'une 
    autre. /!\ Sinon tu auras pas tes données !
postReserve() ===> Met un message dans le stockage discord, normalement, c'est que l'id des joueurs qui s'inscrivent, mais on sait jamais, tu 
    pourrais en avoir besoin !
findUser() ===> Permet, en gros, d'avoir l'indice (le numéro) de la fiche d'un user (un tableau stocké dans dataBank) à partir de son id ! 
    Attention : si l'user n'a pas de fiche, ça te donnera -1. => pour vérifier qu'un user a une fiche, fait if (findUser(id) == -1){}, ça sera
    exécuté que si il en a une !
add() ===> ajoute une MOwOnster à la fiche de quelqu'un, avec son id et le numéro/la lettre/le mot/ l'indice de ton MOwOnstre (tu y mets ce que 
    tu veux, en fait, ça te laissera plus de liberté)
gotOwO() ===> Verifie si quelqu'un possède un MOwOnster ! Tu mets l'id de l'user et le numéro/la lettre/le mot/ l'indice de ton MOwOnstre. Utilises
    ça pour faire les gifs dispos !


!!OwOLog ===> Commande de démarrage ! Elle répond en mentionnant, modifie ça si tu veux. Tu peux la faire plusieurs fois, elle te dira de manger
    tes morts sans tuer ta fiche. Si tu en as pas, elle la crée avec juste ton id dans le stockage discord.
add ===> tu mets un espace et un numéro/une lettre/un mot/un indice et le bot ajoutera ça sur ta fiche. Supprimes là ou edit là pour empêcher les 
    gens de l'utiliser. Si tu veux te give des MOwOnsters tu pourras le faire avec ça.
check ===> tu mets un espace et un numéro/une lettre/un mot/un indice et le bot te mentionnera, il dira true si c'est dans ta fiche, sinon il dira
    false




*/
