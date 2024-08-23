import Link from "next/link";
import Image from "next/image";
import AccountCard from "./account";

const MemosEditor = () => {
    return (
        <div className="w-full mt-[10px] flex flex-col">
            <div className="w-full px-[10px]">
                <textarea 
                    className="w-full bg-base-200 rounded-[4px] p-[15px] min-h-[100px] leading-relaxed focus:outline-none focus:ring focus:ring-success focus:ring-[1px] ring-[1px] ring-base-300 text-[14px]"
                    placeholder="现在的想法是..."
                />
            </div>
            <div className="w-full flex flex-row justify-between items-center mt-[5px] space-x-2 px-[10px]">
                <div className="grow">
                    <AccountCard />
                </div>
                <div className="flex-none">
                    <button className="btn btn-sm no-animation rounded-[4px] text-sm">
                        Memos!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemosEditor;