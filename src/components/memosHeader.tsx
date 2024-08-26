import PropTypes from "prop-types";
import { MouseEventHandler } from "react";

type Props = {
    createdTime: string,
    memoId: number,
    onEdit: MouseEventHandler<HTMLLIElement>,
}

const copyLink = () => {
    // TODO 复制链接
}

const MemosHeader = ({ createdTime, memoId, onEdit }: Props) => {
    return (
        <div className="W-full flex flex-row mb-[12px] text-[12px] justify-between items-center">
            <div className="text-baseline">
                { createdTime }
            </div>
            <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="text-baseline align-middle">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </div>
                <ul tabIndex={0} id="memoDropdownMenu" className="dropdown-content menu bg-base-100 rounded-[4px] z-[999] w-40 p-2 shadow">
                    <li onClick={onEdit}><a>编辑</a></li>
                    <li><a>生成分享图</a></li>
                    <li onClick={copyLink}><a>复制链接</a></li>
                    <li className="text-error"><a>删除</a></li>
                </ul>
            </div>
        </div>
    );
}

export default MemosHeader;