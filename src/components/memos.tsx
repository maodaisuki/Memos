import Link from "next/link";
import Image from "next/image";
import MemosHeader from "./memosHeader";
import MemosBody from "./memosBody";
import MemosFooter from "./memosFooter";


// TODO 分享时，根据 id 构建 URL，前端开发根据 id 查询笔记。

const MemosCard = () => {
    return (
        <div className="w-full flex flex-col bg-base-200 rounded-[4px] p-[15px]">
            <MemosHeader />
            <MemosBody />
            <MemosFooter />
        </div>
    );
}

export default MemosCard;