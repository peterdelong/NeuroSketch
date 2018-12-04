import React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import * as actions from './actions';
import { NodesPanel } from './components/NodesPanel';
import { Diagram } from './components/Diagram';
import { Controls } from './components/Controls';

import './App.scss';

class Demo extends React.Component {
  render() {
    const { model, selectedNode, onNodeSelected, updateModel, onUndo, onRedo, onShow, canUndo, canRedo } = this.props;
    return (
  	  <DragDropContextProvider backend={HTML5Backend}>
    	  <div className='parent-container'>
          <NodesPanel />
  	      <Diagram
  	        model={model}
  	        updateModel={updateModel}
  	        onNodeSelected={onNodeSelected}
  	       />
  	      <Controls
  	        selectedNode={selectedNode}
  	        onUndo={onUndo}
  	        onRedo={onRedo}
            onShow={() => console.log(model)}
  	        canUndo={canUndo}
  	        canRedo={canRedo}
  	       />
    	  </div>
  	  </DragDropContextProvider>
  	);
  }
}

const mapStateToProps = state => ({
  selectedNode: state.history.present.selectedNode,
  model: state.history.present.model,
  canUndo: state.history.past.length > 0,
  canRedo: state.history.future.length > 0
});

const mapDispatchToProps = dispatch => ({
  onNodeSelected: node => dispatch(actions.onNodeSelected(node)),
  updateModel: (model, props) => dispatch(actions.updateModel(model, props)),
  onUndo: () => dispatch(UndoActionCreators.undo()),
  onRedo: () => dispatch(UndoActionCreators.redo())
});

export const App = connect(mapStateToProps, mapDispatchToProps)(Demo);
