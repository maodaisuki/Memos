import Memo from "@/interfaces/memo";
import { MouseEventHandler } from "react";
import toast from "react-hot-toast";

type Props = {
    createdTime: string,
    memo: Memo,
    onEdit: MouseEventHandler<HTMLLIElement>,
    currentUserId: number,
    userId: number,
    onDelete: Function
}

const MemosHeader = ({ createdTime, memo, onEdit, userId, currentUserId, onDelete }: Props) => {
    const copyLink = (memoId: number) => {
        const memoUrl = process.env.NEXT_PUBLIC_BASE_URL + `/mine/${memoId}`
        navigator.clipboard.writeText(memoUrl).then(() => {
            document.getElementById("memoDropdownMenu")?.blur();
            toast.success("复制链接成功");
        });
    }

    const copyContent = (memoContent: string) => {
        navigator.clipboard.writeText(memoContent).then(() => {
            document.getElementById("memoDropdownMenu")?.blur();
            toast.success("复制内容成功");
        });
    }
    return (
        <div className="W-full flex flex-row mb-[12px] text-[12px] justify-between items-center">
            <div className="text-baseline">
                {createdTime}
            </div>
            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="text-baseline align-middle">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </div>
                <ul tabIndex={0} id="memoDropdownMenu" className="dropdown-content menu bg-base-100 rounded-[4px] z-[999] w-40 p-2 shadow">
                    {
                        currentUserId == userId && <li onClick={onEdit}><a>编辑</a></li>
                    }
                    {/* <li><a>生成分享图</a></li> */}
                    <li onClick={() => { copyContent(memo.content); }}><a>复制内容</a></li>
                    <li onClick={() => { copyLink(memo.memoId!); }}><a>复制链接</a></li>
                    {
                        currentUserId == userId && <li className="text-error" onClick={async () => { await onDelete(memo.memoId) }}><a>删除</a></li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default MemosHeader;