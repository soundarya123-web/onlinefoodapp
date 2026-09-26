// LIKE POST

function likePost(button) {

    const post = button.closest(".post");
    const countElement = post.querySelector(".like-count");

    let count = parseInt(countElement.innerText);

    if (button.classList.contains("liked")) {

        count--;
        button.classList.remove("liked");

        button.innerHTML =
            '<i class="fa-regular fa-heart"></i> Like';

    } else {

        count++;
        button.classList.add("liked");

        button.innerHTML =
            '<i class="fa-solid fa-heart"></i> Liked';
    }

    countElement.innerText = count + " Likes";
}


// CREATE POST

function createPost() {

    const input = document.getElementById("postInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please write something first!");
        return;
    }

    const posts = document.getElementById("posts");

    const newPost = document.createElement("article");

    newPost.className = "post";

    newPost.innerHTML = `

        <div class="post-header">

            <div class="user-info">

                <img src="https://i.pravatar.cc/100?img=47">

                <div>
                    <h4>Soundarya</h4>
                    <span>Just now</span>
                </div>

            </div>

            <button class="more">
                <i class="fa-solid fa-ellipsis"></i>
            </button>

        </div>

        <p class="post-text">${text}</p>

        <div class="post-stats">
            <span class="like-count">0 Likes</span>
            <span>0 Comments</span>
        </div>

        <div class="post-actions">

            <button class="like-button"
                    onclick="likePost(this)">
                <i class="fa-regular fa-heart"></i>
                Like
            </button>

            <button onclick="focusComment(this)">
                <i class="fa-regular fa-comment"></i>
                Comment
            </button>

            <button onclick="sharePost()">
                <i class="fa-solid fa-share"></i>
                Share
            </button>

        </div>

        <div class="comment-box">

            <input
                type="text"
                placeholder="Write a comment..."
            >

            <button onclick="addComment(this)">
                Post
            </button>

        </div>

        <div class="comments"></div>
    `;

    posts.prepend(newPost);

    input.value = "";
}


// COMMENT

function addComment(button) {

    const box = button.parentElement;
    const input = box.querySelector("input");
    const comments = button.closest(".post").querySelector(".comments");

    const text = input.value.trim();

    if (text === "") {
        return;
    }

    const comment = document.createElement("div");

    comment.className = "comment";

    comment.innerHTML = `
        <strong>Soundarya:</strong> ${text}
    `;

    comments.appendChild(comment);

    input.value = "";
}


// FOCUS COMMENT

function focusComment(button) {

    const post = button.closest(".post");

    const input = post.querySelector(".comment-box input");

    input.focus();
}


// SHARE

function sharePost() {

    if (navigator.share) {

        navigator.share({
            title: "Connectly",
            text: "Check out this post on Connectly!"
        });

    } else {

        navigator.clipboard.writeText(
            window.location.href
        );

        alert("Post link copied!");
    }
}


// FOLLOW

function followUser(button) {

    if (button.innerText === "Follow") {

        button.innerText = "Following";

    } else {

        button.innerText = "Follow";
    }
}


// DARK MODE

function toggleDarkMode() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        localStorage.setItem("darkMode", "true");

    } else {

        localStorage.setItem("darkMode", "false");
    }
}


// LOAD DARK MODE

if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark");
}


// IMAGE SELECTION

function selectImage() {

    document.getElementById("imageInput").click();
}


// IMAGE PREVIEW

document
    .getElementById("imageInput")
    .addEventListener("change", function () {

        const file = this.files[0];

        if (file) {

            const reader = new FileReader();

            reader.onload = function (event) {

                const posts = document.getElementById("posts");

                const newPost = document.createElement("article");

                newPost.className = "post";

                newPost.innerHTML = `

                    <div class="post-header">

                        <div class="user-info">

                            <img src="https://i.pravatar.cc/100?img=47">

                            <div>
                                <h4>Soundarya</h4>
                                <span>Just now</span>
                            </div>

                        </div>

                    </div>

                    <img
                        class="post-image"
                        src="${event.target.result}"
                    >

                    <div class="post-stats">
                        <span class="like-count">
                            0 Likes
                        </span>
                    </div>

                    <div class="post-actions">

                        <button
                            class="like-button"
                            onclick="likePost(this)"
                        >
                            <i class="fa-regular fa-heart"></i>
                            Like
                        </button>

                        <button>
                            <i class="fa-regular fa-comment"></i>
                            Comment
                        </button>

                        <button onclick="sharePost()">
                            <i class="fa-solid fa-share"></i>
                            Share
                        </button>

                    </div>
                `;

                posts.prepend(newPost);
            };

            reader.readAsDataURL(file);
        }
    });


// SEARCH

document
    .getElementById("searchInput")
    .addEventListener("input", function () {

        const search = this.value.toLowerCase();

        const posts =
            document.querySelectorAll(".post");

        posts.forEach(post => {

            const text =
                post.innerText.toLowerCase();

            if (text.includes(search)) {

                post.style.display = "";

            } else {

                post.style.display = "none";
            }
        });
    });


// NOTIFICATIONS

function showNotification() {

    alert(
        "🔔 Notifications\n\n" +
        "❤️ Priya liked your post\n" +
        "💬 Rahul commented on your post\n" +
        "👤 Anjali started following you"
    );
}


// PAGE

function showPage(page) {

    if (page === "profile") {

        alert(
            "👤 Soundarya\n\n" +
            "@soundarya\n\n" +
            "Posts: 12\n" +
            "Followers: 245\n" +
            "Following: 180"
        );

    } else if (page === "messages") {

        alert(
            "💬 Messages\n\n" +
            "Priya: Hey! How are you?\n" +
            "Rahul: Nice post!\n" +
            "Anjali: Hello 👋"
        );

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}