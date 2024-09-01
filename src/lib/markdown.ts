import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export default async function markdownToHtml(md: string) {
    const result = await remark()
        .use(gfm)
        .use(html)
        .process(md);
    return result.toString();
}