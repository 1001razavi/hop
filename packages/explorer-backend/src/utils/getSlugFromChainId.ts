import { networks } from '../config'

const getSlugFromChainIdMap:any = {}

for (const chain in networks) {
  getSlugFromChainIdMap[Number((networks as any)[chain].chainId)] = chain
}

export function getSlugFromChainId (chainId: number) {
  const slug = getSlugFromChainIdMap[chainId]
  if (!slug) {
    throw new Error(`Unknown chain id ${chainId}`)
  }
  return slug
}
