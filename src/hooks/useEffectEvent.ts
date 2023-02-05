import { useCallback, useInsertionEffect, useRef } from "react";

/**
 * Lets you define event handlers that can read the latest props/state but have always stable function identity.
 * Event handlers defined with useEvent don't break memoization and don't retrigger effects.
 * https://github.com/reactjs/rfcs/pull/220
 * https://blog.bitsrc.io/a-look-inside-the-useevent-polyfill-from-the-new-react-docs-d1c4739e8072
 */
export function useEffectEvent<TFn extends (...args: any[]) => unknown>(
	fn: TFn,
): TFn {
	const ref = useRef<TFn>();
	useInsertionEffect(() => {
		ref.current = fn;
	}, [fn]);

	return useCallback((...args: any[]) => {
		const f = ref.current;
		if (!f) return;
		return f(...args);
	}, []) as any;
}
