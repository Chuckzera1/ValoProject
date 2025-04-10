'use client';

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition, useState, useEffect } from 'react';

interface SearchInputProps {
  value: string;
  placeholder?: string;
}

export default function SearchInput({ value, placeholder = 'Search agents...' }: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (searchValue: string) => {
    setInputValue(searchValue);
    startTransition(() => {
      const queryString = createQueryString('search', searchValue);
      router.push(queryString ? `/?${queryString}` : '/');
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-valorant-white/50 w-5 h-5" />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-valorant-black/60 border border-valorant-gray/30 
        rounded-lg text-valorant-white placeholder:text-valorant-white/50
        focus:outline-none focus:border-valorant-red/50 focus:ring-1 focus:ring-valorant-red/50
        transition-all duration-200"
      />
    </div>
  );
} 