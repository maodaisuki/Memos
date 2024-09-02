'use client'
import { useParams } from "next/navigation";

export default function Page() {
  const { userId } = useParams();
  // TODO 个人页面
  return <div>My id: {userId}</div>
}