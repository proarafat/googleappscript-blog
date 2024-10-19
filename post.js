async function fetchPostById(postId) {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby0nd2d00ToE2ktpnQ7G80zBUZ8k54rrh0zdcF17z7TROTFBDotd6ZToBdYkBy4GTdpbQ/exec'); // Replace with your Web App URL
        const data = await response.json();
        const post = data.find(p => p.id == postId); // Use '==' to compare with string ID
        
        if (post) {
            displayPost(post);
        } else {
            document.getElementById('post-content').innerHTML = '<p>Post not found.</p>';
        }
    } catch (error) {
        console.error('Error fetching the post:', error);
    }
}

function displayPost(post) {
    const postContent = document.getElementById('post-content');
    postContent.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p class="author-info"><em>By ${post.author} on ${new Date(post.date).toLocaleDateString()}</em></p>
    `;
}

// Get the post ID from the URL
const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

// Fetch the post details using the post ID
fetchPostById(postId);
