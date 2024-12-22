"use client";
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useMemo,
	useCallback,
} from "react";
import { gsap } from "gsap";

type SplitTextProps = {
	text: string;
	splitType?: "lines" | "words" | "chars";
	className?: string;
	animation?: {
		duration: number;
		stagger: number;
		y?: number;
		opacity?: number;
	};
	notNow?: boolean;
};

const SplitText = forwardRef<any, SplitTextProps>(
	(
		{
			text,
			splitType = "chars",
			animation: animationProp = {
				duration: 1,
				stagger: 0.1,
				y: 50,
				opacity: 0,
			},
			className,
			notNow = false,
		},
		ref
	) => {
		const textRef = useRef<HTMLDivElement>(null);
		const tl = useRef<GSAPTimeline | null>(null);
		// Memoize animation defaults
		const animation = useMemo(
			() => ({
				duration: animationProp.duration ?? 1,
				stagger: animationProp.stagger ?? 0.1,
				y: animationProp.y ?? 50,
				opacity: animationProp.opacity ?? 0,
			}),
			[animationProp]
		);

		// Memoized split elements to avoid re-splitting on every render
		const getSplitText = () => {
			switch (splitType) {
				case "words":
					return text.split(" ").map((word, i) => (
						<span key={i} className="split-word">
							{word}&nbsp;
						</span>
					));
				case "chars":
					return text.split("").map((char, i) => (
						<span key={i} className="split-char">
							{char}
						</span>
					));
				case "lines":
					return text.split("<br>").map((line, i) => (
						<span key={i} className="split-line">
							{line.trim()}
							<br />
						</span>
					));
				default:
					return text.split("").map((char, i) => (
						<span key={i} className="split-char">
							{char}
						</span>
					));
			}
		};

		// Trigger GSAP animation
		const handleTrigger = useCallback(() => {
			if (!textRef.current) return;

			const targets = textRef.current.querySelectorAll(
				splitType === "words"
					? ".split-word"
					: splitType === "lines"
					? ".split-line"
					: ".split-char"
			);

			if (targets.length > 0) {
				gsap.fromTo(
					targets,
					{ y: animation.y, opacity: animation.opacity },
					{
						y: 0,
						opacity: 1,
						stagger: animation.stagger,
						duration: animation.duration,
						overwrite: true,
					}
				);
			}
		}, [splitType, animation]);

		const handleReverse = useCallback(() => {
			if (!textRef.current) return;

			const targets = textRef.current.querySelectorAll(
				splitType === "words"
					? ".split-word"
					: splitType === "lines"
					? ".split-line"
					: ".split-char"
			);

			gsap.set(targets, {
				y: animation.y,
				opacity: animation.opacity,
			});
		}, [splitType, animation]);

		useImperativeHandle(ref, () => ({
			trigger: handleTrigger,
			reverse: handleReverse,
		}));

		useEffect(() => {
			if (!notNow) {
				handleTrigger();
			} else {
				handleReverse();
			}
		}, [handleTrigger, handleReverse, notNow]);

		return (
			<div ref={textRef} className={`split-text ${className || ""}`}>
				{getSplitText()}
			</div>
		);
	}
);
SplitText.displayName = "SplitText";
export default SplitText;
