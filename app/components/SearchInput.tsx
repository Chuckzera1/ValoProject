import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'Search agents...' }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-valorant-white/50 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-valorant-black/60 border border-valorant-gray/30 
        rounded-lg text-valorant-white placeholder:text-valorant-white/50
        focus:outline-none focus:border-valorant-red/50 focus:ring-1 focus:ring-valorant-red/50
        transition-all duration-200"
      />
    </div>
  );
} 