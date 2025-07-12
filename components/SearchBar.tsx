type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}