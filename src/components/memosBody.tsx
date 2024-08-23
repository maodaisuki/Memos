import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";

const testContent = "| test |\n| ---- |\n```python\nprint(\"helloworld\");\n```\n"
const MemosBody = () => {
    return (
        <div className="w-full markdown-body mb-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {testContent}
            </ReactMarkdown>
        </div>
    )
}

export default MemosBody;