import React from 'react';

import Header from './components/Header'
import MainContent from "./MainContent"
import AddBook from './components/AddBook'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import EditContainer from './EditContainer'

class App extends React.Component {


    render() {

        return (
            <div>
                <Header/>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path='/' component={MainContent}/>
                            <Route
                                path='/add'
                                render={(props) => <AddBook {...props} isEdited={false}/>}
                            />
                            <Route
                                path='/edit/:id'
                                render={(props) => <EditContainer {...props} isEdited={true}/>}
                            />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
