/*
 */
/**
 *
 * 大模型demo，运行参考readme.md
 *
 * 此demo只是一个简单的调用示例，不适合用到实际生产环境中
 *
 * 大模型 WebAPI 接口调用示例 接口文档（必看）：https://www.xfyun.cn/doc/spark/Web.html#_1-%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E
 * 错误码链接：
 * https://www.xfyun.cn/doc/tts/online_tts/API.html
 * https://www.xfyun.cn/document/error-code （code返回错误码时必看）
 *
 */

import * as CryptoJS from 'crypto-js'

// 地址必须填写，代表着大模型的版本号！！！！！！！！！！！！！！！！
let httpUrl = new URL("https://spark-api.xf-yun.com/v3.1/chat");
let modelDomain: string; // V1.1-V3.5动态获取，高于以上版本手动指定
//APPID，APISecret，APIKey在https://console.xfyun.cn/services/cbm这里获取
const APPID = 'e8b16518'
const API_SECRET = 'NTQzZWJlMGE3NTU0M2EyODQ5MDU1YmRk'
const API_KEY = '41c21254d6ede7ae183fa56b66b752ba'

var total_res = "";

function getWebsocketUrl(): Promise<string> {
    // console.log(httpUrl.pathname)
    // 动态获取domain信息
    switch (httpUrl.pathname) {
        case "/v1.1/chat":
            modelDomain = "lite";
            break;
        case "/v2.1/chat":
            modelDomain = "generalv2";
            break;
        case "/v3.1/chat":
            modelDomain = "generalv3";
            break;
        case "/v3.5/chat":
            modelDomain = "generalv3.5";
            break;
    }

    return new Promise((resolve, reject) => {
        var apiKey = API_KEY
        var apiSecret = API_SECRET


        var url = 'wss://' + httpUrl.host + httpUrl.pathname

        // console.log("我打印的" + httpUrl.host)
        // console.log("我打印的" + httpUrl.pathname)

        var host = location.host
        var date = new Date().toUTCString();
        var algorithm = 'hmac-sha256'
        var headers = 'host date request-line'
        var signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`
        var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
        var signature = CryptoJS.enc.Base64.stringify(signatureSha)
        var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
        var authorization = btoa(authorizationOrigin)
        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
        resolve(url)
    })
}

class TTSRecorder {
    appId: string;
    status: string;
    ttsWS: WebSocket | null;
    playTimeout: number | undefined;
    onWillStatusChange?: (oldStatus: string, newStatus: string) => void;
    onResult?: (result: string) => void; // 添加回调函数

    constructor({ appId = APPID } = {}) {
        this.appId = appId;
        this.status = 'init';
        this.ttsWS = null;
        this.playTimeout = 3000;
    }

    setStatus(status: string) {
        if (this.onWillStatusChange) {
            this.onWillStatusChange(this.status, status);
        }
        this.status = status;
    }

    connectWebSocket(value: string) {
        this.setStatus('ttsing');
        return getWebsocketUrl().then(url => {
            let ttsWS: WebSocket;
            if ('WebSocket' in window) {
                console.log(url);

                ttsWS = new WebSocket(url);
            } else {
                alert('浏览器不支持WebSocket');
                return;
            }
            this.ttsWS = ttsWS;
            ttsWS.onopen = (e: Event) => {
                this.webSocketSend(value);
            };
            ttsWS.onmessage = (e: MessageEvent) => {
                this.result(e.data);
            };
            ttsWS.onerror = (e: Event) => {
                clearTimeout(this.playTimeout);
                this.setStatus('error');
                alert('WebSocket报错，请f12查看详情');
                console.error(`详情查看：${encodeURI(url.replace('wss:', 'https:'))}`);
            };
            ttsWS.onclose = (e: CloseEvent) => {
                console.log(e);
            };
        });
    }

    webSocketSend(value: string) {
        console.log(modelDomain);
        console.log("appid", this.appId);
        var params = {
            "header": {
                "app_id": this.appId, "uid": "fd3f47e4-d"
            }, "parameter": {
                "chat": {
                    "domain": modelDomain, "temperature": 0.5, "max_tokens": 1024
                }
            }, "payload": {
                "message": {
                    "text": [{
                        "role": "user", "content": "你好啊"
                    }, {
                        "role": "assistant", "content": "你好，我是猪猪客服"
                    },{
                        "role": "user", "content": value
                    }]
                }
            }
        }
        console.log(JSON.stringify(params));
        if (this.ttsWS) {
            this.ttsWS.send(JSON.stringify(params));
        }
    }

    start(value: string, onResult: (result: string) => void) {
        this.onResult = onResult; // 设置回调函数
        total_res = ""; // 清空回答历史
        this.connectWebSocket(value);
    }

    result(resultData: string) {
        const jsonData = JSON.parse(resultData);
        total_res += resultData;

        if (jsonData.header.code !== 0) {
            alert(`提问失败: ${jsonData.header.code}:${jsonData.header.message}`);
            console.error(`${jsonData.header.code}:${jsonData.header.message}`);
            return;
        }

        if (jsonData.header.code === 0 && jsonData.header.status === 2) {
            if (this.ttsWS) {
                this.ttsWS.close();
            }
            this.setStatus("init");
            if (this.onResult) {
                this.onResult(total_res); // 调用回调函数
            }
        }
    }
}
// ======================开始调用=============================
let bigModel = new TTSRecorder()

// $('.audio-ctrl-btn').click(function () {
//     if (['init', 'endPlay', 'errorTTS'].indexOf(bigModel.status) > -1) {
//         bigModel.start()
//     }
// })
export function startPigAI(value: string): Promise<string> {
    console.log("我开始问了", value);

    return new Promise((resolve, reject) => {
        if (['init', 'endPlay', 'errorTTS'].indexOf(bigModel.status) > -1) {
            bigModel.start(value, (result) => {
                // 处理返回的结果
                const jsonObjectsStrings = splitJsonObjects(result);

                let resultString = '';

                jsonObjectsStrings.forEach((jsonObjectString) => {
                    try {
                        const jsonObject = JSON.parse(jsonObjectString);
                        if (jsonObject.payload && jsonObject.payload.choices && jsonObject.payload.choices.text && jsonObject.payload.choices.text.length > 0) {
                            resultString += jsonObject.payload.choices.text[0].content;
                        }
                    } catch (e) {
                        console.error("解析错误:", e);
                        reject(e); // 如果解析出错，使用reject拒绝Promise
                    }
                });

                resolve(resultString); // 使用resolve解决Promise
            });
        } else {
            reject(new Error('bigModel状态不允许开始')); // 如果状态不允许，使用reject拒绝Promise
        }
    });
}

function splitJsonObjects(jsonString:string) {
    let result = [];
    let temp = '';
    let depth = 0;

    for (let i = 0; i < jsonString.length; i++) {
        const char = jsonString[i];
        temp += char;

        if (char === '{') {
            depth++;
        } else if (char === '}') {
            depth--;
        }

        // 当深度回到0时，意味着我们已经到达了一个JSON对象的结尾
        if (depth === 0) {
            result.push(temp);
            temp = '';
        }
    }

    return result;
}

// $("#input_text").on('input propertychange', function () {
//     $('#input_text').text(this.value)
//     // console.log($("#input_text").text())
// });