// ==========================
// SIMPLE LOCAL DATABASE
// ==========================
let db = {
  users: [],
  posts: [],
  currentUser: null
};

// Load from storage
function loadDB() {
  let data = localStorage.getItem("viral_app_db");
  if (data) db = JSON.parse(data);
}

// Save to storage
function saveDB() {
  localStorage.setItem("viral_app_db", JSON.stringify(db));
}

// ==========================
// INIT USER (AUTO LOGIN)
// ==========================
function initUser() {
  loadDB();

  if (!db.currentUser) {
    let user = {
      id: Date.now(),
      credit: 1,
      ton: 0,
      referrals: 0,
      likedPosts: []
    };

    db.currentUser = user;
    db.users.push(user);
    saveDB();
  }
}

// ==========================
// UPDATE BALANCE DISPLAY
// ==========================
function updateBalanceUI() {
  loadDB();

  let creditEls = document.querySelectorAll(".credit-balance");
  let tonEls = document.querySelectorAll(".ton-balance");

  creditEls.forEach(el => el.innerText = db.currentUser.credit);
  tonEls.forEach(el => el.innerText = db.currentUser.ton);
}

// ==========================
// CREATE POST
// ==========================
function createPost(title, category, image = "") {
  loadDB();

  let post = {
    id: Date.now(),
    title,
    category,
    image,
    likes: 0,
    owner: db.currentUser.id
  };

  db.posts.unshift(post);
  saveDB();
}

// ==========================
// LIKE POST (NO DOUBLE LIKE)
// ==========================
function likePost(postId) {
  loadDB();

  let user = db.currentUser;
  let post = db.posts.find(p => p.id === postId);

  if (!post) return;

  if (user.likedPosts.includes(postId)) {
    alert("Already liked!");
    return;
  }

  post.likes += 1;
  user.likedPosts.push(postId);

  saveDB();
  renderFeed();
}

// ==========================
// RENDER FEED
// ==========================
function renderFeed() {
  loadDB();

  let container = document.getElementById("feedContainer");
  if (!container) return;

  container.innerHTML = "";

  db.posts.forEach(post => {
    let div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${post.title}</h3>
      <small>${post.category}</small>
      <p>Likes: ${post.likes}</p>
      <button onclick="likePost(${post.id})">Like</button>
    `;

    container.appendChild(div);
  });
}

// ==========================
// CREATE POST HANDLER
// ==========================
function handleCreatePost() {
  let title = document.getElementById("postTitle").value;
  let category = document.getElementById("postCategory").value;

  if (!title) return alert("Enter title");

  createPost(title, category);
  alert("Post created!");

  document.getElementById("postTitle").value = "";
  renderFeed();
}

// ==========================
// TASK REWARD SYSTEM
// ==========================
function rewardTask(amount) {
  loadDB();
  db.currentUser.credit += amount;
  saveDB();
  updateBalanceUI();
}

// ==========================
// TON TOPUP (SIMULATION)
// ==========================
function topUpTon(amount) {
  loadDB();
  db.currentUser.ton += amount;
  saveDB();
  updateBalanceUI();
}

// ==========================
// WITHDRAW REQUEST
// ==========================
function withdraw(amount, address) {
  loadDB();

  if (db.currentUser.ton < amount) {
    alert("Not enough TON");
    return;
  }

  db.currentUser.ton -= amount;

  alert("Withdraw request sent (pending approval)");

  saveDB();
  updateBalanceUI();
}

// ==========================
// REFERRAL SYSTEM (SIMPLIFIED)
// ==========================
function addReferral() {
  loadDB();
  db.currentUser.referrals += 1;
  db.currentUser.credit += 0.2;

  saveDB();
  updateBalanceUI();
}

// ==========================
// INIT APP ON PAGE LOAD
// ==========================
window.onload = function () {
  initUser();
  updateBalanceUI();
  renderFeed();
};renderFeed();
