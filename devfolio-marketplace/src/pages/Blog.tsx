import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "10 Tips for Successful 1:1 Mentoring Sessions",
      excerpt: "Learn how to make the most of your mentoring sessions and provide maximum value to your mentees.",
      category: "Mentoring",
      date: "Jan 10, 2025",
      readTime: "5 min read"
    },
    {
      title: "How to Price Your Services as a Creator",
      excerpt: "A comprehensive guide to pricing strategies for creators at every stage of their journey.",
      category: "Business",
      date: "Jan 8, 2025",
      readTime: "8 min read"
    },
    {
      title: "Building Your Personal Brand on Social Media",
      excerpt: "Strategies to grow your audience and establish yourself as an authority in your field.",
      category: "Marketing",
      date: "Jan 5, 2025",
      readTime: "6 min read"
    },
    {
      title: "The Future of the Creator Economy",
      excerpt: "Exploring trends and opportunities in the rapidly evolving creator economy landscape.",
      category: "Industry",
      date: "Jan 3, 2025",
      readTime: "10 min read"
    },
    {
      title: "Creating Engaging Online Course Content",
      excerpt: "Best practices for designing and delivering courses that keep students engaged and learning.",
      category: "Education",
      date: "Dec 28, 2024",
      readTime: "7 min read"
    },
    {
      title: "Monetization Strategies for Content Creators",
      excerpt: "Diversify your income streams and build a sustainable creator business.",
      category: "Business",
      date: "Dec 25, 2024",
      readTime: "9 min read"
    }
  ];

  const categories = ["All", "Business", "Mentoring", "Marketing", "Education", "Industry"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Creator Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, tips, and stories from the creator economy
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {posts.map((post, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
                <Button variant="link" className="mt-4 p-0 h-auto gap-2 group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest creator tips, platform updates, and success stories delivered to your inbox
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background"
              />
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
