
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkillCard, SkillCardProps } from "@/components/skills/SkillCard";
import { SkillFilters } from "@/components/skills/SkillFilters";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/button";
import { 
  Pagination, 
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Plus } from "lucide-react";

// Mock data for skills
const ALL_SKILLS: SkillCardProps[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: "5",
    title: "高等数学辅导",
    description: "数学专业研究生，可以辅导高等数学、线性代数等大学数学课程，有丰富的教学经验。",
    category: "学术辅导",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    user: {
      id: "user5",
      name: "赵小刚",
      avatar: "https://i.pravatar.cc/150?img=5",
      school: "浙江大学"
    },
    rating: 4.6,
    exchangeCount: 18,
    createdAt: "2023-09-25T00:00:00Z"
  },
  {
    id: "6",
    title: "篮球技巧训练",
    description: "校篮球队成员，可以教授基本的篮球技巧，包括投篮、运球、防守等，适合初学者。",
    category: "运动健身",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    user: {
      id: "user6",
      name: "钱小伟",
      avatar: "https://i.pravatar.cc/150?img=6",
      school: "南京大学"
    },
    rating: 4.4,
    exchangeCount: 7,
    createdAt: "2023-10-05T00:00:00Z"
  },
  {
    id: "7",
    title: "摄影构图与后期",
    description: "摄影爱好者，可以分享摄影构图技巧和Lightroom后期处理经验，有多次摄影比赛获奖经历。",
    category: "摄影摄像",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    user: {
      id: "user7",
      name: "孙小芳",
      avatar: "https://i.pravatar.cc/150?img=7",
      school: "武汉大学"
    },
    rating: 4.8,
    exchangeCount: 10,
    createdAt: "2023-09-18T00:00:00Z"
  },
  {
    id: "8",
    title: "创意写作指导",
    description: "文学院学生，擅长小说和散文创作，可以提供写作技巧指导和作品点评。",
    category: "写作创作",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    user: {
      id: "user8",
      name: "周小莉",
      avatar: "https://i.pravatar.cc/150?img=8",
      school: "中国人民大学"
    },
    rating: 4.6,
    exchangeCount: 9,
    createdAt: "2023-10-08T00:00:00Z"
  },
  {
    id: "9",
    title: "法语入门教学",
    description: "法语专业学生，可以教授法语入门知识，包括基本发音、日常对话和简单语法。",
    category: "语言翻译",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    user: {
      id: "user9",
      name: "吴小青",
      avatar: "https://i.pravatar.cc/150?img=9",
      school: "华中科技大学"
    },
    rating: 4.7,
    exchangeCount: 11,
    createdAt: "2023-09-22T00:00:00Z"
  },
  {
    id: "10",
    title: "手工编织技巧",
    description: "手工爱好者，擅长毛线编织、手链制作等，可以教授基本编织方法和创意设计。",
    category: "手工制作",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    user: {
      id: "user10",
      name: "郑小月",
      avatar: "https://i.pravatar.cc/150?img=10",
      school: "四川大学"
    },
    rating: 4.5,
    exchangeCount: 8,
    createdAt: "2023-10-03T00:00:00Z"
  },
  {
    id: "11",
    title: "Java编程进阶",
    description: "计算机科学专业，Java开发经验丰富，可以教授Java进阶知识，包括面向对象编程、设计模式等。",
    category: "编程开发",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    user: {
      id: "user11",
      name: "冯小岩",
      avatar: "https://i.pravatar.cc/150?img=11",
      school: "北京大学"
    },
    rating: 4.9,
    exchangeCount: 16,
    createdAt: "2023-09-28T00:00:00Z"
  },
  {
    id: "12",
    title: "素描基础教学",
    description: "美术学院学生，可以教授素描基础，包括构图、明暗、透视等原理和技巧。",
    category: "设计创意",
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc",
    user: {
      id: "user12",
      name: "何小梅",
      avatar: "https://i.pravatar.cc/150?img=12",
      school: "清华大学"
    },
    rating: 4.6,
    exchangeCount: 9,
    createdAt: "2023-10-12T00:00:00Z"
  }
];

const Skills = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredSkills, setFilteredSkills] = useState<SkillCardProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporary, would be replaced by auth state
  
  const itemsPerPage = 8;
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  
  useEffect(() => {
    // Apply filters
    let results = [...ALL_SKILLS];
    
    // Apply search query
    if (queryParam) {
      results = results.filter(
        skill => 
          skill.title.toLowerCase().includes(queryParam.toLowerCase()) ||
          skill.description.toLowerCase().includes(queryParam.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryParam) {
      results = results.filter(
        skill => skill.category === categoryParam
      );
    }
    
    setFilteredSkills(results);
    setCurrentPage(1);
  }, [queryParam, categoryParam]);
  
  const handleSearch = (query: string) => {
    setSearchParams(prev => {
      if (query) {
        prev.set("q", query);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  };
  
  const handleFilterChange = (filters: {
    categories: string[];
    schools: string[];
    sort: string;
  }) => {
    // In a real app, this would update the URL parameters and trigger a new search
    console.log("Filters changed:", filters);
    
    // Apply category filter (for demo purposes)
    let results = [...ALL_SKILLS];
    
    if (filters.categories.length > 0) {
      results = results.filter(skill => 
        filters.categories.includes(skill.category)
      );
    }
    
    if (filters.schools.length > 0) {
      results = results.filter(skill => 
        filters.schools.includes(skill.user.school)
      );
    }
    
    // Apply sorting
    if (filters.sort === "newest") {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sort === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (filters.sort === "popular") {
      results.sort((a, b) => b.exchangeCount - a.exchangeCount);
    }
    
    setFilteredSkills(results);
    setCurrentPage(1);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const paginatedSkills = filteredSkills.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">技能浏览</h1>
              <p className="text-muted-foreground">
                发现并连接校园中的技能分享者
              </p>
            </div>
            
            {isLoggedIn && (
              <Button className="mt-4 md:mt-0" asChild>
                <a href="/skills/new">
                  <Plus className="mr-2 h-4 w-4" />
                  发布我的技能
                </a>
              </Button>
            )}
          </div>
          
          <div className="mb-6">
            <SearchBar 
              placeholder="搜索技能名称、描述..." 
              onSearch={handleSearch}
              className="max-w-xl"
            />
            {queryParam && (
              <p className="mt-2 text-sm text-muted-foreground">
                搜索 "{queryParam}" 的结果：{filteredSkills.length} 个技能
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SkillFilters onFilterChange={handleFilterChange} />
            </div>
            
            <div className="lg:col-span-3">
              {paginatedSkills.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {paginatedSkills.map((skill) => (
                      <SkillCard key={skill.id} {...skill} />
                    ))}
                  </div>
                  
                  {totalPages > 1 && (
                    <Pagination className="mt-6">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            href="#"
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink 
                              href="#"
                              isActive={currentPage === i + 1}
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(i + 1);
                              }}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            href="#"
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              ) : (
                <div className="bg-white border border-border rounded-lg p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">未找到匹配的技能</h3>
                  <p className="text-muted-foreground mb-4">
                    尝试使用不同的搜索词或筛选条件
                  </p>
                  <Button onClick={() => {
                    setSearchParams({});
                    handleFilterChange({
                      categories: [],
                      schools: [],
                      sort: "newest"
                    });
                  }}>
                    清除所有筛选
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Skills;
