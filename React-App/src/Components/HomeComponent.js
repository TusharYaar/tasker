import React, { Component } from 'react';
import Sidebar from './SidebarComponent'
class Home extends Component {
  constructor(props) {
        super(props);
        this.state ={ projects: [],
        selectedProject : null
    }}
    render () {
        return (
            <div>
                <Sidebar />

            </div>
        )
    }
}

export default Home;