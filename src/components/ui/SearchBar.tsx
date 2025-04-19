
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "搜索技能...", 
  onSearch,
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query.trim());
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex w-full max-w-md ${className}`}
    >
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-12 pl-10 h-11"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>
      <Button 
        type="submit" 
        className="absolute right-0 rounded-l-none h-11"
      >
        搜索
      </Button>
    </form>
  );
}
