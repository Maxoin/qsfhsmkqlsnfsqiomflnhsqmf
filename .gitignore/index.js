const Discord = require('discord.js');
var bot = new Discord.Client();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

const adapterp = new FileSync('pkmn.json')
const dbp = low(adapterp)

var catnum = ""
var salon = ""
var ideydb = ""
var idey = ""
var kispawn = 0
var NumberOwOFin = 0
var NumberOwO = 0
var yuser = ""
var gifs = {
    a: {
      nom: "à Reset",
      gif: "https://media.tenor.com/images/afdf9f5a7139daadbab681b46e9060f1/tenor.gif",
      annonce: "KUUWA ?! SALO ! TUVAMOURIR !!",
      effet: ""
    },
    b: {
      nom: "POM",
      gif: "https://i.pinimg.com/originals/b2/98/3a/b2983aa96a2c2078efd700f363c2a41c.gif",
      annonce: "Une pomme ?! OU ÇA ??!",
      effet: ""
    },
    c: {
      nom: "Kawaiiance",
      gif: "https://thumbs.gfycat.com/WellinformedDirectBorderterrier-size_restricted.gif",
      annonce: "On m'a appelé ? Jariv.",
      effet: ""
    },
    d: {
      nom: "Hachwar",
      gif: "https://i.makeagif.com/media/3-07-2016/kDRsOC.gif",
      annonce: "...",
      effet: ""
    },
    e: {
      nom: "Gaster Bluester",
      gif: "https://media1.tenor.com/images/d4e922f6079875c6627f95311c3b4cfc/tenor.gif?itemid=5879725",
      annonce: "FUYONS, BLUESTER !",
      effet: ""
    },
    f: {
      nom: "Dab",
      gif: "https://img.fireden.net/v/image/1540/37/1540371782616.gif",
      annonce: "Attaque de type poison !",
      effet: ""
    },
    g: {
      nom: "FONCEAITÊTEBAISSAIE",
      gif: "http://media.tumblr.com/359458eec13d42e28d005c7446bbfe40/tumblr_inline_nclb9rRuHl1sm1eq0.gif  ",
      annonce: "LEROOOOOOOOOOOOOOOOOOOOOOOOOOOOY...",
      effet: ""
    },
    h: {
      nom: "Viol D'âme",
      gif: "https://thumbs.gfycat.com/ForsakenComplexAmurratsnake-size_restricted.gif",
      annonce: "***9666966696669666966696666669***",
      effet: ""
    },
    i: {
      nom: "Lance-Patate",
      gif: "https://localtvwqad.files.wordpress.com/2014/10/rocket-explosion.gif?w=400&h=225&crop=1",
      annonce: "Poussez vous. Voila le Lance-Patate.",
      effet: ""
    },
    j: {
      nom: "Bulle d'Eau",
      gif: "https://data.whicdn.com/images/53032229/original.gif",
      annonce: "BLBLBLBLBLBLLBLBLBLBLBLBLBLBLLBBLLBBLLBLB",
      effet: ""
    },
    k: {
      nom: "Nonoeil d'Urgence",
      gif: "https://steamuserimages-a.akamaihd.net/ugc/394421071039533013/751406B81ABF25095895D17E4E781F7E1F011599/",
      annonce: "Je vais porté ton message ! J'y vole !",
      effet: ""
    },
    l: {
      nom: "Coup d'Corn",
      gif: "https://media1.tenor.com/images/f74ea1b96c0291c15c0939364e79bc76/tenor.gif?itemid=12592212",
      annonce: "Ça tombe bien, j'en ai pleins !",
      effet: ""
    },
    m: {
      nom: "Machouille",
      gif: "https://steamusercontent-a.akamaihd.net/ugc/960852094527687527/B8EA271FB80DE27901BF435AC47207F98F246ABD/",
      annonce: "ANYAMNYAMNYAMNYAMNYAMNYAMNYAMNYAM",
      effet: ""
    },
    n: {
      nom: "Steam Sales",
      gif: "https://i.imgur.com/VsKmvT9.gif",
      annonce: "Tu as tout dépensé avant, patate !",
      effet: ""
    },
    o: {
      nom: "Regard Cute",
      gif: "https://2.bp.blogspot.com/-G_hxgx8N1J4/WKmuDdtP42I/AAAAAAAGByg/XBAjW6J139EbLAZACLwsOeix5qnJRquNgCLcB/s1600/AW379865_12.gif",
      annonce: "Ze veux que l'on me pat.",
      effet: ""
    },
    p: {
      nom: "Pat",
      gif: "https://66.media.tumblr.com/b6492da3e16252d0d6be9a14b40f528a/tumblr_n6s3kx6dxT1tddjuxo1_500.gif",
      annonce: "Nyaa~",
      effet: ""
    },
    q: {
      nom: "Snob",
      gif: "https://orig00.deviantart.net/3059/f/2015/140/3/e/close_of_up_by_fawfuls_minion-d8u1ntf.gif",
      annonce: "Fufufufufu~",
      effet: ""
    },
    r: {
      nom: "Sasukoeil",
      gif: "https://media2.giphy.com/media/mzYQ4fp5jn9SM/source.gif",
      annonce: "あなたはまだそれを知りませんが、あなたはすでに死んでいます。",
      effet: ""
    },
    s: {
      nom: "Nomnomnom",
      gif: "https://media.giphy.com/media/39YrN5qQvUtfW/giphy.gif",
      annonce: "GATOOOOOOOONomnomnomnomnomnomnom",
      effet: ""
    },
    t: {
      nom: "Shrug",
      gif: "https://gifimage.net/wp-content/uploads/2018/11/puro-changed-gif-1.gif",
      annonce: "Hé bah ze sais pas.",
      effet: ""
    },
    u: {
      nom: "Niklavi",
      gif: "https://lh3.googleusercontent.com/-TC6LitvVzMc/WPKH_Ro4nqI/AAAAAAAAB4I/jEnC7uoJF6EnyFz6PQyOhtgmaoPG7lWoQCJoC/w290-h300-n-rw/tumblr_inline_nuls3cVXSa1si73t5_500.gif",
      annonce: "NIKAIVOU",
      effet: ""
    },
    v: {
      nom: "Starlight Unicorn MoonDance",
      gif: "https://j.gifs.com/oY7Q3B.gif",
      annonce: "Subit la puissance de Starlight Unicorn !",
      effet: ""
    },
    w: {
      nom: "Mochetée",
      gif: "https://j.gifs.com/oY7Q3B.gif",
      annonce: "https://66.media.tumblr.com/bd3c64511033f1a1ffa9ff47d95eb4dc/tumblr_nsu1h0Z2fl1uuck0ko8_400.gif",
      effet: ""
    }
}

