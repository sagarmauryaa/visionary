"use client";
import AnimatedSection from "@/app/components/AnimatedSection";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const [expandedSection, setExpandedSection] =
		useState<HTMLDivElement | null>(null);

	const handleExpand = (element: HTMLDivElement | null) => {
		setExpandedSection((prev) => (prev === element ? null : element));
	};

	return (
		<main
			className={`relative overflow-hidden ${
				expandedSection ? " -dark" : ""
			}`}
		>
			<section className="relative grid grid-cols-4 h-dvh">
				<header className="absolute top-0 left-0 w-full p-8 z-10 grid grid-cols-4 gap-4">
					<Link href={"/"}>Visionary</Link>
					<p className="header-copy">
						Where Form
						<br /> and Function Unite
					</p>
					<div className="col-span-2 ps-8 grid gap-8">
						<h1 className="text-5xl uppercase font-light header-content">
							ELEVATING COMFORT
							<br /> WITH EVERY CURVE
						</h1>
						<button className="w-fit border border-slate-950 rounded-full uppercase text-sm px-6 py-1.5 duration-200 hover:bg-slate-950 hover:text-white">
							EXPLORE EXPERIENCE
						</button>
					</div>
				</header>
				<AnimatedSection
					heading={"Our<br> Approach"}
					description={
						"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
					}
					imgSrc="https://images.unsplash.com/photo-1554104707-a76b270e4bbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					onExpand={handleExpand}
					isExpanded={expandedSection}
				/>
				<AnimatedSection
					heading={"Our<br> Technology"}
					description={
						"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
					}
					imgSrc="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					onExpand={handleExpand}
					isExpanded={expandedSection}
				/>
				<AnimatedSection
					heading={"Our<br> Story"}
					description={
						"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
					}
					imgSrc="https://images.unsplash.com/photo-1428765048792-aa4bdde46fea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					onExpand={handleExpand}
					isExpanded={expandedSection}
				/>
				<AnimatedSection
					heading={"Our<br> Design Team"}
					description={
						"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
					}
					imgSrc="https://images.unsplash.com/photo-1503914068268-5413b35b45ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					onExpand={handleExpand}
					isExpanded={expandedSection}
				/>
			</section>
		</main>
	);
}
