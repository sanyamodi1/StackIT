type TagProps = {
  tag: string;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Tag({ tag, isActive = false, onClick }: TagProps) {
  const baseClasses = "px-3 py-1 rounded text-sm font-medium transition";
  const activeClasses = isActive
    ? "bg-blue-700 text-white"
    : "bg-gray-800 text-gray-300 hover:bg-gray-700";

  return onClick ? (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      {tag}
    </button>
  ) : (
    <span className={`${baseClasses} ${activeClasses}`}>{tag}</span>
  );
}
