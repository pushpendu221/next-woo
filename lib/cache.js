import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react"; // import cache from "react"


export function Cache(cb,keyParts,options) {
return nextCache(reactCache(cb),keyParts,options)
}