const SMTPServer = require("smtp-server").SMTPServer
const libmime = require('libmime')
const config = require("../package.json")
const wchat = require("./wchat.js")

const server = new SMTPServer({
    disabledCommands: ['STARTTLS', 'AUTH'],
    logger: true,
    onData(stream, session, callback) {
        let str = ""
        stream.on('data', chunk => {
            str += chunk
        })
        stream.on('end', () => { //stream.on('end', callback)
            callback(null)
            let title = getTitle(str)
            let link = getLink(str)
            console.info("Info: SMTP Got new email, title: " + title + ", link: " + link)

            let msg = wchat.createMsg(title, link)
            let sendResult = wchat.sendMsg(getToken(), msg)

            console.info("Info: sent result is " + sendResult)
        })
    },
})
server.listen(config.port, config.ip)

function getTitle(source) {
    let result = source.match(/Subject: (.*)/)
    return libmime.decodeWords(result[1])
}

function getLink(source) {
    let linkq = source.match(/(\/question\/\d+)/)
    return config.link_prefix + linkq[1]
}
let token_storage = {
    expire_time : null,
    access_token : null
}
function getToken() {
    let nowTime = Date.parse(new Date())
    if(token_storage.expire_time == null && (nowTime+1200) > token_storage.expire_time) {
        token_storage.access_token = wchat.getToken()
        token_storage.expire_time = nowTime
    }
    return token_storage.access_token
}


