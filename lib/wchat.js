const config = require("../package.json")
const res = require("sync-request")

const msg = {
    "touser": "@all",
    "msgtype": "text",
    "agentid": config.qyapi_agentid,
    "text": {
        "content": ""
    },
    "enable_duplicate_check": 0, // disabled
}

exports = module.exports = {
    "createMsg": function (title, link) {
        let content = title + '\n<a href="' + link + '">图表链接</a>'
        msg.text.content = content
        return msg
    },

    "getToken": function () {
        let url = config.qyapi_gettoken_url
            + "?corpid=" + config.qyapi_corpid
            + "&corpsecret=" + config.qyapi_corpsecret
        let openRequest = res("get", url)
        let resultBody = openRequest.body.toString()
        let resultJson = JSON.parse(resultBody)
        if (resultJson.errcode == 0) {
            console.info("Info: getToken " + url + ". Result: " + resultBody)
            return resultJson.access_token
        }else{
            console.error("Error: getToken " + url + ". Result: " + resultBody)
            return null
        }
    },

    "sendMsg": function (access_token, msg) {
        let url = config.qyapi_sendmsg_url + "?access_token=" + access_token
        let openRequest = res('POST', url, {
            json: msg,
        })
        let resultBody = openRequest.body.toString()
        let resultJson = JSON.parse(resultBody)
        if (resultJson.errcode == 0) {
            console.info("Info: sendMsg " + url + ". Result: " + resultBody)
            return true
        }else{
            console.error("Error: sendMsg " + url + ". Result: " + resultBody)
            return false
        }
    }
}