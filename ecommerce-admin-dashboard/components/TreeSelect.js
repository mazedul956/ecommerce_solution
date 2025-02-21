// components/ui/TreeSelect.js
'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function TreeSelect({ options, onChange, maxDepth, ...props }) {
  const renderOptions = (items, depth = 0) => 
    items.map((item) => (
      <div key={item.value}>
        <SelectItem 
          value={item.value} 
          disabled={depth >= maxDepth}
          className={`pl-${depth * 4}`}
        >
          {item.label}
        </SelectItem>
        {item.children && renderOptions(item.children, depth + 1)}
      </div>
    ));

  return (
    <Select onValueChange={onChange} {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select parent category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={null}>Root Category</SelectItem>
        {renderOptions(options)}
      </SelectContent>
    </Select>
  );
}