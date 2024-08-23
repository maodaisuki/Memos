import MemosEditor from "@/components/editor";
import HeaderMenu from "@/components/header";
import MemosCard from "@/components/memos";
import MemosContainer from "@/components/memosContainer";


export default function Mine() {
  return (
    <main className="m-0 min-h-screen min-w-screen flex flex-col items-center">
      <div className="md:w-full max-w-xl flex flex-col items-center w-full">
        <HeaderMenu />
        <MemosEditor />
        <MemosContainer>
          <MemosCard />
        </MemosContainer>
      </div>
    </main>
  );
}
