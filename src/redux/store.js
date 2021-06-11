import { createSlice, configureStore, nanoid } from "@reduxjs/toolkit";
import { db } from '../firebase';

export const getTodosFirebase = () => {
    return async dispatch => {
        const response = await db.collection("tasks").get();
        var todoList = [];
        response.docs.forEach(task => {
            todoList.push({ firebaseId: task.id, id: task.data().id, task: task.data().task, complete: task.data().complete });
        });

        dispatch(todoActions.setList(todoList))
    }
}

export const addTodoFirebase = (payload) => {
    var id = nanoid();
    return async (dispatch) => {
        dispatch(todoActions.addTask({ id: id, task: payload.task }));

        await db.collection("tasks").add({
            id: id,
            task: payload.task,
            complete: false
        })
    }
}

export const completeTodoFirebase = (payload) => {
    return async (dispatch) => {
        dispatch(todoActions.completeTask(payload.id));

        db.collection("tasks").where("id", "==", payload.id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update({ complete: true })
                });
            })
    }
}

export const deleteTodoFirebase = (payload) => {
    return async (dispatch) => {
        dispatch(todoActions.deleteTask(payload.id));

        db.collection("tasks").where("id", "==", payload.id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            })
    }
}

const initialListState = { todoList: [] };

const todoSlice = createSlice({
    name: 'todoList',
    initialState: initialListState,
    reducers: {
        setList(state, action) {
            state.todoList = action.payload;
        },
        addTask(state, action) {
            state.todoList.push({ id: action.payload.id, task: action.payload.task, complete: false });
        },
        deleteTask(state, action) {
            var removeIndex = state.todoList.map(item => item.id).indexOf(action.payload);
            state.todoList.splice(removeIndex, 1);
        },
        completeTask(state, action) {
            var index = state.todoList.map(item => item.id).indexOf(action.payload);
            state.todoList[index].complete = true;
        }
    },
});

const store = configureStore({
    reducer: todoSlice.reducer
});

export const todoActions = todoSlice.actions;

export default store;