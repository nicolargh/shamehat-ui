import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

const times = [
	{ type: "year", value: 60 * 60 * 24 * 365 },
	{ type: "month", value: 60 * 60 * 24 * 30 }, //approx
	{ type: "week", value: 60 * 60 * 24 * 7 },
	{ type: "day", value: 60 * 60 * 24 },
	{ type: "hour", value: 60 * 60 },
	{ type: "minute", value: 60 },
	{ type: "second", value: 1}
]

function formatTime(secs){
	var timeAgo = "0 seconds ago"
  for (var i = 0; i < times.length; i++) {
  	if (secs > times[i].value) {
  		const amount = Math.floor(secs/times[i].value)
			timeAgo = amount + " " + times[i].type
  		if (amount !== 1) {
  			timeAgo += "s"
  		}
  		timeAgo += " ago"
  		break
  	}
  }
  return timeAgo 
}

function compare(a, b){
  return b.times - a.times; // most shamehats first
}

function ReceiverTable(props) {
  const columns: IColumn[] = [
      { key: 'column1', name: 'Name',                  fieldName: 'name',        minWidth: 150, maxWidth: 300, isResizable: true },
      { key: 'column2', name: 'Shamehats received',    fieldName: 'times',       minWidth: 150, maxWidth: 300, isResizable: true },
      { key: 'column3', name: 'Last given a shamehat', fieldName: 'lastTimeAgo', minWidth: 150, maxWidth: 300, isResizable: true }
    ]

  var items = props.data.slice()
  items.sort(compare)
  const now = Math.floor((new Date()).getTime() / 1000)
  for (var i = 0; i < items.length; i++) {
    items[i].lastTimeAgo = formatTime(now - items[i].lastTime)
  }

  return(
    <Fabric>
      <DetailsList
        items={items}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={true}
        selectionMode={SelectionMode.none}
      />
    </Fabric>
  )
}

export default ReceiverTable