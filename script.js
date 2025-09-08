// Blog functionality
let blogPosts = [
    {
        id: 1,
        title: "Welcome to My Blog!",
        date: "2025-09-08",
        content: "This is my first blog post where I'll be sharing insights on data engineering, technology trends, and my professional journey. Stay tuned for more content on Snowflake, AWS, Python, and data pipeline optimization."
    },
    {
        id: 2,
        title: "Building Scalable Data Warehouses with Snowflake",
        date: "2025-08-20",
        content: "In this post, I share my experience building a cost-efficient data warehouse using Snowflake at Analytics Vidhya. Learn about best practices, optimization techniques, and how we achieved significant cost savings while improving performance."
    }
];

// Load blog posts on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    blogContainer.innerHTML = '';
    
    if (blogPosts.length === 0) {
        blogContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d;">No blog posts yet. Click "Add New Post" to create your first post!</p>';
        return;
    }
    
    // Sort posts by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <div class="blog-date">${new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })}</div>
            <p>${post.content}</p>
            <button onclick="deletePost(${post.id})" style="background: #e74c3c; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer; float: right; margin-top: 10px;">Delete</button>
        `;
        blogContainer.appendChild(postElement);
    });
}

function showAddPostForm() {
    document.getElementById('add-post-form').style.display = 'block';
    document.getElementById('add-post-btn').style.display = 'none';
}

function hideAddPostForm() {
    document.getElementById('add-post-form').style.display = 'none';
    document.getElementById('add-post-btn').style.display = 'inline-block';
    // Clear form
    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
}

function addPost() {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();
    
    if (!title || !content) {
        alert('Please fill in both title and content');
        return;
    }
    
    const newPost = {
        id: Date.now(), // Simple ID generation
        title: title,
        date: new Date().toISOString().split('T')[0], // Today's date
        content: content
    };
    
    blogPosts.unshift(newPost); // Add to beginning of array
    loadBlogPosts();
    hideAddPostForm();
    
    // Scroll to blog section
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
}

function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        blogPosts = blogPosts.filter(post => post.id !== postId);
        loadBlogPosts();
    }
}

// Add some interactivity to skill items
document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-category li');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});
