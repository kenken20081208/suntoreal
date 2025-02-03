function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let sortedPosts = [...posts].sort((a, b) => (b.support1 + b.support2 + b.support3) - (a.support1 + a.support2 + a.support3));

    const rankingContainer = document.getElementById("rankingContainer");
    rankingContainer.innerHTML = "";

    const postContainer = document.getElementById("postContainer");
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
        let postDiv = createPostElement(post, index);
        postContainer.appendChild(postDiv);
    });

    sortedPosts.slice(0, 3).forEach((post, index) => {
        let rankingDiv = createPostElement(post, index);
        rankingDiv.classList.add(`rank-${index + 1}`);
        rankingContainer.appendChild(rankingDiv);
    });
}

function createPostElement(post, index) {
    let postDiv = document.createElement("div");
    postDiv.classList.add("post");

    let postText = document.createElement("span");
    postText.textContent = post.text;
    postDiv.appendChild(postText);

    let supportCount = document.createElement("p");
    supportCount.innerHTML = `応援数: ${post.support1 + post.support2 + post.support3}`;
    postDiv.appendChild(supportCount);

    let supportButtons = document.createElement("div");
    supportButtons.classList.add("support-buttons");

    ["support1", "support2", "support3"].forEach((type, i) => {
        let btn = document.createElement("button");
        btn.textContent = ["頑張ったね！", "大丈夫！", "よくある！"][i] + ` (${post[type] || 0})`;
        btn.classList.add("support-button");
        btn.onclick = function () {
            toggleSupport(index, type);
        };
        supportButtons.appendChild(btn);
    });

    postDiv.appendChild(supportButtons);
    return postDiv;
}

function toggleSupport(index, type) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts[index][type] = (posts[index][type] || 0) + 1;
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
}

window.onload = loadPosts;