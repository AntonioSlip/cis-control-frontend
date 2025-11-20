"use client";
import dynamic from "next/dynamic";
const Comp = dynamic(() => import("../../components/Questionnaire").then(m=>m.Questionnaire || m.default), { ssr: false });
export default function Page(){ return <Comp />; }