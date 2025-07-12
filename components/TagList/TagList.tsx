import Tag from './Tag';

type TagListProps = {
  tags: string[];
  activeTag?: string | null;
  onTagClick?: (tag: string | null) => void;
};

export default function TagList({ tags, activeTag = null, onTagClick }: TagListProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {onTagClick && (
        <Tag 
          tag="All" 
          isActive={activeTag === null}
          onClick={() => onTagClick(null)}
        />
      )}
      {tags.map(tag => (
        <Tag
          key={tag}
          tag={tag}
          isActive={tag === activeTag}
          onClick={onTagClick ? () => onTagClick(tag) : undefined}
        />
      ))}
    </div>
  );
}