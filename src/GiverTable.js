import React, { Component } from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { TextField } from 'office-ui-fabric-react/lib/TextField';


const columns: IColumn[] = [
  { key: 'column1', name: 'Name',            fieldName: 'name',  minWidth: 150, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Shamehats given', fieldName: 'times', minWidth: 150, maxWidth: 200, isResizable: true }
]

function compare(a, b){
  return b.times - a.times; // most shamehats first
}

class GiverTable extends Component {
  constructor(props) {
    super(props)

    var items = props.data.slice()
    items.sort(compare)

    this.state = {
      data: items
    }
  }

  onFilterChanged(text) {
    var items = this.props.data.slice()
    items.sort(compare)

    this.setState({
      data: text ? items.filter(item => item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) : items,
    });
  }

  render() {
    return(
      <Fabric>
        <TextField label="Filter by name" onBeforeChange={ (text) => this.onFilterChanged(text) } />
        <DetailsList
          items={this.state.data}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
          selectionMode={SelectionMode.none}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        />
      </Fabric>
    )
  }
}

export default GiverTable