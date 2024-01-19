import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Check from '@material-ui/icons/Check'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { isLayer1, networkSlugToName } from 'src/utils'

function TransactionStatus(props: any) {
  const {
    link,
    destNetworkName,
    networkName,
    destTx,
    styles,
    srcConfirmed,
    txConfirmed,
    showConfirmations = true,
    confirmations,
    networkWaitConfirmations,
  } = props
  const [text, setText] = useState('')

  useEffect(() => {
    if (txConfirmed) {
      return setText('Complete')
    }

    if (!networkWaitConfirmations) {
      return setText('Pending')
    }

    if (showConfirmations) {
      if (!confirmations || isLayer1(networkName)) {
        return setText(`• / ${networkWaitConfirmations} Confirmations`)
      }

      if (confirmations && networkWaitConfirmations) {
        setText(`${confirmations} / ${networkWaitConfirmations} Confirmations`)
      }
    } else if (confirmations) {
      return setText('Complete')
    }
  }, [txConfirmed, confirmations, networkWaitConfirmations])

  return (
    <>
      <Box display="flex" justifyContent="center" height={60} width="5em" textAlign="center">
        {destTx && (!destNetworkName || destNetworkName === networkName) ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" fontSize="20px" width="5em"></Box>
        ) : (
          <Box display="flex" flexDirection="column" height="100%" justifyContent="space-around" alignItems="center" fontSize="20px" width="5em">
            <Box mb={1} fontSize={0}>
              <Typography align="center" className={styles.topLabel}>{destTx ? networkSlugToName(destNetworkName) : networkSlugToName(networkName)}</Typography>
            </Box>

            {txConfirmed || (!showConfirmations && confirmations) ? (
              <Check className={styles.completed} />
            ) : destTx && !srcConfirmed ? (
              <Box width={20} height={20} borderRadius="50%" />
            ) : (
              <CircularProgress size={20} thickness={5} />
            )}

            <Box mt={1} fontSize={0} textAlign="center">
              {link ? (
                <Link color="inherit" href={link} target="_blank" rel="noopener noreferrer">
                  <Typography>{text}</Typography>
                </Link>
              ) : (
                <Typography>{text}</Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  )
}

export default TransactionStatus
