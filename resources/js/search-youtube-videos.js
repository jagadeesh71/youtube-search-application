var youtubeApi = youtubeApi || {};
(function (videoList, pagination) {
    
    function createSearchBox() {
        var mainRow = document.createElement('div');
        mainRow.setAttribute('class', 'row margin-top-1');
        
        var responsiveDiv = document.createElement('div');
        responsiveDiv.setAttribute('class', 'col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1');
        mainRow.appendChild(responsiveDiv);
        
        var form = document.createElement('form');
        form.setAttribute('id','form1');
        form.setAttribute('role','form');
        responsiveDiv.appendChild(form);
        
        var formGroupDiv = document.createElement('div');
        formGroupDiv.setAttribute('class', 'form-group');
        form.appendChild(formGroupDiv);
        
        var innerDiv = document.createElement('div');
        innerDiv.setAttribute('class', 'form-group has-feedback');
        formGroupDiv.appendChild(innerDiv);
        
        var inputElement = document.createElement('input');
        inputElement.nodeType = 'text';
        inputElement.setAttribute('class', 'form-control');
        inputElement.setAttribute('id', 'input-value');
        inputElement.setAttribute('placeholder', 'Search');
        
        var glyphiconSpan = document.createElement('span');
        glyphiconSpan.setAttribute('class', 'glyphicon glyphicon-search form-control-feedback');
        innerDiv.appendChild(inputElement);
        innerDiv.appendChild(glyphiconSpan);
        
        var searchItems = document.createElement('div');
        searchItems.setAttribute('class', 'row margin-top');
        searchItems.setAttribute('id', 'search-list');
        
        var mainDiv = document.getElementById('youtube-api');
        mainDiv.appendChild(mainRow);
        mainDiv.appendChild(searchItems);
        
        
        
        document.getElementById('form1').addEventListener('submit', function(evt){
            evt.preventDefault();
            var inputValue = document.getElementById('input-value').value;
            document.querySelector('#search-list').innerHTML = '';
            document.querySelector('.pagination').innerHTML = '';
            videoList.getVideoList(inputValue, '').then(function (resultantVideos) {
                pagination.setPageCount(resultantVideos);
            });
        })
    }
    
    function initialize () {
        
        createSearchBox();
        
        //pagination
        var div = document.createElement('div');
        div.setAttribute('class', 'text-center');
        
        var paginationDiv  = document.createElement('div');
        paginationDiv.setAttribute('class', 'pagination');

        div.appendChild(paginationDiv);
        document.getElementById('youtube-api').appendChild(div);
                
        paginationDiv.addEventListener('click', function (Event) {
           pagination.getVisibleItems(parseInt(Event.target.innerHTML, 10));
        });
    }
    
    initialize();
    
})(youtubeApi.videoList, youtubeApi.pagination);