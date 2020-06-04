import React from 'react';
import './index.scss';
// import perf from './test_congratulation.html';

class Congratulation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isWrapperClass : true,
        }
    }
    handleClick(){
        this.setState({
            isWrapperClass: false,
        });
    }

    render(){
        let status = this.props.status;
        let winner = this.props.winner;
        let wrapperClass = "none";

        if(winner){
            if(winner && this.state.isWrapperClass){
                wrapperClass = "wrapper";
                
            } else {
                wrapperClass = "none";
            }
        }
        return(
            <>
                <div className={wrapperClass} >
                    <div className="modal modal--congratulations">
                        <div className="modal-top">
                            <img className="modal-icon u-imgResponsive" src="https://dl.dropboxusercontent.com/s/e1t2hhowjcrs7f5/100daysui_100icon.png" alt="Trophy" />
                            <div className="modal-header">Congratulations</div>
                            <div className="modal-subheader">{status}</div>
                        </div>
                        <div className="modal-bottom">
                            <button className="modal-btn u-btn u-btn--share" onClick={() => this.handleClick()}>Share</button>
                            <button className="modal-btn u-btn u-btn--success" onClick={() => this.handleClick()}>Have a beer</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Congratulation;