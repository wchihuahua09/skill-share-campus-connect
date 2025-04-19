
import { useState } from "react";
import { Check, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

// Define skill categories
const CATEGORIES = [
  "编程开发",
  "设计创意",
  "语言翻译",
  "学术辅导",
  "音乐艺术",
  "运动健身",
  "摄影摄像",
  "写作创作",
  "手工制作",
  "演讲口才",
  "其他技能"
];

// Define example schools
const SCHOOLS = [
  "北京大学",
  "清华大学",
  "复旦大学",
  "上海交通大学",
  "浙江大学",
  "南京大学",
  "武汉大学",
  "中国人民大学",
  "华中科技大学",
  "四川大学"
];

// Define sort options
const SORT_OPTIONS = [
  { value: "newest", label: "最新发布" },
  { value: "rating", label: "评分最高" },
  { value: "popular", label: "最受欢迎" }
];

export interface SkillFiltersProps {
  onFilterChange?: (filters: {
    categories: string[];
    schools: string[];
    sort: string;
  }) => void;
}

export function SkillFilters({ onFilterChange }: SkillFiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    
    onFilterChange?.({
      categories: newCategories,
      schools: selectedSchools,
      sort: selectedSort
    });
  };
  
  const handleSchoolChange = (school: string) => {
    const newSchools = selectedSchools.includes(school)
      ? selectedSchools.filter(s => s !== school)
      : [...selectedSchools, school];
    
    setSelectedSchools(newSchools);
    
    onFilterChange?.({
      categories: selectedCategories,
      schools: newSchools,
      sort: selectedSort
    });
  };
  
  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    
    onFilterChange?.({
      categories: selectedCategories,
      schools: selectedSchools,
      sort
    });
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSchools([]);
    
    onFilterChange?.({
      categories: [],
      schools: [],
      sort: selectedSort
    });
  };
  
  // Count total active filters
  const activeFilterCount = selectedCategories.length + selectedSchools.length;
  
  return (
    <div className="bg-white border border-border rounded-lg p-4 mb-6 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">筛选</h3>
        {activeFilterCount > 0 && (
          <Button variant="link" onClick={clearFilters} className="h-auto p-0">
            清除全部
          </Button>
        )}
      </div>
      
      {/* Desktop filter view */}
      <div className="hidden md:block">
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">技能分类</h4>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedCategories.includes(category) 
                    ? "bg-primary" 
                    : "hover:bg-secondary"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">学校</h4>
          <div className="flex flex-wrap gap-2">
            {SCHOOLS.slice(0, 5).map((school) => (
              <Badge
                key={school}
                variant={selectedSchools.includes(school) ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedSchools.includes(school) 
                    ? "bg-primary" 
                    : "hover:bg-secondary"
                }`}
                onClick={() => handleSchoolChange(school)}
              >
                {school}
              </Badge>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7">
                  更多学校 <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>选择学校</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {SCHOOLS.map((school) => (
                  <DropdownMenuCheckboxItem
                    key={school}
                    checked={selectedSchools.includes(school)}
                    onCheckedChange={() => handleSchoolChange(school)}
                  >
                    {school}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h4 className="text-sm font-medium mb-2">排序方式</h4>
          <div className="flex flex-wrap gap-2">
            {SORT_OPTIONS.map((option) => (
              <Badge
                key={option.value}
                variant={selectedSort === option.value ? "default" : "outline"}
                className={`cursor-pointer ${
                  selectedSort === option.value 
                    ? "bg-primary" 
                    : "hover:bg-secondary"
                }`}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile filter view */}
      <div className="md:hidden">
        <div className="flex gap-2">
          <Popover open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 justify-between"
                aria-expanded={isMobileFilterOpen}
              >
                <span className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2 bg-primary">{activeFilterCount}</Badge>
                  )}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">技能分类</h4>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedCategories.includes(category) 
                            ? "bg-primary" 
                            : "hover:bg-secondary"
                        }`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h4 className="font-medium">学校</h4>
                  <div className="flex flex-wrap gap-2">
                    {SCHOOLS.slice(0, 5).map((school) => (
                      <Badge
                        key={school}
                        variant={selectedSchools.includes(school) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedSchools.includes(school) 
                            ? "bg-primary" 
                            : "hover:bg-secondary"
                        }`}
                        onClick={() => handleSchoolChange(school)}
                      >
                        {school}
                      </Badge>
                    ))}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7">
                          更多 <ChevronDown className="h-3 w-3 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>选择学校</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {SCHOOLS.map((school) => (
                          <DropdownMenuCheckboxItem
                            key={school}
                            checked={selectedSchools.includes(school)}
                            onCheckedChange={() => handleSchoolChange(school)}
                          >
                            {school}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    disabled={activeFilterCount === 0}
                  >
                    清除筛选
                  </Button>
                  <Button 
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    应用
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 justify-between">
                <span>排序: {SORT_OPTIONS.find(o => o.value === selectedSort)?.label}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={selectedSort === option.value}
                  onCheckedChange={() => handleSortChange(option.value)}
                >
                  {option.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Active filters display */}
        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <Badge key={category} className="bg-secondary text-primary-foreground">
                {category}
                <button
                  className="ml-1 hover:text-foreground"
                  onClick={() => handleCategoryChange(category)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {selectedSchools.map((school) => (
              <Badge key={school} className="bg-secondary text-primary-foreground">
                {school}
                <button
                  className="ml-1 hover:text-foreground"
                  onClick={() => handleSchoolChange(school)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
