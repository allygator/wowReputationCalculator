import React, { Component } from 'react';
import Calc from './Calc';
import Blog from './Blog';
import  { Route, Switch } from 'react-router-dom';

class Main extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Calc}/>
                    <Route path='/:region/:realm/:name' component={Calc}/>
                    <Route path='/blog' component={Blog}/>
                </Switch>
            </main>

    );}


}

export default Main;
