<template lang="html">
    <div>
        <form v-on:submit='ekleToDo($event)'>
            <input type='text' placeholder='Ne yapacaksın?' v-model='yeniToDo' />
            <input type='submit' />
        </form>
        <!-- <input v-model='yeniToDo' />
        <button @click="ekleToDo($event)">ekle</button> -->
        
        <ul>
            <li v-for='todo in todos' :key='todo._id'>
                <input type='checkbox' @click='silToDo(todo._id)'> {{todo.title}}
            </li>
        </ul>
    </div>
</template>
<script>
import TodoAPI from "@/services/TodoAPI.js";
export default {
    data() {
        return {
            yeniToDo: "",
            todos: []
        };
    },
    mounted() {
        this.loadTodos();
    },
    methods: {
        async ekleToDo(event) {
            console.log(this.yeniToDo)
            event.preventDefault();
            const response = await TodoAPI.addTodo(this.yeniToDo);
            console.log(response)
            this.todos.push({"_id": response.insertedId, "title": this.yeniToDo})
            this.yeniToDo = "";
        },
        silToDo(todoID) {
            TodoAPI.deleteTodo(todoID)
            this.todos = this.todos.filter(function (obj) {
                return obj._id !== todoID
            })
        },
        async loadTodos() {
            const response = await TodoAPI.getToDos();
            this.todos = response.data
        }
    }
};
</script>
