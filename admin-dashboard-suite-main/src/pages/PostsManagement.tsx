import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="min-h-screen bg-background flex overflow-hidden font-sans">
      {/* Fixed Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:translate-x-0`}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden md:pl-64">
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 z-20 bg-background border-b md:left-64">
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 pt-24 pb-6 px-4 md:px-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic uppercase">V_Node / Content Sequencer</h1>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1 shadow-sm">Global Post Deployment & Registry Matrix</p>
              </div>
              <Button onClick={handleCreateNew} className="gap-2 font-black uppercase italic tracking-widest text-[10px] px-6 h-10 shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4" />
                Initialize_Post
              </Button>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="bg-muted/50 p-1 border border-border/50 overflow-x-auto inline-flex whitespace-nowrap scrollbar-hide max-w-full">
                <TabsTrigger value="list" className="gap-2 font-bold uppercase tracking-widest text-[10px] italic">
                  <Eye className="w-4 h-4" />
                  Registry
                </TabsTrigger>
                <TabsTrigger value="editor" className="gap-2 font-bold uppercase tracking-widest text-[10px] italic">
                  <Edit2 className="w-4 h-4" />
                  Sequencer
                </TabsTrigger>
                <TabsTrigger value="analytics" className="gap-2 font-bold uppercase tracking-widest text-[10px] italic">
                  <BarChart3 className="w-4 h-4" />
                  Intelligence
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2 font-bold uppercase tracking-widest text-[10px] italic">
                  <Activity className="w-4 h-4" />
                  Audit_Log
                </TabsTrigger>
              </TabsList>

              {/* Posts List Tab */}
              <TabsContent value="list" className="space-y-6 m-0">
                <Card className="border-border/50 shadow-md">
                  <CardContent className="p-4 md:p-6">
                    {/* Filters and Search */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <Input
                          placeholder="Search database..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-11 bg-muted/20 border-border/30 focus:bg-background transition-all font-medium italic placeholder:not-italic"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-56 h-11 bg-muted/20 border-border/30 font-bold uppercase tracking-widest text-[10px] italic">
                          <SelectValue placeholder="FILTER / STATUS" />
                        </SelectTrigger>
                        <SelectContent className="border-border/50">
                          <SelectItem value="all" className="font-bold uppercase text-[10px]">All Status</SelectItem>
                          <SelectItem value="published" className="font-bold uppercase text-[10px]">Published</SelectItem>
                          <SelectItem value="draft" className="font-bold uppercase text-[10px]">Draft</SelectItem>
                          <SelectItem value="scheduled" className="font-bold uppercase text-[10px]">Scheduled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Bulk Actions */}
                    {selectedPosts.length > 0 && (
                      <div className="flex items-center gap-3 mb-6 p-3 bg-primary/5 border border-primary/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary italic pl-2">{selectedPosts.length} Node(s) Selected</span>
                        <div className="h-4 w-px bg-primary/20 mx-2" />
                        <Button size="sm" variant="ghost" onClick={handleBulkPublish} className="gap-2 font-bold uppercase tracking-widest text-[10px] h-8 hover:bg-primary/10 text-primary">
                          <Send className="w-3.5 h-3.5" />
                          Batch_Push
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleBulkDelete} className="gap-2 font-bold uppercase tracking-widest text-[10px] h-8 text-destructive hover:bg-destructive/10">
                          <Trash2 className="w-3.5 h-3.5" />
                          Purge
                        </Button>
                      </div>
                    )}

                    {/* Posts Table */}
                    <div className="overflow-x-auto -mx-4 md:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-border/30 translate-gpu">
                          <thead>
                            <tr className="bg-muted/30">
                              <th className="p-4 text-left w-10">
                                <Checkbox
                                  checked={selectedPosts.length === paginatedPosts.length && paginatedPosts.length > 0}
                                  onCheckedChange={handleSelectAll}
                                  className="border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                              </th>
                              <th className="p-4 text-left font-black uppercase tracking-widest text-[10px] italic">Post / Title</th>
                              <th className="p-4 text-left font-black uppercase tracking-widest text-[10px] italic">Creator</th>
                              <th className="p-4 text-left font-black uppercase tracking-widest text-[10px] italic">Status</th>
                              <th className="p-4 text-left font-black uppercase tracking-widest text-[10px] italic">Reach</th>
                              <th className="p-4 text-left font-black uppercase tracking-widest text-[10px] italic">Timestamp</th>
                              <th className="p-4 text-left font-black uppercase tracking-widest text-[10px] italic">Ops</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/20">
                            {paginatedPosts.map((post) => (
                              <tr key={post.id} className="hover:bg-muted/20 transition-colors group">
                                <td className="p-4">
                                  <Checkbox
                                    checked={selectedPosts.includes(post.id)}
                                    onCheckedChange={(checked) => handleSelectPost(post.id, checked as boolean)}
                                    className="border-muted-foreground/20 data-[state=checked]:bg-primary"
                                  />
                                </td>
                                <td className="p-4">
                                  <div className="max-w-xs md:max-w-md">
                                    <p className="font-black text-sm uppercase tracking-tight italic text-foreground group-hover:text-primary transition-colors truncate">{post.title}</p>
                                    <p className="text-[10px] font-mono text-muted-foreground/60 truncate mt-0.5">{post.slug}</p>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2.5">
                                    <Avatar className="w-8 h-8 border-2 border-background shadow-sm ring-1 ring-border/20">
                                      <AvatarImage src={post.author.avatar} />
                                      <AvatarFallback className="font-bold text-[10px] uppercase">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-[10px] font-bold uppercase tracking-wider italic text-muted-foreground">{post.author.name}</span>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <Badge className={`font-black uppercase italic tracking-widest text-[9px] px-2 py-0.5 shadow-sm border-none ${getStatusColor(post.status)}`}>
                                    <span className="mr-1">{getStatusIcon(post.status)}</span>
                                    {post.status}
                                  </Badge>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-1.5 text-[10px] font-black italic tracking-tighter text-muted-foreground">
                                    <Eye className="w-3.5 h-3.5 text-primary/60" />
                                    {post.views.toLocaleString()}_V
                                  </div>
                                </td>
                                <td className="p-4 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tighter">{post.createdAt}</td>
                                <td className="p-4">
                                  <div className="flex items-center gap-1">
                                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all" onClick={() => handleEditPost(post)}>
                                      <Edit2 className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-all" onClick={() => handleDeletePost(post.id)}>
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col md:flex-row items-center justify-between mt-8 gap-4 border-t border-border/30 pt-6">
                      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.1em]">
                        Displaying {((currentPage - 1) * postsPerPage) + 1} - {Math.min(currentPage * postsPerPage, filteredPosts.length)} / {filteredPosts.length} Units
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="font-bold uppercase tracking-widest text-[9px] h-8 px-4"
                        >
                          Prev_Sequence
                        </Button>
                        <div className="bg-muted/50 px-3 py-1 rounded text-[10px] font-bold italic border border-border/30">
                          {currentPage} / {totalPages}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="font-bold uppercase tracking-widest text-[9px] h-8 px-4"
                        >
                          Next_Sequence
                        </Button>
                      </div>
                    </div>
                  </CardContent>
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
          <TabsContent value="analytics" className="space-y-6 m-0 animate-in fade-in duration-300">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Metric / Attention</CardTitle>
                  <Eye className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-foreground italic">12.4K_V</div>
                  <p className="text-[9px] font-bold text-green-600 uppercase tracking-tighter mt-1">+12% / GROWTH_SIG</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Node / Count</CardTitle>
                  <Edit2 className="w-4 h-4 text-purple-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-purple-500 italic">{posts.length}_P</div>
                  <p className="text-[9px] font-bold text-green-600 uppercase tracking-tighter mt-1">+3 / WEEKLY_SYNC</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Retention / Time</CardTitle>
                  <Clock className="w-4 h-4 text-orange-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-orange-500 italic">4.2M</div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-1">CROSS_NODE_AVG</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 md:px-6">
                  <CardTitle className="text-[10px] md:text-xs font-black uppercase tracking-widest text-muted-foreground italic">Efficiency / ENG</CardTitle>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </CardHeader>
                <CardContent className="px-4 md:px-6 pb-4">
                  <div className="text-xl md:text-3xl font-black tracking-tighter text-green-500 italic">68%_E</div>
                  <p className="text-[9px] font-bold text-green-600 uppercase tracking-tighter mt-1">+5% / NETWORK_DELTA</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 shadow-md overflow-hidden">
              <CardHeader className="px-4 md:px-6 py-5 border-b border-border/30 bg-secondary/10">
                <CardTitle className="text-lg md:text-xl font-black tracking-tighter text-foreground italic uppercase">Performance / Alpha Nodes</CardTitle>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">High-Entropy Content Performance Matrix</p>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {posts
                    .sort((a, b) => b.views - a.views)
                    .slice(0, 5)
                    .map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/20 hover:bg-muted/50 transition-all group">
                        <div className="flex-1 min-w-0 pr-4">
                          <p className="font-black text-sm uppercase tracking-tight italic text-foreground group-hover:text-primary transition-colors truncate">{post.title}</p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-0.5">{post.author.name}</p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] font-black italic tracking-tighter shrink-0">
                          <div className="flex items-center gap-1.5 text-primary/70">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views}_V
                          </div>
                          <div className="flex items-center gap-1.5 text-chart-2/70">
                            <Share2 className="w-3.5 h-3.5" />
                            {Math.floor(post.views * 0.15)}_S
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Log Tab */}
          <TabsContent value="activity" className="space-y-6 m-0 animate-in fade-in duration-300">
            <Card className="border-border/50 shadow-md overflow-hidden">
              <CardHeader className="px-4 md:px-6 py-5 border-b border-border/30 bg-secondary/10">
                <CardTitle className="text-lg md:text-xl font-black tracking-tighter text-foreground italic uppercase">Audit / Sequence Log</CardTitle>
                <p className="text-[10px] md:text-xs font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mt-1">Live Deployment & Alteration Stream</p>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <div className="space-y-4">
                  {dummyActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/10 hover:border-border/30 transition-all">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-inner">
                        {activity.action === "created" && <Plus className="w-5 h-5 text-primary" />}
                        {activity.action === "edited" && <Edit2 className="w-5 h-5 text-primary" />}
                        {activity.action === "published" && <Send className="w-5 h-5 text-primary" />}
                        {activity.action === "deleted" && <Trash2 className="w-5 h-5 text-destructive" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-foreground">
                          <span className="font-black italic uppercase tracking-widest text-primary text-[11px] mr-1">{activity.user}</span> 
                          <span className="uppercase tracking-tighter text-[11px] text-muted-foreground/80">{activity.action} post</span>
                        </p>
                        <p className="text-xs font-black uppercase tracking-tight italic text-foreground mt-1 truncate">{activity.post}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/40 mt-1 uppercase tracking-tighter">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  </div>
</div>
  );
};

export default PostsManagement;