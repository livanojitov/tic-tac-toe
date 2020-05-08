import React, { Component } from 'react';
import { HistoryContext }   from '../contexts/HistoryContext';
import History              from '../components/History';

class History1 extends Component{
  static contextType = HistoryContext;
  
  render(){
    return (
        <div>
        { this.context.history  && (<History/>) }
        </div>
      )
  }

  componentDidMount(){
    const { changeHistory } = this.context;
    changeHistory(1);
  }

  componentWillUnmount(){
    const { changeHistory } = this.context
    if ('0123456789'.indexOf(this.props.history.location.pathname[1]) === -1){
      changeHistory(0);
    }  
  }
}

export default History1;



