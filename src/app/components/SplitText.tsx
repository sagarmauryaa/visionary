"use client";
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
	useMemo,
	useCallback,
} from "react";
import { gsap } from "gsap";

type SplitTextProps = {
	text: string;
	splitType?: "words" | "chars" | "lines";
	animation?: {
		duration?: number;
		stagger?: number;
		y?: number;
		opacity?: number;
	};
	className?: string;
	retrigger?: boolean;
	notNow?: boolean;
};

const SplitText = forwardRef<any, SplitTextProps>(
	(
		{
			text,
			splitType = "chars",
			animation = { duration: 1, stagger: 0.1, y: 50, opacity: 0 },
			className,
			retrigger = false,
			notNow = false,
		},
		ref
	) => {
		const textRef = useRef<HTMLDivElement>(null);

		// Memoized split elements to avoid re-splitting on every render
		const splitElements = useMemo(() => {
			let elements: React.ReactNode[] = [];

			switch (splitType) {
				case "words":
					elements = text.split(" ").map((word, i) => (
						<React.Fragment key={i}>
							{word.split(" ").map((w, j) => (
								<span key={j} className="split-word">
									{w}&nbsp;
								</span>
							))}
							<br />
						</React.Fragment>
					));
					break;
				case "chars":
					elements = text.split("").map((char, i) => (
						<span key={i} className="split-char">
							{char}
						</span>
					));
					break;
				case "lines":
					elements = text.split("<br>").map((line, i) => (
						<span key={i} className="split-line">
							{line.trim()}
							<br />
						</span>
					));
					break;
				default:
					elements = text.split("").map((char, i) => (
						<span key={i} className="split-char">
							{char}
						</span>
					));
			}

			return elements;
		}, [text, splitType]);

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

		// GSAP reverse animation
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

		// Expose imperative handle
		useImperativeHandle(ref, () => ({
			handleTrigger,
			handleReverse,
		}));

		// Handle animations on mount
		useEffect(() => {
			if (!notNow) {
				handleTrigger();
			} else {
				handleReverse();
			}
		}, [splitElements, animation, notNow, handleTrigger, handleReverse]);

		return (
			<div ref={textRef} className={`split-text ${className || ""}`}>
				{splitElements}
			</div>
		);
	}
);

export default SplitText;
