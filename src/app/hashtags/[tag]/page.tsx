'use client'
import { useParams } from "next/navigation";

export default function TagPage() {
  const { tag } = useParams();
  // TODO 个人页面
  return <div>My id: {tag}</div>
}