bot.on('ready',() => {
    console.log('Bot Ready')
    console.log(gifs.q.nom)
})

bot.login (process.env.token);

// Set some defaults
db.defaults({ stats: {}})
  .write()
dbp.defaults({ mowo: {}})
  .write()

bot.on('message', message => { //help
  if(message.content === "!!help"){
    var embed = new Discord.RichEmbed()
      .setTitle("Infos sur le bot")
      .setDescription("Ce bot vous donnes la possibilitée de capturer des MOwOnster, des petites créatures toutes mignones (pour la plupart, tout du moins).")
      .addField("Prefix :", "!!", true)
      .addBlankField() 
      .addField("!!help", "Affiche les commandes du bot.")
      .addField("!!OwOLog", "Commande à ne faire qu'une fois, pour se connecter au Bot.\n/!/ La faire plusieurs fois supprimera votre progression. /!/.")
      .addField("!!cat", "Commande pour attraper un MOwOnster lorsqu'il apparait.")
      .setColor("#68f17d")
      .setFooter("Amusez vous bien ! - Maxoin | Louloup | Senchi")
      message.channel.send(embed);
  }
})

bot.on('message', message => { //OwOLogin
  if(message.content === '!!OwOLog'){
    var iday = message.author.id
    db.set("stats." + iday + ".id", iday)
    .write()
    db.set("stats." + iday + ".numowo", 1)
    .write()
    db.set("stats." + iday + ".fric", 0)
    .write()
    message.channel.send("Ok, c'est noté !\nFaites attention ! Si vous faites une nouvelle fois cette commande, vous perdrez votre progression !")
    console.log("OwOLogin")
}})

bot.on('message', message => { //Appartion MOwOnster
  if(db.has("stats." + message.author.id).value()){
    var spawn = Math.floor(Math.random() * Math.floor(100))
    if(spawn <= 10){
      kispawn = Math.floor(Math.random() * Math.floor(23))
      console.log(kispawn)
      var ideydb = dbp.get("mowo").filter({idey: kispawn}).find("nom").value()
      console.log(ideydb)
      var idey = Object.values(ideydb)
      var embedp = new Discord.RichEmbed()
        .setTitle("Un MOwOnster est apparut !")
        .addField(`C'est un ${idey[1]} !`, 'Attrape le avec un "!!cat" !')
        .setImage(idey[2])
        .setColor("#351cc0")
        bot.channels.get(message.channel.id).send(embedp)
        catnum = kispawn
        salon = message.channel.id
    }
}})

bot.on('message', message => { 
  if(message.author.id === "258571960987025408" && message.content === "!!appearforc"){
      kispawn = 2
      console.log(kispawn)
      ideydb = dbp.get("mowo").filter({idey: kispawn}).find("nom").value()
      console.log(ideydb)
      idey = Object.values(ideydb)
      var embedp = new Discord.RichEmbed()
        .setTitle("Un MOwOnster est apparut !")
        .addField(`C'est un ${idey[1]} !`, 'Attrape le avec un "!!cat" !')
        .setImage(idey[2])
        .setColor("#351cc0")
        bot.channels.get(message.channel.id).send(embedp)
      catnum = kispawn
      salon = message.channel.id
    }
})

