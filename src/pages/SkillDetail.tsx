
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Calendar, 
  Heart, 
  MessageSquare, 
  Share, 
  Star, 
  School,
  User,
  Check,
  X
} from "lucide-react";

// Mock skill data
const SKILL_DETAILS = {
  id: "1",
  title: "Python编程基础教学",
  description: "可以教授Python编程基础知识，包括语法、数据结构、函数和简单的项目实践。我是计算机科学专业的学生，有3年的Python编程经验，曾参与过多个开源项目，也曾担任过编程课程的助教。\n\n教学内容包括但不限于：\n- Python基础语法\n- 数据类型和结构\n- 函数和模块\n- 面向对象编程\n- 文件操作\n- 简单的Web应用开发\n\n我的教学方式注重实践，会通过实际项目来巩固所学知识，适合零基础或有一定编程基础但想学习Python的同学。",
  exchangeExpectation: "希望能交换学习设计类技能（如PS、UI设计等）或语言类技能（如日语、法语入门等）。也欢迎其他有趣的技能交换提议！",
  category: "编程开发",
  images: [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  ],
  user: {
    id: "user1",
    name: "王小明",
    avatar: "https://i.pravatar.cc/150?img=1",
    school: "北京大学",
    major: "计算机科学",
    year: "大三",
    bio: "热爱编程和分享知识，希望通过技能交换结交志同道合的朋友。",
    skillCount: 3,
    joinedDate: "2023-05-15T00:00:00Z",
    rating: 4.8,
    reviewCount: 25
  },
  stats: {
    rating: 4.8,
    exchangeCount: 15,
    favoriteCount: 42,
    viewCount: 256
  },
  createdAt: "2023-09-15T00:00:00Z",
  reviews: [
    {
      id: "review1",
      user: {
        id: "reviewer1",
        name: "张三",
        avatar: "https://i.pravatar.cc/150?img=5",
        school: "清华大学"
      },
      rating: 5,
      content: "王同学的Python教学非常细致耐心，从基础语法到实际项目都讲解得很清楚。通过几次交流，我已经能够独立完成简单的Python程序了，非常感谢！",
      date: "2023-10-05T00:00:00Z"
    },
    {
      id: "review2",
      user: {
        id: "reviewer2",
        name: "李四",
        avatar: "https://i.pravatar.cc/150?img=6",
        school: "北京大学"
      },
      rating: 4,
      content: "教学内容很全面，讲解也比较清晰。如果能提供更多的练习题就更好了。总体来说还是很满意的，学到了很多知识。",
      date: "2023-09-28T00:00:00Z"
    },
    {
      id: "review3",
      user: {
        id: "reviewer3",
        name: "王五",
        avatar: "https://i.pravatar.cc/150?img=7",
        school: "复旦大学"
      },
      rating: 5,
      content: "非常棒的教学体验！王同学不仅教我Python基础，还帮我解决了项目中遇到的实际问题。他的讲解方式很容易理解，强烈推荐给想学Python的同学。",
      date: "2023-10-12T00:00:00Z"
    }
  ],
  relatedSkills: [
    {
      id: "11",
      title: "Java编程进阶",
      category: "编程开发",
      user: {
        id: "user11",
        name: "冯小岩",
        avatar: "https://i.pravatar.cc/150?img=11",
        school: "北京大学"
      }
    },
    {
      id: "5",
      title: "高等数学辅导",
      category: "学术辅导",
      user: {
        id: "user5",
        name: "赵小刚",
        avatar: "https://i.pravatar.cc/150?img=5",
        school: "浙江大学"
      }
    },
    {
      id: "8",
      title: "创意写作指导",
      category: "写作创作",
      user: {
        id: "user8",
        name: "周小莉",
        avatar: "https://i.pravatar.cc/150?img=8",
        school: "中国人民大学"
      }
    }
  ]
};

const SkillDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("details");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isExchangeDialogOpen, setIsExchangeDialogOpen] = useState(false);
  const [exchangeMessage, setExchangeMessage] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [mainImage, setMainImage] = useState(SKILL_DETAILS.images[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary, would be replaced by auth state
  
  // Mock user skills for exchange
  const USER_SKILLS = [
    { id: "us1", title: "数字营销基础" },
    { id: "us2", title: "日语入门会话" },
    { id: "us3", title: "吉他弹唱技巧" }
  ];
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  const handleExchangeSubmit = () => {
    // In a real app, this would send the exchange request
    console.log("Exchange request submitted", {
      skillId: id,
      offerSkillId: selectedSkill,
      message: exchangeMessage
    });
    
    setIsExchangeDialogOpen(false);
    // Show a success message
    alert("交换申请已发送，请等待对方回复！");
  };
  
  // Extract skill details
  const skill = SKILL_DETAILS;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="p-0 h-auto mb-2">
              <Link to="/skills" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回技能列表
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">{skill.title}</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Skill Images */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="relative aspect-video bg-secondary/30">
                  <img 
                    src={mainImage} 
                    alt={skill.title} 
                    className="object-cover w-full h-full"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary hover:bg-primary/90">
                    {skill.category}
                  </Badge>
                </div>
                
                {skill.images.length > 1 && (
                  <div className="flex p-4 gap-2 overflow-x-auto">
                    {skill.images.map((img, index) => (
                      <div 
                        key={index}
                        className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                          img === mainImage ? 'border-primary' : 'border-transparent'
                        }`}
                        onClick={() => setMainImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`${skill.title} ${index + 1}`} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-4">
                      <TabsTrigger value="details">技能详情</TabsTrigger>
                      <TabsTrigger value="reviews">评价 ({skill.reviews.length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">技能描述</h3>
                          <div className="text-muted-foreground whitespace-pre-line">
                            {skill.description}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">交换期望</h3>
                          <p className="text-muted-foreground">
                            {skill.exchangeExpectation}
                          </p>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">相关技能</h3>
                          <div className="flex flex-wrap gap-2">
                            {skill.relatedSkills.map((relatedSkill) => (
                              <Link 
                                key={relatedSkill.id}
                                to={`/skills/${relatedSkill.id}`}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                              >
                                <span className="text-sm">{relatedSkill.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="reviews">
                      <div className="space-y-6">
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(skill.stats.rating)
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-lg font-medium">
                            {skill.stats.rating.toFixed(1)}
                          </span>
                          <span className="ml-2 text-muted-foreground">
                            ({skill.reviews.length} 条评价)
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          {skill.reviews.map((review) => (
                            <div key={review.id} className="border border-border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={review.user.avatar} alt={review.user.name} />
                                    <AvatarFallback>{review.user.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">{review.user.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {review.user.school}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating
                                          ? "text-yellow-500 fill-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">{review.content}</p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {new Date(review.date).toLocaleDateString('zh-CN')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            {/* Right Column - User Info & Actions */}
            <div className="lg:col-span-1">
              {/* Action Buttons */}
              <div className="bg-white border border-border rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">技能提供者</h2>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted-foreground hover:text-red-500"
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
                
                <div className="flex items-center mb-6">
                  <Avatar className="h-14 w-14 mr-4">
                    <AvatarImage src={skill.user.avatar} alt={skill.user.name} />
                    <AvatarFallback>{skill.user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{skill.user.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <School className="h-4 w-4 mr-1" />
                      <span>{skill.user.school}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <User className="h-4 w-4 mr-1" />
                      <span>{skill.user.major} · {skill.user.year}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="text-xl font-semibold text-primary">{skill.user.skillCount}</div>
                    <div className="text-sm text-muted-foreground">技能数</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="flex items-center justify-center text-xl font-semibold text-primary">
                      {skill.user.rating}
                      <Star className="h-4 w-4 ml-1 fill-yellow-500 text-yellow-500" />
                    </div>
                    <div className="text-sm text-muted-foreground">评分</div>
                  </div>
                </div>
                
                <Button className="w-full mb-3" asChild>
                  <Link to={`/user/${skill.user.id}`}>
                    查看个人主页
                  </Link>
                </Button>
                
                <Dialog open={isExchangeDialogOpen} onOpenChange={setIsExchangeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline" disabled={!isLoggedIn}>
                      申请技能交换
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>申请技能交换</DialogTitle>
                      <DialogDescription>
                        向 {skill.user.name} 发送技能交换申请，说明你想要交换的技能。
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">选择你要交换的技能：</h4>
                        <div className="space-y-2">
                          {USER_SKILLS.map((userSkill) => (
                            <div 
                              key={userSkill.id}
                              className={`flex items-center p-3 border rounded-md cursor-pointer ${
                                selectedSkill === userSkill.id 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border'
                              }`}
                              onClick={() => setSelectedSkill(userSkill.id)}
                            >
                              <div className="flex-1">
                                <p className="font-medium">{userSkill.title}</p>
                              </div>
                              <div className="h-5 w-5 rounded-full border border-border flex items-center justify-center">
                                {selectedSkill === userSkill.id && (
                                  <Check className="h-3 w-3 text-primary" />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">交换说明：</h4>
                        <Textarea 
                          placeholder="请简要说明你的技能水平、交换方式和时间安排等" 
                          rows={4}
                          value={exchangeMessage}
                          onChange={(e) => setExchangeMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsExchangeDialogOpen(false)}>
                        取消
                      </Button>
                      <Button 
                        onClick={handleExchangeSubmit}
                        disabled={!selectedSkill || !exchangeMessage}
                      >
                        提交申请
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {!isLoggedIn && (
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    请 <Link to="/auth?tab=login" className="text-primary hover:underline">登录</Link> 后申请技能交换
                  </p>
                )}
              </div>
              
              {/* Skill Info */}
              <div className="bg-white border border-border rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-4">技能信息</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">发布时间</span>
                    <span className="font-medium">{new Date(skill.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">分类</span>
                    <Badge>{skill.category}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">已交换</span>
                    <span className="font-medium">{skill.stats.exchangeCount} 次</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">收藏数</span>
                    <span className="font-medium">{skill.stats.favoriteCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">浏览量</span>
                    <span className="font-medium">{skill.stats.viewCount}</span>
                  </div>
                </div>
              </div>
              
              {/* Share */}
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">分享技能</h3>
                <Button variant="outline" className="w-full" onClick={() => {
                  // In a real app, this would copy the URL to clipboard
                  alert("链接已复制到剪贴板");
                }}>
                  <Share className="mr-2 h-4 w-4" />
                  复制链接
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkillDetail;
