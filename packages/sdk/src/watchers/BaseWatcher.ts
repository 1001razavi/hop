import EventEmitter from 'eventemitter3'
import Base from '../Base'
import HopBridge from '../HopBridge'
import { TChain, TToken, TProvider } from '../types'
import { Chain, Token } from '../models'
import { wait } from '../utils'

/**
 * @desc Event types for transaction watcher.
 */
export enum Event {
  Receipt = 'receipt',
  SourceTxReceipt = 'sourceTxReceipt',
  DestinationTxReceipt = 'destinationTxReceipt'
}

export type WatchOptions = {
  destinationHeadBlockNumber?: number
}

export type Config = {
  network: string
  signer: TProvider
  sourceTxHash: string
  token: TToken
  sourceChain: TChain
  destinationChain: TChain
  options: WatchOptions
}

class BaseWatcher extends Base {
  ee: EventEmitter
  sourceTxHash: string
  sourceTx: any
  sourceBlock: any
  sourceReceipt: any
  token: Token
  sourceChain: Chain
  destinationChain: Chain
  pollDelayMs = 10 * 1000
  bridge: HopBridge
  options: any = {}

  constructor (config: Config) {
    super(config.network, config.signer)
    let {
      network,
      signer,
      token,
      sourceTxHash,
      sourceChain,
      destinationChain,
      options
    } = config
    this.token = this.toTokenModel(token)
    this.sourceTxHash = sourceTxHash
    this.sourceChain = this.toChainModel(sourceChain)
    this.destinationChain = this.toChainModel(destinationChain)
    this.options = options
    this.ee = new EventEmitter()
  }

  public async startBase () {
    this.bridge = new HopBridge(
      this.network,
      this.signer,
      this.token,
      this.sourceChain,
      this.destinationChain
    )

    const receipt = await this.sourceChain.provider.waitForTransaction(
      this.sourceTxHash
    )
    this.ee.emit(Event.Receipt, { chain: this.sourceChain, receipt })
    this.ee.emit(Event.SourceTxReceipt, { chain: this.sourceChain, receipt })
    if (!receipt.status) {
      return
    }
    const sourceTx = await this.sourceChain.provider.getTransaction(
      this.sourceTxHash
    )
    const sourceBlock = await this.sourceChain.provider.getBlock(
      sourceTx.blockNumber
    )
    if (!sourceBlock) {
      return
    }
    this.sourceTx = sourceTx
    this.sourceBlock = sourceBlock
    this.sourceReceipt = receipt
  }

  async pollDestination (pollFn: any) {
    if (!pollFn) {
      return
    }
    let res = false
    while (!res) {
      res = await pollFn()
      await wait(this.pollDelayMs)
    }
  }
}

export default BaseWatcher
