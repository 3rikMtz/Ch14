const newCommentFormHandler = async (e) => {
    e.preventDefault();

    const content = document.getElementById('content').value.trim();
    const post_id = document.getElementById('current-post').getAttribute('data-post-id');

    if(content && post_id ) {
        const response = await fetch('/api/comment/', {
            method: 'POST', 
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    };
}

const newCommentBtn = document.getElementById('new-comment');
const newCommentFrm = document.getElementById('hidden-div');

newCommentBtn.addEventListener('click' , () => {
    if(newCommentFrm.style.display === 'none') {
        newCommentFrm.style.display = 'block';
    } else {
        newCommentFrm.style.display = 'none';
    }
})

document.querySelector('#comment-form')
        .addEventListener('submit', newCommentFormHandler);

