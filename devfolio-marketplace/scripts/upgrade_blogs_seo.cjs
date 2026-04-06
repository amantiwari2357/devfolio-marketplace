const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, '../src/data/blogs.json');
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

const responsiveImages = [
  { desktop: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070", mobile: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800" },
  { desktop: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072", mobile: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800" },
  { desktop: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070", mobile: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800" },
  { desktop: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070", mobile: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800" }
];

const expandedBlogs = blogs.map(blog => {
  // Add SEO FAQs based on category
  if (!blog.faqs) {
    blog.faqs = [
      {
        question: `How does ${blog.category} improve creator storefronts?`,
        answer: `Implementing ${blog.category} strategies typically yields a strong reduction in admin overhead and scales client acquisition instantly.`
      },
      {
        question: `What are the best practices for scaling with ${blog.category}?`,
        answer: "Focus relentlessly on Client Retention Rate (CRR) and Node Conversion Velocity. Avoid vanity metrics like generic traffic; optimize for authenticated user interactions."
      }
    ];
  }

  // Add advanced responsive image structures
  if (!blog.media) {
    const imgSet = responsiveImages[blog.id % responsiveImages.length] || responsiveImages[0];
    blog.media = {
      cover: {
        desktop: imgSet.desktop,
        mobile: imgSet.mobile,
        alt: `High-fidelity visualization of ${blog.title}`
      }
    };
  }

  return blog;
});

fs.writeFileSync(blogsPath, JSON.stringify(expandedBlogs, null, 2));
console.log(`[SEO-UPGRADE] Successfully injected structured FAQs and Responsive Media schemas into ${expandedBlogs.length} blogs! Data is massive!`);
