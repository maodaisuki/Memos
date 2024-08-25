'use client'

import { Memo } from "@/interfaces/memo"
import MemosCard from "./memos"
import { useInView } from "react-intersection-observer"
import { useEffect, useState } from "react"
import { getMemoList } from "@/api/memo"

type Props = {
    initialList: Array<Memo>
}

const MemosContainer = ({ initialList }: Props) => {
    const [memoList, setMemoList] = useState<Array<Memo>>(initialList);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView();
    
    async function loadMore() {
      // 加入延时，防止加载过快
      await setTimeout(async () => {
        if (!hasMore) return;
        const moreList = await getMemoList(page);
        setMemoList([...memoList, ...moreList.data.memoList]);
        setPage(page + 1);
        setHasMore(moreList.data.hasMore);
      }, 700);
    };
    
    useEffect(() => {
      if (inView) {
        loadMore();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);
  
    return (
      <div id="memoContainer" className="w-full flex flex-col mt-[10px] mb-[50px] space-y-3 px-[10px]">
        {
          memoList.map((memo) => (
            <MemosCard key={memo.memoId} memo={memo} />
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
    );
  }

export default MemosContainer;