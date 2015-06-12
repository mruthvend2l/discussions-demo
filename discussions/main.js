var request = require('superagent-promise')(require('superagent'), this.Promise || require('promise')),
    auth = require('superagent-d2l-session-auth');

request
    .get('/d2l/api/le/1.5/115495/discussions/forums/24440/topics/109069/posts/')
    .use(auth)
    .end(function(err, res) {
        var posts = res.body;
        var promises = [];
        for (var i = 0; i < posts.length; i++) {
        	var post = posts[i]
        	promises.push(request
        	  .get('/d2l/api/le/1.5/115495/discussions/forums/' + post.ForumId)
        	  .use(auth)
        	  .then(function(res) {
        	  	post.ForumName = res.body.Name;
        	  }));
        	promises.push(request
        		.get('/d2l/api/le/1.5/115495/discussions/forums/' + post.ForumId + '/topics/' + post.TopicId)
        		.use(auth)
        		.then(function(res) {
        			post.TopicName = res.body.Name;
        		}));
        } 
        Promise.all(promises)
         .then(function() {
        var postsTable = document.getElementById("posts");
				for (var i=0, tr, td, post; i < posts.length; i++) {
					post = posts[i];
					tr = document.createElement('tr');
					td = document.createElement('td');
					td.appendChild(document.createTextNode(post.ForumName));
					tr.appendChild(td);
					td = document.createElement('td');
					td.appendChild(document.createTextNode(post.TopicName));
					tr.appendChild(td);
					td = document.createElement('td');
					td.innerHTML = post.Message.Html;
					tr.appendChild(td);
					postsTable.appendChild(tr);
		    }
		  })});

