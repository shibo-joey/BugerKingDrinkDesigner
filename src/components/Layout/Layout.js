import React, { Component } from 'react';
import classes from './Layout.module.css';
import Toolbar from './../Navigation/Toolbar/Toolbar';
import SideDrawer from './../Navigation/SideDraw/SideDraw';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHanler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandle = () =>{
        this.setState((preState)=>{
            return {showSideDrawer: !preState.showSideDrawer}
        })
    }

    render() { 
        return (
        <React.Fragment>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandle}/>
            <SideDrawer 
            closed={this.sideDrawerClosedHanler}
            open={this.state.showSideDrawer}/>
    <main className={classes.Content}>
        {this.props.children}
    </main>
        </React.Fragment> );
    }
}
 

export default Layout;