import { React, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from "react-redux";
import { addTodoFirebase } from "../redux/store";

export default function AddTask() {
    const dispatch = useDispatch();

    const addTask = () => {
        dispatch(
            addTodoFirebase({
                task: task,
            })
        );
        setTask("");
    }

    const [task, setTask] = useState("");

    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                <Grid item>
                    <TextField value={task} id="task" label="Write Task" variant="filled" style={{ width: "45ch" }} onChange={(e) => setTask(e.target.value)} />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={!task ? null : addTask}><b>Add Task</b></Button>
                </Grid>
            </Grid>
        </div>
    )
}
