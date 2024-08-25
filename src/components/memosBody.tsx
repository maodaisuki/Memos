import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

type Props = {
    content: string;
}

const MemosBody = ({ content }: Props) => {
    return (
        <div className="w-full markdown-body mb-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    )
}

export default MemosBody;