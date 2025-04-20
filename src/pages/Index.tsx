import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchBar } from "@/components/ui/SearchBar";
import { SkillCard, SkillCardProps } from "@/components/skills/SkillCard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";

// Mock data for featured skills
const FEATURED_SKILLS: SkillCardProps[] = [{
  id: "1",
  title: "Python编程基础教学",
  description: "可以教授Python编程基础知识，包括语法、数据结构、函数和简单的项目实践。",
  category: "编程开发",
  image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  user: {
    id: "user1",
    name: "王小明",
    avatar: "https://i.pravatar.cc/150?img=1",
    school: "北京大学"
  },
  rating: 4.8,
  exchangeCount: 15,
  createdAt: "2023-09-15T00:00:00Z"
}, {
  id: "2",
  title: "平面设计与PS技巧",
  description: "擅长使用Photoshop和Illustrator进行平面设计，可以教授海报、logo设计的基本技巧。",
  category: "设计创意",
  image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  user: {
    id: "user2",
    name: "李小红",
    avatar: "https://i.pravatar.cc/150?img=2",
    school: "清华大学"
  },
  rating: 4.5,
  exchangeCount: 8,
  createdAt: "2023-10-01T00:00:00Z"
}, {
  id: "3",
  title: "英语口语与写作",
  description: "英语专业学生，可以提供英语口语练习和学术写作辅导，有丰富的出国交流经验。",
  category: "语言翻译",
  image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  user: {
    id: "user3",
    name: "张小华",
    avatar: "https://i.pravatar.cc/150?img=3",
    school: "复旦大学"
  },
  rating: 4.9,
  exchangeCount: 20,
  createdAt: "2023-09-20T00:00:00Z"
}, {
  id: "4",
  title: "吉他入门教学",
  description: "从零基础开始教授吉他弹唱，包括基本和弦、指法训练和简单歌曲演奏。",
  category: "音乐艺术",
  user: {
    id: "user4",
    name: "陈小强",
    avatar: "https://i.pravatar.cc/150?img=4",
    school: "上海交通大学"
  },
  rating: 4.7,
  exchangeCount: 12,
  createdAt: "2023-10-10T00:00:00Z"
}];

// Mock data for category counts
const CATEGORIES = [{
  name: "编程开发",
  count: 156,
  icon: "💻"
}, {
  name: "设计创意",
  count: 98,
  icon: "🎨"
}, {
  name: "语言翻译",
  count: 87,
  icon: "🌎"
}, {
  name: "学术辅导",
  count: 132,
  icon: "📚"
}, {
  name: "音乐艺术",
  count: 64,
  icon: "🎵"
}, {
  name: "运动健身",
  count: 45,
  icon: "🏀"
}, {
  name: "摄影摄像",
  count: 38,
  icon: "📷"
}, {
  name: "写作创作",
  count: 52,
  icon: "✍️"
}];

// Mock data for testimonials
const TESTIMONIALS = [{
  id: "t1",
  content: "通过技能交换平台，我学到了摄影技巧，同时也把我的英语写作技能教给了别人。这种双赢的交流方式真的很棒！",
  user: {
    name: "刘同学",
    avatar: "https://i.pravatar.cc/150?img=5",
    school: "浙江大学",
    major: "传媒学院"
  }
}, {
  id: "t2",
  content: "之前一直想学习UI设计，但苦于没有资源。在这个平台上找到了愿意交换的同学，我教他数学，他教我设计，互惠互利！",
  user: {
    name: "张同学",
    avatar: "https://i.pravatar.cc/150?img=6",
    school: "南京大学",
    major: "数学系"
  }
}, {
  id: "t3",
  content: "作为计算机专业的学生，我通过平台将编程知识与音乐爱好者交换，学到了吉他技巧。这种跨学科的交流让我的大学生活更加丰富多彩。",
  user: {
    name: "王同学",
    avatar: "https://i.pravatar.cc/150?img=7",
    school: "武汉大学",
    major: "计算机科学"
  }
}];
const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would redirect to the search results page
    window.location.href = `/skills?q=${encodeURIComponent(query)}`;
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
              校园技能交换平台
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              分享你的技能，收获新知识。连接校园人才，交换成长经验。
            </p>
            
            <div className="max-w-xl mx-auto mb-8">
              <SearchBar placeholder="搜索你感兴趣的技能..." onSearch={handleSearch} className="w-full" />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Button asChild size="lg">
                
              </Button>
              <Button asChild variant="outline" size="lg">
                
              </Button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute top-1/3 left-10 w-20 h-20 bg-primary/10 rounded-full"></div>
          <div className="hidden md:block absolute top-2/3 right-10 w-32 h-32 bg-primary/10 rounded-full"></div>
          <div className="hidden md:block absolute bottom-10 left-1/4 w-16 h-16 bg-primary/10 rounded-full"></div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">探索技能分类</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                我们平台涵盖多种技能类别，总有一项适合你分享或学习
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORIES.map(category => <Link key={category.name} to={`/skills?category=${encodeURIComponent(category.name)}`} className="bg-secondary/50 hover:bg-secondary rounded-lg p-4 text-center transition-colors group">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{category.count}个技能</p>
                </Link>)}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/skills">
                  查看所有分类
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Skills Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">热门技能</h2>
                <p className="text-muted-foreground">发现校园里最受欢迎的技能交换</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/skills">
                  查看更多
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURED_SKILLS.map(skill => <SkillCard key={skill.id} {...skill} />)}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">如何使用</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                通过简单的四个步骤，开始你的技能交换之旅
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">创建账号</h3>
                <p className="text-muted-foreground">
                  注册一个账号，完善你的个人信息和学校资料
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">发布技能</h3>
                <p className="text-muted-foreground">
                  分享你擅长的技能，详细描述你能提供的帮助
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">寻找交换</h3>
                <p className="text-muted-foreground">
                  浏览平台上的技能，寻找你想要学习的内容
                </p>
              </div>
              
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">开始交换</h3>
                <p className="text-muted-foreground">
                  与对方沟通，确定交换方式和时间，互相学习成长
                </p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button asChild size="lg">
                
              </Button>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">用户心声</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                听听其他同学的技能交换体验
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map(testimonial => <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border border-border">
                  <p className="italic text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.user.avatar} alt={testimonial.user.name} />
                      <AvatarFallback>{testimonial.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.user.school} · {testimonial.user.major}
                      </p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              准备好开始你的技能交换之旅了吗？
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              加入我们的平台，与校园中的其他同学分享技能，收获知识。无论你是想学习新技能，还是分享你的特长，这里都是最佳平台。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link to="/skills">探索技能</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>;
};
export default Index;