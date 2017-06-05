var youtubeApi = youtubeApi || {};
youtubeApi.videoList = (function (ajaxCall){
    var SEARCH_LIST_URL = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&part=snippet&type=video&maxResults=15&pageToken=',
        VIDEO_LIST_URL = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y&part=snippet,statistics&pageToken=';
    
    function createArrayOfVideoObjects (videoList) {
        var temperoryObject,
            videoListObject = [];
        videoList.items.forEach(function (item) {
            temperoryObject = {
                title: item.snippet.title
                , description: item.snippet.description
                , channelTitle: item.snippet.channelTitle
                , publishedAt: item.snippet.publishedAt.substr(0, 10)
                , thumbnailUrl: item.snippet.thumbnails.medium.url
                , thumbnailWidth: item.snippet.thumbnails.high.width
                , thumbnailHeight: item.snippet.thumbnails.high.height
                , videoId: item.id
                , channelId: item.snippet.channelId
                , viewCount: item.statistics.viewCount
            };
            videoListObject.push(temperoryObject);
        });
        return videoListObject;
    }
    
    function getVideoList(searchValue, nextPageToken) {
        var listOfIds = [],
            data;
        return ajaxCall.getPromise(SEARCH_LIST_URL + nextPageToken + '&q=' + searchValue).then(function (responseData) {
            data = JSON.parse(responseData);
            data.items.forEach(function (item) {
                listOfIds.push(item.id.videoId);
            });
            return listOfIds;
        }).then(function (listOfIds) {
            return ajaxCall.getPromise(VIDEO_LIST_URL + nextPageToken + '&id=' + listOfIds.join(','));
        }).then(function (videoList) {
            return createArrayOfVideoObjects(JSON.parse(videoList));
        });
    }
    
    return {
        getVideoList: getVideoList
    };
    
})(youtubeApi.ajaxRequest);