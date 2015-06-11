var request = require('superagent'),
    auth = require('superagent-d2l-session-auth');

request
    .get('/d2l/api/le/1.5/115495/discussions/forums/24440/topics/109069/posts/')
    .use(auth)
    .end(function(err, res) {
        var posts = res.body;
        var postsTable = document.getElementById("posts");
        for (var i=0, tr, td; i < posts.length; i++) {
        	tr = document.createElement('tr');
        	td = document.createElement('td');
        	td.appendChid(document.createTextNode(posts[i].ForumId));
        	tr.appendChild(td);
        	td = document.createElement('td');
        	td.appendChid(document.createTextNode(posts[i].Message.Html));
        	tr.appendChild(td);
					postsTable.appendChild(tr);
        }
    });