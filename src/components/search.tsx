'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    function inSearch(event: any) {
        setSearchQuery(event.target.value);  
    }

    function onKeyUp(event: any) {
        var e = event || window.event;
        if(e && e.keyCode == 13) {
            var query = event.target.value;
            router.push(`/search?query=${query}`);
        }
    }

    return (
        <div className="w-full box-border ml-[15px] my-[5px] font-normal">
            <input
                id="searchBar"
                onChange={inSearch}
                onKeyUp={onKeyUp}
                value={searchQuery}
                type="search"
                className="w-full focus:outline-none focus:ring focus:ring-success focus:ring-[1px] bg-base-200 rounded-[4px] focus:outline-none px-[10px] h-[40px] text-[14px]"
                placeholder="Type here..."
            />
        </div>
    )
}

export default SearchBar;