const urls = {
  tenantId: "",
  openId: "",
}
// dev
// Vue.prototype.localurl='https://gateway-bak-daily.itrigger.cn/eis-scene';
// Vue.prototype.baseurl='https://eis-dev.itrigger.cn/eis';

// UAT
// Vue.prototype.baseurl='https://eis-qa.itrigger.cn/eis';
// Vue.prototype.localurl='https://gateway-bak-uat.itrigger.cn/eis-scene';
let widget = {
    api: {
        localurl: "https://gateway-bak-daily.itrigger.cn/eis-scene",
        baseurl: "https://eis-dev.itrigger.cn/eis",
    },
    setApi: function () {
        var query = location.href.split('?')[1].split('&');
        var iOptions = {}
        for (var i = 0; i < query.length; i++) {
            var queryArr = query[i].split('=');
            iOptions[queryArr[0]] = queryArr[1]
        }

        urls.tenantId = iOptions.tenantId;
        urls.openId = iOptions.openId;
        localStorage.setItem('api', JSON.stringify(urls));
        widget.api.url = urls.url;
        widget.api.test_url = urls.url;
    },
    getApi: function () {
        var api = JSON.parse(localStorage.getItem('api'));
        return api
    },
    qs: function (json) {//序列化json
        var str = '';
        for (var i in json) {
            str += i + '=' + json[i] + '&';
        }
        return str.substring(0, str.length - 1);
    },
    iFormat: function (val) {
        var str = '';
        if (val < 10) {
            str = '0' + val;
        } else {
            str = val;
        }
        return str;
    }
};
