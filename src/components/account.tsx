import Link from "next/link";
import Image from "next/image";
import { logout } from "@/api/login";

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
                <ul tabIndex={0} id="accountMenu" className="dropdown-content menu bg-base-100 rounded-[4px] z-[999] w-52 p-2 shadow">
                    <li><Link href={`/user/${userId}`} onClick={() => {document.getElementById("accountMenu")?.blur()}}>个人中心</Link></li>
                    <li className="text-error" onClick={async () => {await logout();}}><a>登出</a></li>
                </ul>
            </div>
        </div>
    );
}

export default AccountCard;