import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Clock,
  Users,
  Share2,
  Bold,
  Italic,
  Underline,
  Smile,
  Palette,
  Save,
  Send,
  BarChart3,
  Activity,
  CheckCircle2,
  AlertCircle,
  Filter,
} from "lucide-react";

// Dummy data
const dummyPosts = [
  {
    id: "1",
    title: "10 Tips for Building Scalable React Apps",
    slug: "10-tips-building-scalable-react-apps",
    author: { name: "Rahul Sharma", email: "rahul@example.com", avatar: "" },
    status: "published",
    views: 2450,
    createdAt: "2024-01-15",
    publishedAt: "2024-01-16",
    content: "Building scalable React applications requires careful planning...",
    metaTitle: "10 Tips for Building Scalable React Apps | Tech Blog",
    metaDescription: "Learn the best practices for building scalable React applications",
    keywords: ["react", "scalability", "web development"],
    scheduledFor: "",
  },
  {
    id: "2",
    title: "Understanding TypeScript Generics",
    slug: "understanding-typescript-generics",
    author: { name: "Priya Patel", email: "priya@example.com", avatar: "" },
    status: "draft",
    views: 0,
    createdAt: "2024-01-20",
    content: "TypeScript generics provide a powerful way to write reusable code...",
    metaTitle: "Understanding TypeScript Generics - Complete Guide",
    metaDescription: "A comprehensive guide to TypeScript generics with examples",
    keywords: ["typescript", "generics", "programming"],
    scheduledFor: "",
  },
  {
    id: "3",
    title: "Next.js 14: What's New?",
    slug: "nextjs-14-whats-new",
    author: { name: "Arjun Singh", email: "arjun@example.com", avatar: "" },
    status: "scheduled",
    views: 0,
    createdAt: "2024-01-22",
    scheduledFor: "2024-01-25",
    content: "Next.js 14 brings exciting new features and improvements...",
    metaTitle: "Next.js 14: What's New? | Web Development",
    metaDescription: "Explore the latest features in Next.js 14",
    keywords: ["nextjs", "react", "web framework"],
  },
];

const dummyActivities = [
  { id: "1", action: "created", post: "10 Tips for Building Scalable React Apps", user: "Rahul Sharma", timestamp: "2024-01-15 10:30 AM" },
  { id: "2", action: "published", post: "10 Tips for Building Scalable React Apps", user: "Rahul Sharma", timestamp: "2024-01-16 02:15 PM" },
  { id: "3", action: "edited", post: "Understanding TypeScript Generics", user: "Priya Patel", timestamp: "2024-01-20 11:45 AM" },
  { id: "4", action: "created", post: "Next.js 14: What's New?", user: "Arjun Singh", timestamp: "2024-01-22 09:20 AM" },
];

const colorPalette = [
  "#000000", "#374151", "#6B7280", "#9CA3AF",
  "#EF4444", "#F97316", "#F59E0B", "#FBBF24",
  "#84CC16", "#10B981", "#14B8A6", "#06B6D4",
  "#3B82F6", "#6366F1", "#8B5CF6", "#A855F7",
  "#EC4899", "#F43F5E", "#BE185D", "#9F1239",
  "#78350F", "#92400E", "#B45309", "#D97706",
];

const emojiList = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "⭐", "💡", "🚀", "💪", "🎯", "✨", "👏", "🙌", "💯", "🎊"];

