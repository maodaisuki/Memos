import { deleteMemoById } from "@/api/memo";
import PropTypes from "prop-types";
import { MouseEventHandler, MutableRefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    createdTime: string,
    memoId: number,
    onEdit: MouseEventHandler<HTMLLIElement>,
    currentUserId: number,
    userId: number
}

function copyLink(memoId: number) {
    const memoUrl = process.env.NEXT_PUBLIC_API_URL + `/mine?memoId=${memoId}`
    navigator.clipboard.writeText(memoUrl).then(() => {
        document.getElementById("memoDropdownMenu")?.blur();
        toast.success("复制链接成功");
    });
}

async function deleteMemo(memoId: number, ref: any) {
    const { data } = await deleteMemoById(memoId);
    if(data !== null) {
        if(data.count !== 0) {
            ref.current.parentNode.remove();
            toast.success("删除成功");
        }
        else {
            toast.error("删除失败，请检查网络重试");
        }
    }
    else {
        toast.error("删除失败，请检查网络重试");
    }
}

const MemosHeader = ({ createdTime, memoId, onEdit, userId, currentUserId }: Props) => {
    const parentRef = useRef(null);

    return (
        <div ref={parentRef} className="W-full flex flex-row mb-[12px] text-[12px] justify-between items-center">
            <div className="text-baseline">
                { createdTime }
            </div>
            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="text-baseline align-middle">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </div>
                <ul tabIndex={0} id="memoDropdownMenu" className="dropdown-content menu bg-base-100 rounded-[4px] z-[999] w-40 p-2 shadow">
                    {
                        currentUserId == userId && <li onClick={onEdit}><a>编辑</a></li>
                    }
                    <li><a>生成分享图</a></li>
                    <li onClick={() => {copyLink(memoId);}}><a>复制链接</a></li>
                    {
                        currentUserId == userId && <li className="text-error" onClick={async () => {await deleteMemo(memoId, parentRef)}}><a>删除</a></li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default MemosHeader;