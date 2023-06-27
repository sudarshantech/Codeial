// method to submit the form data for new post using Ajax
{
    let createPost = function () {

        let newPostForm = $('#new-post-form')

        newPostForm.submit(function (e) {
            e.preventDefault();

            // displaying in home page of all posts 
            $.ajax({
                type: 'post',
                url: 'posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#Post-list-container>ul').prepend(newPost);
                    console.log(data);
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            })

        });
    }

    // Method to create Post in DOM -->
    let newPostDom = function (post) {
        return $(`
        <li id="post-${post._id}">
            <p>
                <!--  putting check that only logged in user can delete the posts and user who created post only that user is allow to delete the post  -->
                <!-- locals.user = if user is logged in only  -->
                <!-- locals.user.id == post.user.id  = if signed in user is equals to a user who created a post -->
               
                    <small>
                        <a class="delete-post-button" href="posts/destroy/${post.id}">X</a>
                    </small>

                        ${post.content}
                            <small>
                                ${post.user.name}
                            </small>
            </p>
            <div class="post-commets">
               
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Comment..." required>
                        <input type="hidden" name="post" value="${post._id}" required>
                        <input type="submit" value="Add comment">
                    </form>
                    
        
                        <!-- Showing the comments in front of users in home.ejs  -->
                        <div class="post-comment-list">
                            <ul id="post-commet-${post._id}">
                               
                            </ul>
                        </div>
            </div>
        </li>`)
    }

    createPost();
}