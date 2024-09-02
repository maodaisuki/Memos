'use client'
import { useSearchParams } from "next/navigation"

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams?.get('query') || '';
    // TODO 搜索页面
    // TODO 高亮搜索
    return <></>
}

export default SearchPage;