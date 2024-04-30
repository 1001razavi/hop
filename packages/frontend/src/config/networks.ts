import Network from 'src/models/Network'
import filter from 'lodash/filter'
import find from 'lodash/find'
import { ChainSlug } from '@hop-protocol/sdk'
import { metadata } from 'src/config/metadata'
import { networks } from 'src/config/addresses'

export const allNetworks = Object.keys(networks).map(key => {
  const net = networks[key]
  const meta = metadata.networks[key]

  if (key === ChainSlug.Ethereum) {
    // meta = metadata.networks[reactAppNetwork]
  }

  if (!(net && meta && net?.rpcUrl)) {
    return null
  }

  return new Network({
    name: meta.name,
    slug: key,
    imageUrl: meta.image,
    rpcUrl: net.rpcUrl,
    fallbackRpcUrls: net.fallbackRpcUrls ?? [],
    networkId: net.chainId,
    nativeTokenSymbol: meta.nativeTokenSymbol,
    isLayer1: meta.isLayer1,
    explorerUrl: net.explorerUrl
  })
})
.filter(Boolean)

export const l1Network = find(allNetworks, ['isLayer1', true])!
export const l2Networks = filter(allNetworks, ['isLayer1', false])
export const defaultL2Network = l2Networks[0]
