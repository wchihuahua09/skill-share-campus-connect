
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('user_info');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    setUserInfo(null);
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">S</div>
            <span className="text-xl font-bold text-primary hidden md:inline-block">SkillShare</span>
          </Link>
          
          <div className="hidden md:flex relative ml-6">
            <Input type="search" placeholder="搜索技能..." className="w-full pl-10" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/skills">技能浏览</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/community">社区</Link>
          </Button>
          
          {userInfo ? (
            <>
              <Button variant="ghost" className="relative" asChild>
                <Link to="/messages">消息</Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 p-0 rounded-full">
                    <Avatar>
                      <AvatarImage src={userInfo.avatar_url} alt={userInfo.username} />
                      <AvatarFallback>{userInfo.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">个人中心</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/exchanges" className="cursor-pointer">交换申请</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button variant="default" asChild>
              <Link to="/login">登录</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Button variant="ghost" className="md:hidden h-9 w-9 p-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden p-4 pb-6 bg-white border-b border-border">
          <div className="mb-4 relative">
            <Input type="search" placeholder="搜索技能..." className="w-full pl-10" />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <div className="flex flex-col space-y-2">
            <Link to="/skills" className="text-foreground hover:text-primary py-2 px-3 rounded-md hover:bg-secondary" onClick={() => setIsMenuOpen(false)}>
              技能浏览
            </Link>
            <Link to="/community" className="text-foreground hover:text-primary py-2 px-3 rounded-md hover:bg-secondary" onClick={() => setIsMenuOpen(false)}>
              社区
            </Link>
            
            {userInfo ? (
              <>
                <Link to="/profile" className="text-foreground hover:text-primary py-2 px-3 rounded-md hover:bg-secondary" onClick={() => setIsMenuOpen(false)}>
                  个人中心
                </Link>
                <Link to="/exchanges" className="text-foreground hover:text-primary py-2 px-3 rounded-md hover:bg-secondary" onClick={() => setIsMenuOpen(false)}>
                  交换申请
                </Link>
                <Button variant="ghost" className="justify-start px-3 font-normal hover:bg-secondary" onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}>
                  退出登录
                </Button>
              </>
            ) : (
              <div className="flex mt-2">
                <Button variant="default" asChild className="flex-1">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    登录
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
