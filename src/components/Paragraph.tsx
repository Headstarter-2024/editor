"use client";

interface ParagraphProps {
  speaker: string;
  message: string;
  paragraphId: number;
  onClick: (id: number) => void;
}

const Paragraph: React.FC<ParagraphProps> = ({
  speaker,
  message,
  paragraphId,
  onClick,
}) => {
  return (
    <div>
      <p className="text-left text-sm font-normal text-gray-700">Speaker: {speaker}</p>
      <div className="tooltip tooltip-top" data-tip="Add Comment">
        <p
          className="mb-2 cursor-pointer rounded-lg p-2 text-left text-base font-normal hover:bg-base-300"
          onClick={() => onClick(paragraphId)}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default Paragraph;
