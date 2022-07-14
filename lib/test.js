const wchat = require("./wchat.js")

let token = wchat.getToken()

let msg = wchat.createMsg("测试信息，通知一下", "http://www.baidu.com")

let sent = wchat.sendMsg(token, msg)

console.log(sent)