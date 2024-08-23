import Link from "next/link";
import SearchBar from "@/components/search";
const HeaderMenu = () => {

    return (
        <div className="w-full flex flex-col">
            <div className="mt-[10px] w-full flex flex-row items-center justify-between px-[10px]">
                <div className="font-bold flex w-full flex-row justify-between items-center">
                    <div className="hover:cursor-pointer text-[20px] underline">
                        MAOJI
                    </div>
                    <SearchBar />
                </div>
            </div>
        </div>
    )
}

export default HeaderMenu;