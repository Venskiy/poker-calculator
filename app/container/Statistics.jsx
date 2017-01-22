import React from 'react';
import {connect} from 'react-redux';
import { Table } from 'reactabular';

import Loader from 'components/Loader';

const Statistics = ({playersAmount, playerNames, histograms, isCounting}) => {
  let rows = [];
  for(let i = 0; i < playersAmount; ++i) {
      if(histograms[i]) {
          rows.push({
              id: `histogram-${i + 1}`,
              username: playerNames[i],
              highCard: `${histograms[i][0]}%`,
              pair: `${histograms[i][1]}%`,
              twoPairs: `${histograms[i][2]}%`,
              threeOfAKind: `${histograms[i][3]}%`,
              straight: `${histograms[i][4]}%`,
              flush: `${histograms[i][5]}%`,
              fullHouse: `${histograms[i][6]}%`,
              fourOfAKind: `${histograms[i][7]}%`,
              straightFlush: `${histograms[i][8]}%`,
              royalFlush: `${histograms[i][9]}%`
          });
      }
      else {
          rows.push({
              id: `histogram-${i + 1}`,
              username: playerNames[i],
              highCard: '-',
              pair: '-',
              twoPairs: '-',
              threeOfAKind: '-',
              straight: '-',
              flush: '-',
              fullHouse: '-',
              fourOfAKind: '-',
              straightFlush: '-',
              royalFlush: '-'
          });
      }

  }

  const columns = [
    {
      property: 'username',
      header: {
        label: 'Username'
      }
    },
    {
      property: 'highCard',
      header: {
        label: 'High Card'
      }
    },
    {
      property: 'pair',
      header: {
        label: 'Pair'
      }
    },
    {
      property: 'twoPairs',
      header: {
        label: 'Two Pairs'
      }
    },
    {
      property: 'threeOfAKind',
      header: {
        label: 'Three of a Kind'
      }
    },
    {
      property: 'straight',
      header: {
        label: 'Straight'
      }
    },
    {
      property: 'flush',
      header: {
        label: 'Flush'
      }
    },
    {
      property: 'fullHouse',
      header: {
        label: 'Full House'
      }
    },
    {
      property: 'fourOfAKind',
      header: {
        label: 'Four of a Kind'
      }
    },
    {
      property: 'straightFlush',
      header: {
        label: 'Straight Flush'
      }
    },
    {
      property: 'royalFlush',
      header: {
        label: 'Royal Flush'
      }
    },
  ];

  if(isCounting) {
    return <div className="Statistics">
      <Loader />
    </div>
  }
  else {
    return <div className="Statistics">
      <Table.Provider className="pure-table pure-table-striped" columns={columns}>
        <Table.Header />
        <Table.Body rows={rows} rowKey="id" />
      </Table.Provider>
    </div>
  }
};

const mapStateToProps = (state) => ({
  histograms: state.options.histograms
});

export default connect(mapStateToProps)(Statistics);
