import React from 'react';

// let TASKS = [
//     { nameTask: 'Task 1', statusTask: 'Done' },
//     { nameTask: 'Task 2', statusTask: 'Doing' },
//     { nameTask: 'Task 3', statusTask: 'Todo' }
// ];

const TASKS = [
    { nameTask: 'Task 1' },
    { nameTask: 'Task 2' },
    { nameTask: 'Task 3' }
];

class InputTask extends React.Component {

    state = {
        nameTask: ''
    }

    handleTaskChange = (event) => {
        this.setState({
            nameTask: event.target.value
        });
    }

    handleSaveClick = (event) => {
        this.props.addTask({ nameTask: this.state.nameTask });
    }

    handleClearClick = (event) => {
        this.setState({
            nameTask: ''
        });
    }

    render() {
        return (
            <form>
                <label> Input your task </label> <br />
                <input type='text' value={this.state.nameTask}
                    onChange={(event) => this.handleTaskChange(event)}
                />
                <button type="button" onClick={(event) => { this.handleSaveClick(event) }}> Save </button>
                <button type="button" onClick={(event) => { this.handleClearClick(event) }}> Clear </button>
            </form>
        );
    }
}

class Task extends React.Component {
    state = {
        isEdittingMode: false,
        task: this.props.task.nameTask
    };

    //currentTask = this.state.task;

    handleTaskChange = (event) => {
        //this.currentTask = this.state.task;
        this.setState({
            task: event.target.value
        });
    }

    handleEditChange = (event) => {
        if (this.state.isEdittingMode) {
            this.props.updateTask(this.props.indexTask, { nameTask: this.state.task })
            console.log("Save");
        } else {
            console.log("Edit");
        }
        this.setState({
            isEdittingMode: !this.state.isEdittingMode
        });
    }

    handleDeleteChange = (event) => {
        if (this.state.isEdittingMode) {
            this.setState({
                isEdittingMode: !this.state.isEdittingMode
                //task: this.currentTask
            });
            console.log("cancel");
        }
        else {
            this.props.deleteTask(this.props.indexTask);
            console.log("delete ");
        }
    }
    render() {
        return (
            <>
                {
                    this.state.isEdittingMode
                        ? <input type='text' value={this.state.task}
                            onChange={(event) => this.handleTaskChange(event)}>
                        </input>
                        : < label > {this.state.task} </label >
                }
                <button type="button" onClick={(event) => this.handleEditChange(event)}> {this.state.isEdittingMode ? 'Save' : 'Edit'} </button>
                <button type="button" onClick={(event) => this.handleDeleteChange(event)}> {this.state.isEdittingMode ? 'Cancel' : 'Delete'} </button>
            </>
        );
    }
}

class TaskList extends React.Component {
    // state = {
    //     taskList: this.props.taskList
    // }
    render() {
        const items = this.props.taskList.map((e, i) =>
            <li>
                <Task indexTask={i} task={e} deleteTask={this.props.deleteTask} updateTask={this.props.updateTask} />
            </li>
        )
        return (
            <>
                <ul>
                    {items}
                </ul>
            </>
        );
    }
}

class TodoList extends React.Component {
    state = {
        tasks: TASKS
    }

    addTask = (task) => {
        //let tmpTasks = this.state.tasks;
        //tmpTasks = tmpTasks.push(task);
        this.setState({
            //tasks: tmpTasks
            tasks: [...this.state.tasks, task]
        })
    }

    deleteTask = (index) => {
        let tmpTasks = this.state.tasks;
        //console.log("before delete ", index, " :", tmpTasks);
        tmpTasks = tmpTasks.filter((element) => element.nameTask !== tmpTasks[index].nameTask)
        console.log("before delete ", index, " :", this.state.tasks);
        this.setState({
            tasks: tmpTasks
        })
        // console.log("after delete ", index, " :", tmpTasks);
        console.log("before delete ", index, " :", this.state.tasks);
    }

    updateTask = (index, task) => {
        let tmpTasks = this.state.tasks;
        tmpTasks[index] = task;
        this.setState({
            tasks: tmpTasks
        })
    }

    render() {
        return (
            <>
                <InputTask addTask={this.addTask} />
                <TaskList taskList={this.state.tasks} deleteTask={this.deleteTask} updateTask={this.updateTask} />
            </>
        );
    }
}

export default TodoList;