const PostsManagement = () => {
  const [posts, setPosts] = useState(dummyPosts);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("list");

  // Editor state
  const [editorData, setEditorData] = useState({
    id: "",
    title: "",
    slug: "",
    content: "",
    author: { name: "Admin User", email: "admin@example.com", avatar: "" },
    metaTitle: "",
    metaDescription: "",
    keywords: [] as string[],
    scheduledFor: "",
    status: "draft",
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [keywordInput, setKeywordInput] = useState("");

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const postsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPosts(paginatedPosts.map(p => p.id));
    } else {
      setSelectedPosts([]);
    }
  };

  const handleSelectPost = (postId: string, checked: boolean) => {
    if (checked) {
      setSelectedPosts([...selectedPosts, postId]);
    } else {
      setSelectedPosts(selectedPosts.filter(id => id !== postId));
    }
  };

  const handleBulkDelete = () => {
    setPosts(posts.filter(p => !selectedPosts.includes(p.id)));
    setSelectedPosts([]);
    toast.success(`Deleted ${selectedPosts.length} posts`);
  };

  const handleBulkPublish = () => {
    setPosts(posts.map(p => selectedPosts.includes(p.id) ? { ...p, status: "published" } : p));
    setSelectedPosts([]);
    toast.success(`Published ${selectedPosts.length} posts`);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
    toast.success("Post deleted");
  };

  const handleEditPost = (post: any) => {
    setEditorData({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      keywords: post.keywords || [],
      scheduledFor: post.scheduledFor || "",
      status: post.status,
    });
    setActiveTab("editor");
  };

  const handleCreateNew = () => {
    setEditorData({
      id: "",
      title: "",
      slug: "",
      content: "",
      author: { name: "Admin User", email: "admin@example.com", avatar: "" },
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      scheduledFor: "",
      status: "draft",
    });
    setActiveTab("editor");
  };

  const handleSavePost = () => {
    if (editorData.id) {
      setPosts(posts.map(p => p.id === editorData.id ? { ...p, ...editorData } : p));
      toast.success("Post updated successfully");
    } else {
      const newPost = {
        ...editorData,
        id: Date.now().toString(),
        views: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setPosts([newPost, ...posts]);
      toast.success("Post created successfully");
    }
    setActiveTab("list");
  };

  const handlePublishPost = () => {
    handleSavePost();
    setPosts(posts.map(p => p.id === editorData.id ? { ...p, status: "published" } : p));
    toast.success("Post published successfully");
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setEditorData({
      ...editorData,
      title,
      slug: generateSlug(title),
    });
  };

  const insertTextFormat = (format: 'bold' | 'italic' | 'underline') => {
    const formats = { bold: '**', italic: '_', underline: '__' };
    const symbol = formats[format];
    setEditorData({
      ...editorData,
      content: `${editorData.content}${symbol}text${symbol}`,
    });
  };

  const insertEmoji = (emoji: string) => {
    setEditorData({
      ...editorData,
      content: `${editorData.content}${emoji}`,
    });
    setShowEmojiPicker(false);
  };

  const applyTextColor = (color: string) => {
    setEditorData({
      ...editorData,
      content: `${editorData.content}<span style="color:${color}">colored text</span>`,
    });
    setShowColorPicker(false);
  };

  const generateSEO = () => {
    const title = editorData.title || "Untitled Post";
    setEditorData({
      ...editorData,
      metaTitle: `${title} | Blog`,
      metaDescription: editorData.content.substring(0, 160) || "Read more about this topic on our blog",
      keywords: title.toLowerCase().split(' ').filter(w => w.length > 3),
    });
    toast.success("SEO metadata generated");
  };

  const addKeyword = () => {
    if (keywordInput && !editorData.keywords.includes(keywordInput)) {
      setEditorData({
        ...editorData,
        keywords: [...editorData.keywords, keywordInput],
      });
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setEditorData({
      ...editorData,
      keywords: editorData.keywords.filter(k => k !== keyword),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-700";
      case "draft": return "bg-yellow-100 text-yellow-700";
      case "scheduled": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published": return <CheckCircle2 className="w-4 h-4" />;
      case "draft": return <Edit2 className="w-4 h-4" />;
      case "scheduled": return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Posts Management</h1>
            <p className="text-muted-foreground mt-1">Create, edit, and manage your blog posts</p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" />
            New Post
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="list" className="gap-2">
              <Eye className="w-4 h-4" />
              All Posts
            </TabsTrigger>
            <TabsTrigger value="editor" className="gap-2">
              <Edit2 className="w-4 h-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2">
              <Activity className="w-4 h-4" />
              Activity Log
            </TabsTrigger>
          </TabsList>

          {/* Posts List Tab */}
          <TabsContent value="list" className="space-y-4">
            <Card className="p-6">
              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bulk Actions */}
              {selectedPosts.length > 0 && (
                <div className="flex items-center gap-3 mb-4 p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">{selectedPosts.length} selected</span>
                  <Button size="sm" variant="outline" onClick={handleBulkPublish} className="gap-2">
                    <Send className="w-4 h-4" />
                    Publish
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleBulkDelete} className="gap-2 text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              )}

              {/* Posts Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">
                        <Checkbox
                          checked={selectedPosts.length === paginatedPosts.length && paginatedPosts.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </th>
                      <th className="text-left p-3 font-semibold">Title</th>
                      <th className="text-left p-3 font-semibold">Author</th>
                      <th className="text-left p-3 font-semibold">Status</th>
                      <th className="text-left p-3 font-semibold">Views</th>
                      <th className="text-left p-3 font-semibold">Date</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedPosts.map((post) => (
                      <tr key={post.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-3">
                          <Checkbox
                            checked={selectedPosts.includes(post.id)}
                            onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                          />
                        </td>
                        <td className="p-3">
                          <div>
                            <p className="font-medium text-foreground">{post.title}</p>
                            <p className="text-sm text-muted-foreground">{post.slug}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{post.author.name}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className={`gap-1 ${getStatusColor(post.status)}`}>
                            {getStatusIcon(post.status)}
                            {post.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1 text-sm">
                            <Eye className="w-4 h-4" />
                            {post.views}
                          </div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">{post.createdAt}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" onClick={() => handleEditPost(post)}>
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleDeletePost(post.id)} className="text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, filteredPosts.length)} of {filteredPosts.length} posts
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm px-3">Page {currentPage} of {totalPages}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Editor Tab */}
          <TabsContent value="editor">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <Label>Title</Label>
                      <Input
                        placeholder="Enter post title..."
                        value={editorData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="text-lg font-semibold mt-2"
                      />
                    </div>

                    {/* Auto Slug */}
                    <div>
                      <Label>Slug (auto-generated)</Label>
                      <Input
                        value={editorData.slug}
                        onChange={(e) => setEditorData({ ...editorData, slug: e.target.value })}
                        className="mt-2 font-mono text-sm"
                      />
                    </div>

                    {/* Text Formatting Toolbar */}
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Button size="sm" variant="ghost" onClick={() => insertTextFormat('bold')} title="Bold">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => insertTextFormat('italic')} title="Italic">
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => insertTextFormat('underline')} title="Underline">
                        <Underline className="w-4 h-4" />
                      </Button>
                      <div className="w-px h-6 bg-border mx-2"></div>
                      <div className="relative">
                        <Button size="sm" variant="ghost" onClick={() => setShowColorPicker(!showColorPicker)} title="Text Color">
                          <Palette className="w-4 h-4" />
                        </Button>
                        {showColorPicker && (
                          <div className="absolute top-full mt-2 p-3 bg-card border rounded-lg shadow-lg z-10 w-64">
                            <div className="grid grid-cols-6 gap-2">
                              {colorPalette.map((color) => (
                                <button
                                  key={color}
                                  onClick={() => applyTextColor(color)}
                                  className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="relative">
                        <Button size="sm" variant="ghost" onClick={() => setShowEmojiPicker(!showEmojiPicker)} title="Emoji">
                          <Smile className="w-4 h-4" />
                        </Button>
                        {showEmojiPicker && (
                          <div className="absolute top-full mt-2 p-3 bg-card border rounded-lg shadow-lg z-10 w-64">
                            <div className="grid grid-cols-8 gap-2">
                              {emojiList.map((emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => insertEmoji(emoji)}
                                  className="text-xl hover:scale-125 transition-transform"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Editor */}
                    <div>
                      <Label>Content</Label>
                      <Textarea
                        placeholder="Write your post content..."
                        value={editorData.content}
                        onChange={(e) => setEditorData({ ...editorData, content: e.target.value })}
                        rows={15}
                        className="mt-2 font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Character count: {editorData.content.length} | Words: {editorData.content.split(/\s+/).filter(Boolean).length}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4">
                      <Button onClick={handleSavePost} className="gap-2">
                        <Save className="w-4 h-4" />
                        Save Draft
                      </Button>
                      <Button onClick={handlePublishPost} className="gap-2 bg-green-600 hover:bg-green-700">
                        <Send className="w-4 h-4" />
                        Publish
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar - SEO & Settings */}
              <div className="space-y-6">
                {/* Author Preview */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Author</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={editorData.author.avatar} />
                      <AvatarFallback>{editorData.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{editorData.author.name}</p>
                      <p className="text-xs text-muted-foreground">{editorData.author.email}</p>
                    </div>
                  </div>
                </Card>

                {/* SEO Panel */}
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">SEO Settings</h3>
                    <Button size="sm" variant="outline" onClick={generateSEO}>
                      Generate
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Meta Title</Label>
                      <Input
                        placeholder="SEO title..."
                        value={editorData.metaTitle}
                        onChange={(e) => setEditorData({ ...editorData, metaTitle: e.target.value })}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{editorData.metaTitle.length}/60</p>
                    </div>
                    <div>
                      <Label className="text-xs">Meta Description</Label>
                      <Textarea
                        placeholder="SEO description..."
                        value={editorData.metaDescription}
                        onChange={(e) => setEditorData({ ...editorData, metaDescription: e.target.value })}
                        rows={3}
                        className="mt-1"
                      />
                      <p className="text-xs text-muted-foreground mt-1">{editorData.metaDescription.length}/160</p>
                    </div>
                    <div>
                      <Label className="text-xs">Keywords</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          placeholder="Add keyword..."
                          value={keywordInput}
                          onChange={(e) => setKeywordInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                        />
                        <Button size="sm" onClick={addKeyword}>Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {editorData.keywords.map((keyword) => (
                          <Badge key={keyword} variant="secondary" className="gap-1">
                            {keyword}
                            <button onClick={() => removeKeyword(keyword)} className="ml-1">×</button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Scheduling */}
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Schedule</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Status</Label>
                      <Select value={editorData.status} onValueChange={(val) => setEditorData({ ...editorData, status: val })}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="scheduled">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {editorData.status === "scheduled" && (
                      <div>
                        <Label className="text-xs">Publish Date</Label>
                        <Input
                          type="datetime-local"
                          value={editorData.scheduledFor}
                          onChange={(e) => setEditorData({ ...editorData, scheduledFor: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                    <p className="text-2xl font-bold mt-1">12,450</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+12% from last month</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Posts</p>
                    <p className="text-2xl font-bold mt-1">{posts.length}</p>
                  </div>
                  <Edit2 className="w-8 h-8 text-purple-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+3 this week</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Read Time</p>
                    <p className="text-2xl font-bold mt-1">4.2 min</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Across all posts</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement</p>
                    <p className="text-2xl font-bold mt-1">68%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
                <p className="text-xs text-green-600 mt-2">+5% from last week</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Top Performing Posts</h3>
              <div className="space-y-4">
                {posts
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">{post.author.name}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" />
                          {Math.floor(post.views * 0.15)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {dummyActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.action === "created" && <Plus className="w-5 h-5 text-primary" />}
                      {activity.action === "edited" && <Edit2 className="w-5 h-5 text-primary" />}
                      {activity.action === "published" && <Send className="w-5 h-5 text-primary" />}
                      {activity.action === "deleted" && <Trash2 className="w-5 h-5 text-destructive" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">
                        <span className="text-primary">{activity.user}</span> {activity.action} post
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.post}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PostsManagement;