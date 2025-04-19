
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-secondary/50 py-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">校园技能交换</h3>
            <p className="text-muted-foreground">
              连接大学生，交换技能，共同成长。校园技能交换平台致力于帮助大学生们分享知识，交流经验。
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">平台导航</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  首页
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-muted-foreground hover:text-primary">
                  技能浏览
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-primary">
                  社区交流
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  关于我们
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">常见问题</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help/how-it-works" className="text-muted-foreground hover:text-primary">
                  如何使用
                </Link>
              </li>
              <li>
                <Link to="/help/faq" className="text-muted-foreground hover:text-primary">
                  常见问题
                </Link>
              </li>
              <li>
                <Link to="/help/contact" className="text-muted-foreground hover:text-primary">
                  联系我们
                </Link>
              </li>
              <li>
                <Link to="/help/terms" className="text-muted-foreground hover:text-primary">
                  使用条款
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">WeChat</span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  微信
                </div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">QQ</span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  QQ
                </div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Weibo</span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  微博
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} 校园技能交换平台 · 保留所有权利
          </p>
        </div>
      </div>
    </footer>
  );
}
