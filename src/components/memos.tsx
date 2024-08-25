'use client'
import MemosHeader from "./memosHeader";
import MemosBody from "./memosBody";
import MemosFooter from "./memosFooter";
import { Memo } from "@/interfaces/memo";
import useSWR from "swr";
import { getUserById } from "@/api/user";

type Props = {
    memo: Memo
}

function convertDate(utc: string) {
    const date = new Date(utc);
    return date.toLocaleString();
}

const MemosCard = ({ memo }: Props) => {
    const { data, error } = useSWR(`/api/user/${memo.userId}`, async () => {return await getUserById(memo.userId)});
    if(!data || error) {
        return (
            <></>
        );
    }
    return (
        <div className="w-full flex flex-col bg-base-200 rounded-[4px] p-[15px]">
            <MemosHeader createdTime={convertDate(memo.createdDate!.toString())} memoId={memo.memoId!} />
            <MemosBody content={memo.content} />
            <MemosFooter username={data?.data.account.username} userId={memo.userId}/>
        </div>
    );
}

export default MemosCard;