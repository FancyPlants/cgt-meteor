import * as React from 'react'

import { MongoID } from '../../../../../../utilities'
import BoxPaper from '../../../../../../components/BoxPaper/BoxPaper'
import {
  Typography,
  Button,
} from '@material-ui/core'

interface OtherPlayerProps {
  tokens: number,
  userId: MongoID,
  username: string,
}

class OtherPlayer extends React.Component<OtherPlayerProps, {}> {
  render() {
    const {
      props: {
        tokens,
        userId,
        username,
      },
    } = this

    return (
      <BoxPaper>
        <Typography variant="title">
          {username}
        </Typography>
        <Typography variant="subheading">
          Tokens: {tokens}
        </Typography>
        <Button
          variant="contained">
          Assassin (-1 Card, Can be Blocked)
        </Button>
        <Button
          variant="contained">
          Captain (-2 Tokens, +2 to you)
        </Button>
        <Button
          variant="contained">
          Coup (-1 Card, Definite)
        </Button>
      </BoxPaper>
    )
  }
}

export default OtherPlayer
