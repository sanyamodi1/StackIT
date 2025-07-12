type TagProps = {
  tag: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Tag({ tag, isActive = false, onClick }: TagProps) {
  const baseClasses = "px-3 py-1 rounded";
  const activeClasses = isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-200';
  
  return onClick ? (
    <button
      onClick={onClick}
      className={`${baseClasses} ${activeClasses} hover:bg-blue-50`}
    >
      {tag}
    </button>
  ) : (
    <span className={`${baseClasses} ${activeClasses}`}>
      {tag}
    </span>
  );
}