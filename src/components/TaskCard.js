import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { todoActions } from '../redux/store';
import { useDispatch } from "react-redux";
import { completeTodoFirebase, deleteTodoFirebase } from "../redux/store";

export default function TaskCard(props) {
    const dispatch = useDispatch();

    const deleteTask = () => {
        dispatch(
            deleteTodoFirebase({
                id: props.id,
            })
        );
    }

    const completeTask = () => {
        dispatch(
            completeTodoFirebase({
                id: props.id,
            })
        );
    }

    return (
        <div>
            <Card variant="outlined" style={{ maxWidth: 300 }}>
                <CardContent>
                    <p> {props.todo}</p>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" size="small" onClick={completeTask}>Complete</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={deleteTask}>Delete</Button>
                </CardActions>
            </Card>
        </div>
    )
}
