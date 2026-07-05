let credits = 10;
let ton = 0;
let posts = [];

function updateUI() {
  document.getElementById("credits").innerText = credits;
  document.getElementById("ton").innerText = ton;
}

function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(tab).classList.add("active");
}

function publishPost() {
  const category = document.getElementById("category").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;

  const msg = document.getElementById("postMsg");

  if (credits < 1) {
    msg.innerText = "❌ Insufficient credits";
    return;
  }

  if (!title || !desc) {
    msg.innerText = "❌ Fill all fields";
    return;
  }

  credits -= 1;

  const post = {
    category,
    title,
    desc,
    likes: 0
  };

  posts.unshift(post);

  msg.innerText = "✅ Post published!";
  renderPosts();
  updateUI();
}

function renderPosts() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach((p, index) => {
    container.innerHTML += `
      <div class="card">
        <b>${p.title}</b>
        <p>${p.desc}</p>
        <small>${p.category}</small>
        <button onclick="likePost(${index})">❤️ Like (${p.likes})</button>
      </div>
    `;
  });
}

function likePost(i) {
  posts[i].likes += 1;
  ton += 0.01; // reward simulation
  updateUI();
  renderPosts();
}

function watchAd() {
  credits += 0.1;
  alert("+0.1 credit earned from ad");
  updateUI();
}

updateUI();
renderPosts();
