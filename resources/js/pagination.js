var youtubeApi = youtubeApi || {};
youtubeApi.pagination = (function (videoList, uiElements) {
    var large = {
            minWidth: 1200
            , noOfItems: 4
        }
        , medium = {
            maxWidth: 1199
            , minWidth: 992
            , noOfItems: 3
        }
        , small = {
            maxWidth: 991
            , minWidth: 768
            , noOfItems: 2
        }
        , noOfItems
        , noOfpages
        , videoList
        , currentPage
        , startIndex
        , endIndex
        , visibleItems = []
        , window_width
        , swipeStart
        , swipeEnd;
        

    function createPagination() {
        var paginationDiv = document.querySelector('.pagination');
        paginationDiv.innerHTML = '';
        for (let i = 0; i < noOfpages; i++) {
            anchorTag = document.createElement('a');
            anchorTag.innerHTML = i + 1;
            paginationDiv.appendChild(anchorTag);
        }
        highlightSelectedPage();
    }

    function highlightSelectedPage() {
        var anchorTags = document.querySelector('.pagination').childNodes;
        anchorTags.forEach(function (elem) {
            if (elem.innerHTML == currentPage) {
                elem.classList.add('active');
            }
            else {
                elem.classList.remove('active');
            }
        });
    }
    
    function moveTiles() {
        noOfItems = 1;
        
        if (swipeStart > swipeEnd) {
            currentPage++;
        } else {
            currentPage--;
        }
        
        if(currentPage < 1) {
            currentPage = noOfpages;
        }
        else {
            if(currentPage > noOfpages) {
                currentPage = 1;
            }
        }
        
        getVisibleItems();
    }
    
    var getVisibleItems = function (pageIndex) {
        visibleItems = [];
        noOfpages = Math.ceil(videoList.length / noOfItems);
        
        if (currentPage * noOfItems > noOfpages * noOfItems) {
            currentPage = 1;
        }
        else {
            currentPage = pageIndex || currentPage;
        }
        
        startIndex = (currentPage - 1) * noOfItems;
        endIndex = startIndex + noOfItems;
        
        for (let i = startIndex; i < endIndex; i++) {
            if (videoList[i]) {
                visibleItems.push(videoList[i]);
            }
        }
        
        uiElements.createVideoElements(visibleItems);
        createPagination();
    }
    
    var setPageCount = function (list) {
        videoList = list || videoList;
        currentPage = 1;
        window_width = window.innerWidth;
        
        if (window_width >= large.minWidth) {
            noOfItems = large.noOfItems;
        }
        else if (window_width <= medium.maxWidth && window_width > medium.minWidth) {
            noOfItems = medium.noOfItems;
        }
        else if (window_width <= small.maxWidth && window_width > small.minWidth) {
            noOfItems = small.noOfItems;
        }
        else {
            noOfItems = 1;
        }
        getVisibleItems();
    }
    
    window.addEventListener('resize', function () {
        if (videoList.length) {
            setPageCount();
        }
    }, true);
    
    window.addEventListener("touchstart", function (event) {
        swipeStart = event.changedTouches[0].screenX;
    }, true);

    window.addEventListener("touchend", function (event) {
        swipeEnd = event.changedTouches[0].screenX;
        moveTiles();
    }, true);
    
    return {
        setPageCount: setPageCount,
        getVisibleItems: getVisibleItems
    }
    
})(youtubeApi.videoList, youtubeApi.uiElements);