import Link from "next/link";
import Image from "next/image";
import { parseToken } from "@/lib/token";

type Props = {
    userId: number,
    username: string
}

const AccountCard = ({ userId, username }: Props) => {

    return (
        <div className="w-full flex">
            <div className="dropdown dropdown-start items-center">
                <div tabIndex={0} role="button" className="text-sm text-left rounded-[4px] h-full truncate align-baseline max-w-[150px]">
                    &gt; Hi, {username}
                </div> 
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-[4px] z-[999] w-52 p-2 shadow">
                    <li><Link href={`/mine/account`}>个人中心</Link></li>
                    <li className="text-error"><a>登出</a></li>
                </ul>
            </div>
        </div>
    );
}

export default AccountCard;