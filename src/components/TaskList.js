import React, { useEffect } from 'react';
import TaskCard from './TaskCard';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosFirebase } from "../redux/store";

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#9F9D9D',
        }
    },
}));

export default function TaskList() {
    const dispatch = useDispatch();

    const classes = useStyles();
    const todoTasks = useSelector((state) => state.todoList);

    useEffect(() => {
        dispatch(getTodosFirebase());
    }, [dispatch]);

    const incompleteTasks = todoTasks.filter((todoTask) => {
        return !todoTask.complete;
    })
    return (
        <div>
            {incompleteTasks.length === 0 ? <p>Wohoo!! Nothing Pending</p>
                :
                <Paper className={classes.root} style={{ maxHeight: 400, overflow: 'auto', overflowX: 'hidden' }}>

                    {incompleteTasks.map(todoTask => (
                        <TaskCard id={todoTask.id} todo={todoTask.task} />
                    ))}
                </Paper>
            }
        </div>
    )
}
