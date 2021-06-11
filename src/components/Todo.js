import React from 'react';
import "../css/Todo.css";
import AddTask from './AddTask';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TaskList from './TaskList';
import CompleteTaskList from './CompleteTaskList';

export default function Todo() {
    return (
        <div className="container">
            <Paper variant="outlined">
                <br />
                <br />
                <Grid container direction="column" justify="center" alignItems="stretch" spacing={3}>
                    <Grid item>
                        <h1>Todo List</h1>
                    </Grid>
                    <Grid item>
                        <AddTask />
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" justify="space-around" alignItems="center">
                            <Grid item>
                                <h2>Todo</h2>
                                <TaskList />
                            </Grid>
                            <Grid item>
                                <h2>Completed</h2>
                                <CompleteTaskList />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}
