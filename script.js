const postsPerPage = 12; // Number of posts to load at a time
let currentOffset = 0; // Track the current offset for loading posts
let allPosts = []; // Array to store all posts

// Function to fetch posts from Google Sheets
async function fetchPosts() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby0nd2d00ToE2ktpnQ7G80zBUZ8k54rrh0zdcF17z7TROTFBDotd6ZToBdYkBy4GTdpbQ/exec'); // Replace with your Web App URL
        const data = await response.json();
        allPosts = data; // Store all posts in the global variable
        loadPosts();
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Function to load posts into the main content area
function loadPosts() {
    const blogPostsContainer = document.getElementById('blog-posts');

    // Calculate how many posts to load
    const postsToLoad = Math.min(postsPerPage, allPosts.length - currentOffset);

    for (let i = 0; i < postsToLoad; i++) {
        const post = allPosts[currentOffset + i];
        const article = document.createElement('article');
        article.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <h2>${post.title}</h2>
            <p class="description">${post.content}</p>
            <p class="author-info"><em>By ${post.author} on ${new Date(post.date).toLocaleDateString()}</em></p>
            <p class="read-more" onclick="redirectToPost('${post.id}')">Read More</p>
        `;
        blogPostsContainer.appendChild(article);
    }

    currentOffset += postsToLoad; // Update the current offset

    // Show loading indicator if there are more posts to load
    if (currentOffset < allPosts.length) {
        showLoadingIndicator();
    } else {
        hideLoadingIndicator();
    }
}

// Function to show loading indicator
function showLoadingIndicator() {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';

    // Load more posts after a delay
    setTimeout(() => {
        loadPosts();
        loadingDiv.style.display = 'none'; // Hide loading indicator after loading
    }, 1000);
}

// Function to hide loading indicator
function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'none';
}

// Function to redirect to the detailed post page
function redirectToPost(postId) {
    window.location.href = `post.html?id=${postId}`; // Redirect to post.html with post ID
}

// Initial fetch of posts
fetchPosts();
