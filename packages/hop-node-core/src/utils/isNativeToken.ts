import { Chain } from '#constants/index.js'
import { chains as chainMetadata } from '@hop-protocol/sdk/metadata'

export function isNativeToken (chain: Chain, token: string) {
  const nativeTokenSymbol = chainMetadata[chain]?.nativeTokenSymbol
  const isNative = nativeTokenSymbol === token
  return isNative
}
