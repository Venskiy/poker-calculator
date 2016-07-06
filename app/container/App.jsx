import React from 'react';

import CardsBlock from './CardsBlock';
import PokerTable from './PokerTable';

const App = React.createClass({
  render() {
    return (
      <div className="Container">
        <div className="CardsAndTable">
          <CardsBlock />
          <PokerTable />
        </div>
      </div>
    );
  }
});

export default App;
