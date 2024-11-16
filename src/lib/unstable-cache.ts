import { unstable_cache } from "next/cache";
import { cache } from "react";

export const unstableCache = <Inputs extends unknown[], Output>(
  callback: (...args: Inputs) => Promise<Output>,
  keys?: string[],
  options?: { revalidate: number }
) => cache(unstable_cache(callback, keys, options));
