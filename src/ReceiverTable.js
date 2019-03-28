import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Image } from 'office-ui-fabric-react/lib/Image';

const columns: IColumn[] = [
  { key: 'column0', name: '',                      fieldName: 'mugshotUrl',  minWidth: 36,  maxWidth: 36,  isResizable: false },
  { key: 'column1', name: 'Name',                  fieldName: 'name',        minWidth: 150, maxWidth: 300, isResizable: true  },
  { key: 'column2', name: 'Shamehats received',    fieldName: 'times',       minWidth: 140, maxWidth: 300, isResizable: true  },
  { key: 'column3', name: 'Last given a shamehat', fieldName: 'lastTimeAgo', minWidth: 150, maxWidth: 300, isResizable: true  }
]

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

function compareMostShamehats(a, b){
  return b.times - a.times; 
}

function compareMostRecent(a, b) {
  return b.lastTime - a.lastTime
}

class ReceiverTable extends Component {
  constructor(props) {
    super(props)
    let data;
    if (props.data === null) {
      data = null
    } else {
      data = props.data.slice()
      data.sort(compareMostShamehats)
    }
    this.state = {
      data: data,
      sortedByShamehat: true
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      var data = this.props.data.slice()
      data.sort(compareMostShamehats)
      this.setState({ 
        data: data,
        sortedByShamehat: true
      })
    }
  }

  onColumnClick(column) {
    var items = this.state.data.slice()
    if (column.key === "column2") {
      items.sort(compareMostShamehats)
      this.setState({ 
        data: items,
        sortedByShamehat: true 
      })
    } else if (column.key === "column3") {
      items.sort(compareMostRecent)
      this.setState({ 
        data: items,
        sortedByShamehat: false 
      })
    }
  }

  onFilterChanged(text) {
    var items = this.props.data.slice()
    if (this.state.sortedByShamehat) {
      items.sort(compareMostShamehats)
    } else {
      items.sort(compareMostRecent)
    }
    this.setState({
      data: text ? items.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : items,
      sortedByShamehat: this.state.sortedByShamehat
    });
  }

  renderItemColumn(item: Object, column: IColumn) {
    const content = item[column.fieldName];

    if (column.fieldName === "mugshotUrl") {
        return <Image src={content} width={36} height={36} />;
    } else {
        return <span>{content}</span>;
    }
  }

  render() {
    if (this.state.data === null) {
      return(<div><p />Loading</div>)
    }

    var items = this.state.data.slice()
    const now = Math.floor((new Date()).getTime() / 1000)
    var count = 0
    for (var i = 0; i < items.length; i++) {
      items[i].lastTimeAgo = formatTime(now - Math.floor(items[i].lastTime / 1000))
      count += items[i].times
    }

    console.log(count)
    return(
      <Fabric>
        <TextField label="Filter by name" onBeforeChange={ (text) => this.onFilterChanged(text) } />
        <DetailsList
          items={items}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          onRenderItemColumn={ (item, index, column) => this.renderItemColumn(item, column) }
          isHeaderVisible={true}
          selectionMode={SelectionMode.none}
          onColumnHeaderClick={(ev, column) => this.onColumnClick(column)}
        />
      </Fabric>
    )
  }
}

export default ReceiverTable