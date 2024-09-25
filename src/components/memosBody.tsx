import markdownToHtml from "@/lib/markdown";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { useEffect, useState } from "react";

type Props = {
    content: string;
}

const MemosBody = ({ content }: Props) => {
    const [htmlContent, setHtmlContent] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const tagRegex = /#([^#\s]+)#/g;
    const matchTags = content.match(tagRegex);
    useEffect(() => {
        markdownToHtml(content).then((html) => setHtmlContent(html));
    }, [content]);
    if(matchTags !== null) {
        matchTags.forEach(tag => {
            content = content.replace(tag, `[\`${tag}\`](/hashtags/${encodeURIComponent(tag.slice(1, -1))})`);
        });
    }
    return (
        <div className="w-full mb-[5px]">
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: isCollapsed && htmlContent.trim().length > 500 ? htmlContent.substring(0, 250) + "..." : htmlContent}}></div>
            {
                htmlContent.trim().length > 250 && (
                    <div className="text-end w-full mt-[5px]">
                        <span className="hover:cursor-pointer text-[12px] text-info"  onClick={() => {setIsCollapsed(!isCollapsed)}}>
                            { isCollapsed ? "展开" : "折叠" }
                        </span>
                    </div>
                )
            }
        </div>
    )
}

export default MemosBody;