import { DateTime } from 'luxon'

export const chainIdToSlug: any = {
  1: 'ethereum',
  100: 'xdai',
  137: 'polygon'
}

export function normalizeEntity (x: any) {
  if (!x) {
    return x
  }

  if (x.index !== undefined) {
    x.index = Number(x.index)
  }
  if (x.originChainId) {
    x.originChainId = Number(x.originChainId)
  }
  if (x.destinationChainId) {
    x.destinationChainId = Number(x.destinationChainId)
  }

  x.blockNumber = Number(x.blockNumber)
  x.timestamp = Number(x.timestamp)
  x.timestampRelative = DateTime.fromSeconds(x.timestamp).toRelative()

  return x
}
