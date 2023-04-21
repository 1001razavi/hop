import { KmsSigner } from 'src/aws/KmsSigner'
import { Chain } from 'src/constants'
import { getRpcProvider } from 'src/utils/getRpcProvider'

describe.skip('KmsSigner', () => {
  const keyId = process.env.TEST_KMS_KEY_ID!
  const region = process.env.TEST_KMS_KEY_REGION!
  const ethereumAddressOfKmsKey = process.env.ETHEREUM_ADDRESS_OF_KMS_KEY!
  const signer = new KmsSigner({ keyId, region })
  it('getAddress', async () => {
    const address = await signer.getAddress()
    console.log('address:', address)
    expect(address).toBe(ethereumAddressOfKmsKey)
  })
  it('signMessage', async () => {
    const msg = 'Hello World'
    const signature = await signer.signMessage(msg)
    console.log('signature:', signature)
    expect(signature.startsWith('0x')).toBeTruthy()
  })
  it('recoverAddressFromSig', async () => {
    const msg = 'Hello World'
    const signature = await signer.signMessage(msg)

    const address = await signer.getAddress()
    const recovered = signer.recoverAddressFromSig(msg, signature)
    expect(address).toBe(recovered)
  })
  it('signTransaction', async () => {
    const address = await signer.getAddress()
    const transaction = { to: address }
    const txSignature = await signer.signTransaction(transaction)
    console.log('txSignature:', txSignature)
    expect(txSignature.startsWith('0x')).toBeTruthy()
  })
  it.skip('sendTransaction', async () => {
    const address = await signer.getAddress()
    const transaction = { to: address }
    const provider = getRpcProvider(Chain.Ethereum)
    const tx = await signer.connect(provider!).sendTransaction(transaction)
    console.log('tx:', tx)
    expect(tx.hash.startsWith('0x')).toBeTruthy()
  })
})
