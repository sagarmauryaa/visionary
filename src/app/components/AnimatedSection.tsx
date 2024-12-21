"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitText from "../components/SplitText";

const AnimatedSection = ({
	heading = "",
	description = "",
	imgSrc = "",
	isExpanded = null,
	onExpand = () => {},
}: {
	heading: string;
	description: string;
	imgSrc: string;
	isExpanded: HTMLImageElement | null;
	onExpand: (isExpanded: HTMLImageElement | null) => void;
}) => {
	const overlay = useRef<HTMLImageElement | null>(null);
	const container = useRef<HTMLDivElement | null>(null);
	const wrapper = useRef<HTMLDivElement | null>(null);
	const desc = useRef<any>(null);

	useEffect(() => {
		const element = container.current;

		if (element) {
			gsap.to(element, {
				opacity: 1,
				y: "0px",
				duration: 1,
				ease: "power2.out",
			});
		}
	}, []);

	useEffect(() => {
		const element = wrapper.current;

		if (element) {
			if (isExpanded) {
				gsap.to(element, {
					opacity: isExpanded !== element ? 0 : 1,
					y: isExpanded !== element ? "20px" : "0px",
					pointerEvents: isExpanded !== element ? "none" : "",
					duration: 0.6,
					ease: "power2.out",
				});
			} else {
				gsap.to(element, {
					opacity: 1,
					y: "0px",
					pointerEvents: "auto",
					duration: 0.6,
					ease: "power2.out",
				});
			}
		}
	}, [isExpanded]);

	const handleMouseEnter = () => {
		if (overlay.current) {
			gsap.to(overlay.current, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				y: "0",
				opacity: 1,
				duration: 0.8,
				ease: "power4.out",
			});
		}
	};

	const handleMouseLeave = () => {
		if (overlay.current && !isExpanded) {
			gsap.to(overlay.current, {
				clipPath: "polygon(0 0, 100% 0, 100% 4%, 0 4%)",
				duration: 0.6,
				y: "-20px",
				ease: "power3.in",
				onComplete: () => {
					gsap.set(overlay.current, {
						clipPath:
							"polygon(0 99.9%, 100% 99.9%, 100% 100%, 0 100%)",
						transform: "translateY(200px)",
					});
				},
			});
		}
	};

	const handleOpen = () => {
		const element = container.current;
		if (element) {
			const { innerWidth, innerHeight } = window;
			const { left } = wrapper.current?.getBoundingClientRect() || {
				left: 0,
			};

			gsap.to(element, {
				width: `${innerWidth + 1}px`,
				height: `${innerHeight}px`,
				left: `${-left - 2}px`,
				duration: 0.8,
				ease: "power4.out",
				position: "absolute",
			});

			const animteText = wrapper.current?.querySelector(".animte-text");
			if (animteText) {
				animteText.classList.add("!text-5xl");
			}
			desc.current?.handleTrigger();

			const wrapperEle = wrapper.current;
			if (wrapperEle) {
				wrapperEle.classList.add("active-section");
				onExpand(wrapperEle);
			}
		}
	};

	const handleClose = () => {
		const element = container.current;
		if (element) {
			wrapper.current?.classList.remove("active-section");

			gsap.to(element, {
				width: "100%",
				height: "100%",
				left: "0",
				position: "relative", // Reset to original positioning
				duration: 0.8,
				ease: "power4.out",
			});
			const animteText = wrapper.current?.querySelector(".animte-text");
			if (animteText) {
				animteText.classList.remove("!text-5xl");
			}
			desc.current?.handleReverse();

			onExpand(null);
		}
	};

	const handleClick = () => {
		const element = container.current;
		if (element) {
			if (isExpanded !== wrapper.current) {
				handleOpen();
			} else {
				handleClose();
			}
		}
	};

	return (
		<div
			ref={wrapper}
			className="relative cursor-pointer h-full animate-section"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}
		>
			<div
				ref={container}
				className="relative p-10 overflow-hidden flex items-end h-full opacity-0 translate-y-5"
			>
				<img
					ref={overlay}
					src={imgSrc}
					alt="Background"
					style={{
						clipPath: "polygon(0 99%, 100% 99%, 100% 100%, 0 100%)",
						transform: "translateY(200px)",
					}}
					className="absolute top-0 bottom-0 right-0 left-0 w-full h-full object-cover"
				/>
				<div className="w-full grid grid-cols-2 ">
					<SplitText
						text={heading}
						splitType="words"
						className="relative z-10 uppercase text-3xl leading-tight animte-text max-w-[300px]  mt-auto"
						animation={{
							duration: 1,
							stagger: 0.05,
							y: 50,
							opacity: 0,
						}}
					/>
					<SplitText
						ref={desc}
						text={description}
						splitType="lines"
						className="relative mt-auto pb-4 ps-8 z-10 text-base font-light leading-tight animte-description max-w-[300px]"
						animation={{
							duration: 1,
							stagger: 0.05,
							y: 50,
							opacity: 0,
						}}
						notNow={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnimatedSection;
