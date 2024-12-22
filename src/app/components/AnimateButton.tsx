import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const AnimateButton = () => {
	const element = useRef<HTMLButtonElement | null>(null);

	const handleTrigger = () => {
		if (!element.current) return;
		const targets = element.current;
		const text = targets.querySelector("span");

		gsap.fromTo(
			targets,
			{ width: "32px" },
			{
				width: "190px",
				opacity: 1,
				duration: 0.5,
				onComplete: () => {
					if (!text) return;
					gsap.to(text, {
						y: "0px",
						opacity: 1,
						duration: 0.5,
					});
				},
			}
		);
	};
	useEffect(handleTrigger, []);
	return (
		<button
			ref={element}
			className="w-8 h-8 border border-slate-950 flex items-center justify-center rounded-full overflow-hidden uppercase text-sm   duration-200 hover:bg-slate-950 hover:text-white"
		>
			<span className="-translate-y-10">EXPLORE EXPERIENCE</span>
		</button>
	);
};

export default AnimateButton;
