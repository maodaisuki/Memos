import Link from "next/link";

type Props = {
    username: string,
    userId: number
}

const MemosFooter = ({ username, userId }: Props) => {
    return (
        <div className="w-full flex justify-end">
            <div className="w-4/12 truncate text-end">
                <Link href={`/user/${userId}`} title={username} className="text-[12px] hover:underline">@{username}</Link>
            </div>
        </div>
    );
}

export default MemosFooter;