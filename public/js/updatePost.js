const post_id = document.getElementById('form-update-delete').getAttribute('data-post-id');

const updatePost = async () => {

    const post_title = document.getElementById('postTitle').value.trim();
    const post_content = document.getElementById('postContent').value.trim();

    if(post_title && post_content) {
        const response = await fetch(`/api/post/${post_id}`, {
            method: 'PUT', 
            body: JSON.stringify({ post_title, post_content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.replace('/home');
        } else {
            alert('Failed to update the post');
        }
    }
};

const deletePost = async () => {
    if(post_id) {
        const response = await fetch(`/api/post/${post_id}`, {
            method: 'DELETE',
        });

        if(response.ok) {
            document.location.replace('/home');
        } else {
            alert('Failed to delete post')
        }
    }
};


document.getElementById('updateBtn')
        .addEventListener('click', updatePost);

document.getElementById('deleteBtn')
        .addEventListener('click', deletePost);