bot.on('message', message => { //Capture
  if(db.has("stats." + message.author.id).value() && message.content === "!!cat" && salon === message.channel.id){
    yuser = message.author.id
    if(catnum === ""){
      console.log("'^'")
    }else{
      ideydb = dbp.get("mowo").filter({idey: kispawn}).find("nom").value()
      idey = Object.values(ideydb)
      NumberOwO = db.get("stats").filter({id: yuser}).find("id").value()
      NumberOwOFin = Object.values(NumberOwO)
      db.set("stats." + message.author.id + "." + idey[3] + ".nom", idey[1])
      .write()
      db.set("stats." + message.author.id + "." + idey[3] + ".image", idey[2])
      .write()
      db.set("stats." + message.author.id + "." + idey[3] + ".gif", idey[3])
      .write()
      db.set("stats." + message.author.id + ".numowo", NumberOwOFin[1] + 1)
      .write()
      catnum = "" 
      message.channel.send(`Bien jouer ! Tu viens de capturer un ${idey[1]}, COwOmbatant !`)
      
    }
  }
})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".a").value() && message.content.includes('>' + gifs.a.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.a.annonce)
      .setImage(gifs.a.gif)
      .setColor("#d28f49")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".b").value() && message.content.includes('>' + gifs.b.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.b.annonce)
      .setImage(gifs.b.gif)
      .setColor("#dc2d96")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".c").value() && message.content.includes('>' + gifs.c.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.c.annonce)
      .setImage(gifs.c.gif)
      .setColor("#e3b072")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".d").value() && message.content.includes('>' + gifs.d.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.d.annonce)
      .setImage(gifs.d.gif)
      .setColor("#72d7e3")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".e").value() && message.content.includes('>' + gifs.e.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.e.annonce)
      .setImage(gifs.e.gif)
      .setColor("#8bf3f0")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".f").value() && message.content.includes('>' + gifs.f.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.f.annonce)
      .setImage(gifs.f.gif)
      .setColor("#8a00ef")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".g").value() && message.content.includes('>' + gifs.g.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.g.annonce)
      .setImage(gifs.g.gif)
      .setColor("#ff853c")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".h").value() && message.content.includes('>' + gifs.h.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.h.annonce)
      .setImage(gifs.h.gif)
      .setColor("#002a5e")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".i").value() && message.content.includes('>' + gifs.i.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.i.annonce)
      .setImage(gifs.i.gif)
      .setColor("#e2ba40")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".j").value() && message.content.includes('>' + gifs.j.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.j.annonce)
      .setImage(gifs.j.gif)
      .setColor("#7caeec")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".k").value() && message.content.includes('>' + gifs.k.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.k.annonce)
      .setImage(gifs.k.gif)
      .setColor("#ff0000")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".l").value() && message.content.includes('>' + gifs.l.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.l.annonce)
      .setImage(gifs.l.gif)
      .setColor("#ffd3d3")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".m").value() && message.content.includes('>' + gifs.m.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.m.annonce)
      .setImage(gifs.m.gif)
      .setColor("#5b28a6")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".n").value() && message.content.includes('>' + gifs.n.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.n.annonce)
      .setImage(gifs.n.gif)
      .setColor("#ecea00")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".o").value() && message.content.includes('>' + gifs.o.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.o.annonce)
      .setImage(gifs.o.gif)
      .setColor("#ffffff")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".p").value() && message.content.includes('>' + gifs.p.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.p.annonce)
      .setImage(gifs.p.gif)
      .setColor("#edb7ff")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".q").value() && message.content.includes('>' + gifs.q.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.q.annonce)
      .setImage(gifs.q.gif)
      .setColor("#41fc44")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".r").value() && message.content.includes('>' + gifs.r.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.r.annonce)
      .setImage(gifs.r.gif)
      .setColor("#ff881c")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".s").value() && message.content.includes('>' + gifs.s.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.s.annonce)
      .setImage(gifs.s.gif)
      .setColor("#3b82db")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".t").value() && message.content.includes('>' + gifs.t.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.t.annonce)
      .setImage(gifs.t.gif)
      .setColor("#595959")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".u").value() && message.content.includes('>' + gifs.u.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.u.annonce)
      .setImage(gifs.u.gif)
      .setColor("#000000")
    message.channel.send(embed);
}})

bot.on('message', message => { //Gifs
  yuser = message.author.id
  if(db.has("stats." + message.author.id + ".v").value() && message.content.includes('>' + gifs.v.nom)){
    var embed = new Discord.RichEmbed()
      .setTitle(gifs.v.annonce)
      .setImage(gifs.v.gif)
      .setColor("#b426c1")
    message.channel.send(embed);
}})
