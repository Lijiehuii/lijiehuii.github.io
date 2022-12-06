function ajax(option) {
    return new Promise((resolve, reject) => {
        option = Object.assign({
            timeout: 5000,
            type: 'GET'
        }, option)

        var data = option.data  // {name: 123, age: 5} => 'name=123&age=5'

        var dataStr = ''

        for (var key in data) {
            dataStr += key + '=' + data[key] + '&'
        }
        // 去掉多余的&
        dataStr = dataStr.substring(0, dataStr.length - 1)

        var xhr = new XMLHttpRequest()

        var timer = setTimeout(function () {
            // 超时
            reject('网络超时')
            xhr.abort()
        }, option.timeout)

        xhr.onreadystatechange = function () {

            if (xhr.readyState == 4) {
                clearTimeout(timer)
                if (xhr.status == 200) {
                    // 请求成功获取数据
                    // 获取文本数据 

                    data = xhr.responseText;
                    resolve(data);
                } else {
                    data = xhr.responseText;
                    reject(data)
                }
            }
        }


        xhr.open(option.type, option.url)

        if (option.type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        }

        xhr.send(dataStr)
    })
}

