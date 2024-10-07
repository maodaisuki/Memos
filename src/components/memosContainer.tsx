'use client'

import { Memo } from "@/interfaces/memo"
import MemosCard from "./memos"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { getMemoList, postMemo } from "@/api/memo"
import AccountCard from "./account"
import toast, { Toaster } from "react-hot-toast"
import { queryParser } from "@/lib/queryParser"

type Props = {
	initialList: Array<Memo>,
	userId: number,
	username: string,
	query: string
}

const MemosContainer = ({ initialList, userId, username, query }: Props) => {
	const [memoList, setMemoList] = useState<Array<Memo>>(initialList);
	const [page, setPage] = useState(2);
	const [hasMore, setHasMore] = useState(true);
	const { ref, inView } = useInView();
	const [memo, setMemo] = useState("");
	const [isMemoabled, setIsMemoabled] = useState(false);
	const tagRegex = /#([^#]+)#/g;
	const [queryMap, setQueryMap] = useState<any>();
	function textAreaHandle(event: any) {
		setMemo(event.target.value);
		if (event.target.value !== "") {
			setIsMemoabled(true);
		}
		else {
			setIsMemoabled(false);
		}
	}
	async function sendMemo() {
		const matchTags = memo.match(tagRegex);
		if (matchTags !== null) {
			matchTags.forEach((tag, index) => {
				matchTags[index] = tag.slice(1, -1);
			});
		}
		const memoBody = {
			content: memo,
			tags: matchTags,
			userId: userId,
		};
		const { data } = await postMemo(memoBody as Memo);
		if (data !== null) {
			setMemo("");
			setIsMemoabled(false);
			memoList.unshift(data.memo);
			toast.success("保存 Memo 成功");
		}
		else {
			toast.error("网络错误，请连接网络后再试");
		}
	}

	async function loadMore() {
		await setTimeout(async () => {
			if (!hasMore) return;
			const moreList = await getMemoList(page, undefined, query);
			if (moreList.data == null) {
				setHasMore(false);
			}
			else {
				if (moreList.data.memoList.length == 0) {
					setMemoList([...memoList, ...moreList.data.memoList]);
					setHasMore(false);
				}
				else {
					setMemoList([...memoList, ...moreList.data.memoList]);
				}
			}
			setPage(page + 1);
		}, 700);
	};

	useEffect(() => {
		if (inView) {
			loadMore();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView]);

	useEffect(() => {
		setMemoList(initialList);
		const queryMapTemp = queryParser(query);
		setQueryMap(queryMapTemp);
	}, [initialList, query])

	return (
		<>
			<div className="w-full mt-[10px] flex flex-col">
				<Toaster />
				<div className="w-full px-[10px]">
					<textarea
						value={memo}
						onChange={textAreaHandle}
						className="w-full bg-base-200 rounded-[4px] p-[15px] min-h-[100px] leading-relaxed focus:outline-none focus:ring focus:ring-success focus:ring-[1px] ring-[1px] ring-base-300 text-[14px]"
						placeholder="现在的想法是..."
					/>
				</div>
				<div className="w-full flex flex-row justify-between items-center mt-[5px] space-x-2 px-[10px]">
					<div className="grow flex flex-row">
						<AccountCard userId={userId} username={username}/>
					</div>
					<div className="flex-none">
						<button disabled={!isMemoabled} onClick={async () => { await sendMemo() }} className="btn btn-sm no-animation text-white disabled:bg-stone-400 bg-success hover:bg-[#2ac090] hover:cursor-pointer rounded-[4px] text-sm">
							Memos!
						</button>
					</div>
				</div>
				<div className="w-full flex flex-row items-center mt-[5px] px-[10px] text-sm">
					{
						queryMap && <div className="flex flex-row flex-wrap w-full">
							{
								queryMap.content.length > 0 && <div className="bg-base-200 rounded-[3px] text-[12px] p-[4px] mt-[5px] mr-[10px] text-info truncate">
									<span>Content: {queryMap.content}</span>
								</div>
							}
							{
								queryMap.username.length > 0 && <div className="bg-base-200 rounded-[3px] text-[12px] p-[4px] mt-[5px] mr-[10px] text-info truncate">
									<span>Username: {queryMap.username}</span>
								</div>
							}
							{
								queryMap.userId.length > 0 && <div className="bg-base-200 rounded-[3px] text-[12px] p-[4px] mt-[5px] mr-[10px] text-info truncate">
									<span>UserId: {queryMap.userId}</span>
								</div>
							}
							{
								queryMap.tag.length > 0 && <div className="bg-base-200 rounded-[3px] text-[12px] p-[4px] mt-[5px] mr-[10px] text-info truncate">
									<span>Tag: {queryMap.tag}</span>
								</div>
							}
							{
								queryMap.memoId.length > 0 && <div className="bg-base-200 rounded-[3px] text-[12px] p-[4px] mt-[5px] mr-[10px] text-info truncate">
									<span>MemoId: {queryMap.memoId}</span>
								</div>
							}
						</div>
					}
				</div>
			</div>
			<div id="memoContainer" className="w-full flex flex-col mt-[10px] mb-[50px] space-y-3 px-[10px]">
				{
					memoList.map((memo, index) => (
						<MemosCard key={index} memo={memo} currentUserId={userId} />
					))
				}
				{
					hasMore ? (
						<div ref={ref} className="w-full text-center text-sm">
							Loading...
						</div>
					) : (
						<div className="w-full text-center text-sm">
							- 已加载完所有笔记 -
						</div>
					)
				}
			</div>
		</>
	);
}

export default MemosContainer;