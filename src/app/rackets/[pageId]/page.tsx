"use client"
import { useParams } from "next/navigation";

export default function Home() {
  const {pageId} = useParams();
  
  return (
    <div>Страница {pageId}</div>
  );
}