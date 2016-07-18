'use strict'

// import the libs we need
import React            from 'react';
import ReactDOM         from 'react-dom'
import Nav              from './Nav.jsx'
import Footer           from './Footer.jsx'
import TaskForm         from './TaskForm.jsx'
import TaskList         from './TaskList.jsx'

import ajax             from '../helpers/ajaxAdapter.js'
import Util             from '../helpers/util.js'
// create a React Component called _App_
export default class App extends React.Component{

    // every class gets a constructor.
    // this is where we init the state.
    constructor() {

        // we also need to wake up our ancestors
        super();

        // here's our state
        this.state = {
          tasks : {}
        }
    }

    // this is right after the component is mounted on the screen
    componenetDidMount() {
        // go to the db and get the freshest tasks
        ajax.getTasks().then( data=>
            //when the data comes back, update the state
            this.setState({tasks: data.indexByKey('task_id') })
        )
    }

    // note that classes do **not** have commas between their methods
    addTask( newTask ){

        // when the data
        // newTask.task_name = newTask.name
        // newTask.task_desc = newTask.desc
        // newTask.completed = false
        // newTask.task_id = Date.now()

        // send the change to the db (ajax)
        ajax.createTask(newTask).then( data=> {

            //when the data comes back, update the state.
            this.state.tasks[newTask.task_id] = newTask
            this.setState({tasks: this.state.tasks})
        })
    }

    // toggle task
    toggleTask( key ) {
        // this.state.tasks[key].completed = !this.state.tasks[key].completed;
        // send out this new change
        // bring in the ajax data here
        // this.setState({tasks.this.state.tasks})

        let myTask = this.state.tasks[key];

        myTask.completed = !

    }


    // 90% of your components will render()
    // REMEMBER you can only return **one** root element from a render fn.
    render(){
        return(
            <container>
                <header>
                    <Nav/>
                    <p>Hello world example</p>
                </header>
                <div className="container">
                    <TaskForm addTask={this.addTask.bind(this)} />
                    <div className="row">

                    {/* OPEN ITEMS*/}
                    <article className="col-md-6">
                        <h3>Open Items</h3>
                        <TaskList
                            list={this.state.tasks}
                            f={x=>!x}
                            action={this.toggleTask.bind(this)}/>
                    </article>

                    {/* Completed ITEMS*/}
                    <article className="col-md-6">
                        <h3>Completed Items</h3>
                        <TaskList
                            list={this.state.tasks}
                            f={x=>x}
                            action={this.toggleTask.bind(this)}/>
                    </article>

                    </div>
                </div>
                <Footer/>
            </container>
        )
    }
}

// mount our App at #container
ReactDOM.render(<App/>, document.querySelector('#container'))
