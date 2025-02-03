function addPost() {
    const postText = document.getElementById("postInput").value.trim();
    if (postText === "") {
        alert("投稿内容を入力してください！");
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift({ text: postText });
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("postInput").value = "";
    loadPosts();
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
        let postDiv = document.createElement("div");
        postDiv.classList.add("post");

        let postText = document.createElement("p");
        postText.textContent = post.text;

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "削除";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            deletePost(index);
        };

        postDiv.appendChild(postText);
        postDiv.appendChild(deleteBtn);
        postContainer.appendChild(postDiv);
    });
}

function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

function skipPost() {
    document.getElementById("postInput").value = "";
}

window.onload = loadPosts;