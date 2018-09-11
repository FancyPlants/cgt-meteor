import * as React from 'react'

import { MongoID } from '../../../../../../utilities'
import BoxPaper from '../../../../../../components/BoxPaper/BoxPaper'

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
      <div></div>
    )
  }
}

export default OtherPlayer
