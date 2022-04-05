import { useEffect } from "react";

const defaultOptions = {
	rootMargin: "0px",
	threshold: 0.5,
};

type Arguments = {
	rootRef: React.RefObject<Element>;
	targetRef: React.RefObject<Element>;
	observerCallback: IntersectionObserverCallback;
	observerOptions?: Omit<IntersectionObserverInit, "root">;
};

export const useIntersectionObserver = ({
	rootRef,
	targetRef,
	observerCallback,
	observerOptions = defaultOptions,
}: Arguments) => {
	useEffect(() => {
		const options = {
			root: rootRef.current,
			...observerOptions,
		};

		const observer = new IntersectionObserver(observerCallback, options);

		if (targetRef.current !== null) {
			observer.observe(targetRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [targetRef.current, rootRef.current, observerCallback, observerOptions]);

	return void 0;
};
