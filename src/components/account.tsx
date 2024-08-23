import Link from "next/link";
import Image from "next/image";

const AccountCard = () => {
    return (
        <div className="w-full flex">
            <div className="dropdown dropdown-start items-center">
                {/* TODO 用户名和 Memos 按钮间隔，设置用户名溢出省略， */}
                <div tabIndex={0} role="button" className="text-sm text-left rounded-[4px] h-full truncate align-baseline max-w-[150px]">
                    &gt; Hi, ABCDEFGHIJABCDEFGHIJABCDEFGHIJ
                </div> 
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-[4px] z-[999] w-52 p-2 shadow">
                    <li><a>个人中心</a></li>
                    <li className="text-error"><a>登出</a></li>
                </ul>
            </div>
        </div>
    );
}

export default AccountCard;