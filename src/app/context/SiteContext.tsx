import { createContext } from "react";

interface SiteContextType {
	expanedEle: HTMLDivElement | null;
	setExpanedEle: (expanedEle: HTMLDivElement | null) => void;
}
export const SiteContext = createContext<SiteContextType>({
	expanedEle: null,
	setExpanedEle: () => {},
});
