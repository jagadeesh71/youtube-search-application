var youtubeApi = youtubeApi || {};
youtubeApi.ajaxRequest = (function () {
    var xhrRequest = new XMLHttpRequest(),
        promise;
    
    function getPromise(url) {
        promise = new  Promise(function(resolve, reject){
            xhrRequest.open('GET',url);
            xhrRequest.send();
            xhrRequest.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(this.responseText);
                }
            };
            xhrRequest.onerror = function(){
                reject(this.statusText);
            };
        });
        return promise;
    }
    
    return {
        getPromise: getPromise
    };
})();