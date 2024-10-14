'use client'
import markdownToHtml from "@/lib/markdown";
import { useEffect, useState } from "react";

const Paper = () => {
    const [html, setHtmlContent] = useState('');
    const paper = "## 用户协议\n不要干坏事。\n\nMAOJI 不对您做的一切负责，也不确保您所有的数据不会泄漏。";
    useEffect(() => {
        markdownToHtml(paper).then((html) => setHtmlContent(html));
    }, [paper]);
    return (
        <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
            <div className="md:w-full max-w-md min-h-screen flex w-full my-[20px]">
                <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
        </main>
    );
}

export default Paper;