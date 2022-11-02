// ====== CONFIG & GLOBAL VARS ====== //
const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";
const endpoint = isLocalhost ? "http://localhost:3000" : serverUrl;
let selectedPostId;

// === READ (GET) === //
// get all posts
function getPosts() {
    fetch(endpoint + "/posts")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data);
            appendPosts(data);
        });
}

function getPost(id) {
    fetch(`${endpoint}/posts/${id}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            displayPost(data);
        });
}

// appends posts to the DOM
function appendPosts(postList) {
    let html = "";

    for (let index = 0; index < postList.length; index++) {
        const post = postList[index];

        html += /*html*/ `
            <article>
                <img src="${post.image}">
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div class="btns">
                    <button class="btn-update-user" onclick="getPost('${post.id}')">Update</button>
                    <button class="btn-delete-user" onclick="deletePost('${post.id}')">Delete</button>
                </div>
            </article>
        `;
    }
    console.log(html);
    document.querySelector("#posts-grid").innerHTML = html;
}

function deletePost(id) {
    fetch(endpoint + "/posts/" + id, { method: "DELETE" })
        .then(function (response) {
            return response.json();
        })
        .then(function (users) {
            console.log(users);
            appendPosts(users);
        });
}

function createPost(event) {
    event.preventDefault();
    const post = {
        title: event.target.title.value,
        body: event.target.body.value,
        image: event.target.url.value
    };

    fetch(endpoint + "/posts", {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            console.log(posts);
            appendPosts(posts);
        });
}

function displayPost(post) {
    selectedPostId = post.id;
    const form = document.querySelector("#form-update");
    form.title.value = post.title;
    form.body.value = post.body;
    form.url.value = post.image;
    form.scrollIntoView({ behavior: "smooth" });
}

function updatePost(event) {
    event.preventDefault();
    const postToUpdate = {
        title: event.target.title.value,
        body: event.target.body.value,
        image: event.target.url.value
    };
    fetch(endpoint + "/posts/" + selectedPostId, {
        method: "PUT",
        body: JSON.stringify(postToUpdate),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (posts) {
            console.log(posts);
            appendPosts(posts);
        });
}

// === INITIALIZE APP === //
getPosts();

// ====== INITIALIZE APP END ====== //
