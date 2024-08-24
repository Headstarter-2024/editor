"use client";

interface ParagraphProps {
  text: string;
  paragraphId: number;
  onClick: (id: number) => void;
}

const Paragraph: React.FC<ParagraphProps> = ({
  text,
  paragraphId,
  onClick,
}) => {
  return (
    <div className="tooltip tooltip-right" data-tip="Add Comment">
      <p
        className="mb-2 cursor-pointer p-2 hover:bg-gray-100"
        onClick={() => onClick(paragraphId)}
      >
        {text}
      </p>
    </div>
  );
};

export default Paragraph;
