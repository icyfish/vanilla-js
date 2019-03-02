(function(){
  // add a DOM structure for each post

  function renderPosts(posts) {

    var postsDiv = document.getElementById('posts');
    
    posts.forEach(function(post){
      var postDiv = document.createElement('div'),
          postNameDiv = document.createElement('div'),
          postAuthorDiv = document.createElement('div'),
          postContentDiv = document.createElement('div');

      postNameDiv.innerHTML = post.name;
      postAuthorDiv.innerHTML = post.author;
      postContentDiv.innerHTML = post.content;

      postDiv.setAttribute('class', 'post');
      postNameDiv.setAttribute('class', 'post-name');
      postAuthorDiv.setAttribute('class', 'post-author');
      postContentDiv.setAttribute('class', 'post-content');

      postsDiv.appendChild(postNameDiv);
      postsDiv.appendChild(postAuthorDiv);
      postsDiv.appendChild(postContentDiv);

      postsDiv.appendChild(postDiv);
    });
  }

  // create an array of objects representing posts
  /**
   * normal way 
   */
  // function getPosts() {
  //   return  [
  //     {
  //       "name": "post 1",
  //       "author": "joe",
  //       "content": "this is post1"
  //     },
  //     {
  //       "name": "post 2",
  //       "author": "joe",
  //       "content": "this is post2"
  //     },
  //     {
  //       "name": "post 3",
  //       "author": "joe",
  //       "content": "this is post3"
  //     }
  //   ]; 
  // } 

  // renderPosts(getPosts())

  /**
   * async way
   */

  function getPosts(callback) {
  
    var request = new XMLHttpRequest();

    request.onload = function(){
      var posts = JSON.parse(request.responseText);
      callback(posts);
    };

    request.open('GET', 'posts.json', true); // true indicates async
    request.send(null);
  } 

  getPosts(function(posts){
    renderPosts(posts);
  });
})();



