 (function(){
  window.onload = fetchBookmarks();
  window.deleteBookmark = deleteBookmark;

  document.getElementById('myForm').addEventListener('submit', saveBookmark);

    function saveBookmark(e){
      e.preventDefault();
      
      var siteName = document.getElementById('siteName').value;
      var siteUrl = document.getElementById('siteUrl').value;

      validateForm(siteName, siteUrl);

      var bookmark = {
        name: siteName,
        url: siteUrl
      }
      
      // test if bookmarks is null 
      if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

      } 
      document.getElementById('siteUrl').value = '';
      document.getElementById('siteName').value = '';

      fetchBookmarks();
    }

  function deleteBookmark(url){
    
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 
  
    // for(var i = 0; i < bookmarks.length; i++){
    //  if(bookmarks[i].url === url) {
    //    bookmarks.splice(i, 1);
    //  }
    // }

    bookmarks = bookmarks.filter((bookmark) => bookmark.url !== url)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    
  }

  function fetchBookmarks(){
    // saveBookmark();
    // console.log(localStorage.getItem('bookmarks'))
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = "";

    if(bookmarks){
      var bookmarkList = bookmarks.map((mark) => {
        return (
          `<div class="well">
            <h3>${mark.name}:  
              <a class="btn btn-default" href="${mark.url}" target="_blank">Visit</a>
              <a onclick="deleteBookmark('${mark.url}')" class="btn btn-danger" href="">Delete</a>
            </h3>
          </div>`
        )
      })
      
      // bookmarksResults.innerHTML = bookmarkList;

      /* 直接👆这样加每个item之间多了逗号, 因此👇这样渲染*/

      bookmarkList.forEach(bookmarkItem => {
        bookmarksResults.innerHTML += bookmarkItem;
      })


    /* ES5 方法*/

    // bookmarksResults.innerHTML = '';
    // for(var i = 0; i < bookmarks.length; i++){
    //   var name = bookmarks[i].name;
    //   var url = bookmarks[i].url;

    //   bookmarksResults.innerHTML += '<div class="well">'+
    //                                 '<h3>'+name+
    //                                 ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
    //                                 ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
    //                                 '</h3>'+
    //                                 '</div>';
    // }

    }
    

  }
  
  function validateForm(siteName, siteUrl){  
    
    // var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); 
    
    // bookmarks.forEach((bookmark) => {
    //   if(bookmark.url === siteUrl){
    //     alert('repeated site');
    //     return;
    //   }  
    // })


    if(!siteName || !siteUrl){
      alert('Please fill in the form');
      return false;
    }
    
    // regular expression to format a url
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
      alert('Please use a valid url');
      return false;
    }
  };
 })();
  