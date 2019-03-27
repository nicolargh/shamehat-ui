import React from 'react';
import './App.css';
import './css/bootstrap.css';
import './css/bootstrap-grid.css';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList, DetailsListLayoutMode, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

function compare(a, b){
  return b.times - a.times; // most shamehats first
}

function GiverTable(props) {
  const columns: IColumn[] = [
      { key: 'column1', name: 'Name',            fieldName: 'name',  minWidth: 150, maxWidth: 200, isResizable: true },
      { key: 'column2', name: 'Shamehats given', fieldName: 'times', minWidth: 150, maxWidth: 200, isResizable: true }
    ]

  var items = props.data.slice()
  items.sort(compare)

  return(
    <Fabric>
      <DetailsList
        items={items}
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

export default GiverTable