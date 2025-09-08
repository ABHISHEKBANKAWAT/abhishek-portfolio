// Blog functionality - No admin features for public repo security
let blogPosts = [
    {
        id: 1,
        title: "Welcome to My Blog!",
        date: "2025-09-08",
        excerpt: "This is my first blog post where I'll be sharing insights on data engineering, technology trends, and my professional journey.",
        content: `This is my first blog post where I'll be sharing insights on data engineering, technology trends, and my professional journey. Stay tuned for more content on Snowflake, AWS, Python, and data pipeline optimization.
        
I've been working in the data engineering field for over 2.5 years now, and I've learned so much about building scalable data pipelines, optimizing ETL processes, and working with cloud technologies. In this blog, I'll share my experiences, lessons learned, and practical tips that might help fellow data engineers.

Some topics I plan to cover:
- Data warehousing best practices with Snowflake
- AWS data services and cost optimization
- Python tips for data processing
- Building robust ETL pipelines
- Career advice for data engineers

Feel free to reach out if you have any questions or topics you'd like me to cover!`
    },
    {
        id: 2,
        title: "Building Scalable Data Warehouses with Snowflake",
        date: "2025-08-20",
        excerpt: "In this post, I share my experience building a cost-efficient data warehouse using Snowflake at Analytics Vidhya.",
        content: `In this post, I share my experience building a cost-efficient data warehouse using Snowflake at Analytics Vidhya. Learn about best practices, optimization techniques, and how we achieved significant cost savings while improving performance.

## The Challenge

When I joined Analytics Vidhya as a Data Engineer, one of my first major projects was to design and implement a new data warehouse solution. The existing system was becoming increasingly expensive and difficult to scale.

## Why Snowflake?

After evaluating several options, we chose Snowflake for several reasons:
1. **Separation of compute and storage** - Pay only for what you use
2. **Automatic scaling** - No need to manage infrastructure
3. **Zero maintenance** - Snowflake handles all the backend operations
4. **Multi-cloud support** - Flexibility to choose cloud providers

## Implementation Strategy

Our implementation followed these key principles:
- **Start small**: Begin with core datasets and gradually expand
- **Optimize for cost**: Use appropriate warehouse sizes and auto-suspend features
- **Focus on data quality**: Implement validation checks at every stage
- **Monitor performance**: Regular review of query performance and costs

## Results

The migration to Snowflake resulted in:
- 40% reduction in data infrastructure costs
- 60% improvement in query performance
- 90% reduction in maintenance overhead
- Better data accessibility for business users

## Key Takeaways

1. **Right-size your warehouses**: Don't over-provision compute resources
2. **Use clustering keys wisely**: For large tables with predictable query patterns
3. **Implement proper data governance**: Clear naming conventions and access controls
4. **Monitor and optimize regularly**: Set up alerts for cost and performance metrics

Working with Snowflake has been an incredible learning experience, and I'm excited to share more insights in future posts!`
    }
];

// Current blog post being viewed
let currentBlogPost = null;

// Load blog posts on page load
document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                closeBlogPost();
            }
        });
    });

    // Close blog post when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('blog-overlay')) {
            closeBlogPost();
        }
    });

    // Close blog post with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentBlogPost) {
            closeBlogPost();
        }
    });
});

function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-posts');
    blogContainer.innerHTML = '';
    
    if (blogPosts.length === 0) {
        blogContainer.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-blog" style="font-size: 3em; margin-bottom: 20px; opacity: 0.5;"></i>
                <p>No blog posts yet. Check back later for new content!</p>
            </div>
        `;
        return;
    }
    
    // Sort posts by date (newest first)
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    blogPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post-card';
        postElement.innerHTML = `
            <div class="blog-post-content">
                <h3>${escapeHtml(post.title)}</h3>
                <div class="blog-date">
                    <i class="fas fa-calendar"></i>
                    ${new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </div>
                <p class="blog-excerpt">${escapeHtml(post.excerpt || post.content.substring(0, 200) + '...')}</p>
                <button class="read-more-btn" onclick="openBlogPost(${post.id})">
                    <i class="fas fa-book-open"></i> Read More
                </button>
            </div>
        `;
        blogContainer.appendChild(postElement);
    });
}

function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    if (!post) return;

    currentBlogPost = post;

    // Create blog post modal
    const modal = document.createElement('div');
    modal.className = 'blog-overlay';
    modal.innerHTML = `
        <div class="blog-modal">
            <div class="blog-modal-header">
                <h1>${escapeHtml(post.title)}</h1>
                <button class="close-btn" onclick="closeBlogPost()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="blog-modal-meta">
                <span class="blog-date">
                    <i class="fas fa-calendar"></i>
                    ${new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}
                </span>
                <span class="reading-time">
                    <i class="fas fa-clock"></i>
                    ${Math.ceil(post.content.split(' ').length / 200)} min read
                </span>
            </div>
            <div class="blog-modal-content">
                ${formatBlogContent(post.content)}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function closeBlogPost() {
    const modal = document.querySelector('.blog-overlay');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
    currentBlogPost = null;
}

function formatBlogContent(content) {
    return escapeHtml(content)
        .split('\n\n')
        .map(paragraph => {
            paragraph = paragraph.trim();
            if (paragraph.startsWith('## ')) {
                return `<h2>${paragraph.substring(3)}</h2>`;
            } else if (paragraph.startsWith('# ')) {
                return `<h1>${paragraph.substring(2)}</h1>`;
            } else if (paragraph.includes('- ')) {
                const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '));
                if (items.length > 0) {
                    const listItems = items.map(item => `<li>${item.substring(2).trim()}</li>`).join('');
                    return `<ul>${listItems}</ul>`;
                }
            }
            return paragraph ? `<p>${paragraph}</p>` : '';
        })
        .join('');
}

// Utility function to escape HTML and prevent XSS
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease';
            }
        });
    });
    
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});
