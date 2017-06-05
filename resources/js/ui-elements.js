var youtubeApi = youtubeApi || {};
youtubeApi.uiElements = (function () {
    var templateContent,
                imageTag,
                channelTag,
                dateNode,
                viewNode,
                description,
                searchList,
                anchorTag,
                template = document.querySelector('#list-template');
    
   function createVideoElements (videoListObject) {
        document.querySelector('#search-list').innerHTML = '';
        var docFragment = document.createDocumentFragment();
       
        videoListObject.forEach(function (list) {
            templateContent = document.importNode(template.content, true);
            
            imageTag = templateContent.getElementById('image-tag');
            imageTag.setAttribute('src',list.thumbnailUrl);

            anchorTag = templateContent.querySelector('#video-title');
            anchorTag.setAttribute('href','http://www.youtube.com/watch?v='+list.videoId);
            anchorTag.innerHTML = list.title;
            
            channelTag = templateContent.getElementById('channel');
            channelTag.innerHTML = list.channelTitle;

            dateNode = templateContent.getElementById('date');
            dateNode.innerHTML = list.publishedAt;

            viewNode = templateContent.getElementById('views');
            viewNode.innerHTML = list.viewCount;

            description = templateContent.getElementById('description');
            description.innerHTML = list.description;

            docFragment.appendChild(templateContent);
        });
       
        searchList = document.getElementById('search-list');
        searchList.appendChild(docFragment);
   }
    
   return {
       createVideoElements: createVideoElements
   };
    
})();