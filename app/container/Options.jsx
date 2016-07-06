import React from 'react';

import PlayersAmount from 'components/PlayersAmount';

export default () => {
  return <div className="Options">
    <div className="PlayersAmount">
      <div>Select the amount of players: </div>
      <div><PlayersAmount /></div>
    </div>
  </div>;
}
