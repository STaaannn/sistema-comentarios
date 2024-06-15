const comments = []

const inputContainer = document.createElement('div');
const input = document.createElement('input')
const commentsContainer = document.querySelector('#comments-container')


input.classList.add("input")

input.addEventListener('keydown', e => {
    handleEnter(e, null)
})

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input)

function handleEnter(e, current) {
    if (e.key === 'Enter' && e.target.value != '') {
        const newComment = {
            text: e.target.value,
            likes: 0,
            responses: [],
            user: {
                name: 'anonymous', 
                avatar: 'user.jpg' 
            }
        };

        if (current === null) {
            comments.unshift(newComment);
        } else {
            current.responses.unshift(newComment);
        }

        e.target.value = '';
        commentsContainer.innerHTML = '';
        commentsContainer.appendChild(inputContainer);

        renderComments(comments, commentsContainer);
    }
}

function renderComments(arr, parent){
    arr.forEach(element => {
        const commentcontainer = document.createElement('div')
        commentcontainer.classList.add("comment-container")

        const responsesContainer = document.createElement('div')
        responsesContainer.classList.add('responses-container')

        const replyButton = document.createElement('button')
        const likeButton = document.createElement('button')
        const textContainer = document.createElement('div')
        textContainer.textContent = element.text

        const actionsContainer = document.createElement('div')

        replyButton.textContent = 'Reply'
        likeButton.textContent = `${element.likes > 0? `${element.likes} likes`: "like"}`

        const userContainer = document.createElement('div');
        userContainer.classList.add('user-container');
        const userName = document.createElement('span');
        userName.textContent = element.user.name;
        const userAvatar = document.createElement('img');
        userAvatar.src = element.user.avatar;
        userAvatar.classList.add('user-avatar');

        userContainer.appendChild(userAvatar);
        userContainer.appendChild(userName);
        commentcontainer.appendChild(userContainer);


        replyButton.addEventListener('click', e => {
            const newInput = inputContainer.cloneNode(true)
            newInput.value = '';
            newInput.focus()
            newInput.addEventListener('keydown', e => {
                handleEnter(e, element)
            })
            commentcontainer.insertBefore(newInput, responsesContainer);
        })

        likeButton.addEventListener('click', e => {
            element.likes++;
            likeButton.textContent = `${element.likes > 0? `${element.likes} likes`: "like"}`
        })

        // Botón de edición
        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.addEventListener('click', () => {
            const editInput = document.createElement('input')
            editInput.value = element.text
            commentcontainer.replaceChild(editInput, textContainer)

            editInput.addEventListener('keydown', e => {
                if (e.key === 'Enter' && editInput.value != '') {
                    element.text = editInput.value
                    textContainer.textContent = element.text
                    commentcontainer.replaceChild(textContainer, editInput)
                }
            })
        })

        const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => {
            parent.removeChild(commentcontainer);
            const index = arr.indexOf(element);
            if (index > -1) {
                arr.splice(index, 1);
    }
});
actionsContainer.appendChild(deleteButton);

        actionsContainer.appendChild(editButton)

        // append
        commentcontainer.appendChild(textContainer)
        commentcontainer.appendChild(actionsContainer)
        actionsContainer.appendChild(replyButton)
        actionsContainer.appendChild(likeButton)

        commentcontainer.appendChild(responsesContainer)
        
        if(element.responses.length > 0){
            renderComments(element.responses, responsesContainer);
        }

        parent.appendChild(commentcontainer)
    });
}


