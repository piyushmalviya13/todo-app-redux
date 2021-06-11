import React from 'react';
import CompleteTaskCard from './CompleteTaskCard';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

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

export default function CompleteTaskList() {
    const classes = useStyles();

    const todoTasks = useSelector((state) => state.todoList);

    const completeTasks = todoTasks.filter((todoTask) => {
        return todoTask.complete;
    })
    return (
        <div>
            {completeTasks.length === 0 ? <p>Need to peek at the incomplete side :p</p>
                :
                <Paper className={classes.root} style={{ maxHeight: 400, overflow: 'auto', overflowX: 'hidden' }}>

                    {completeTasks.map(todoTask => (
                        <CompleteTaskCard id={todoTask.id} todo={todoTask.task} />
                    ))}
                </Paper>
            }
        </div>
    )
}
