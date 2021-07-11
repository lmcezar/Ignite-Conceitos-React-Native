import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs  {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const itemFound = tasks.find((item) => item.title === newTaskTitle);

    if(itemFound) {
      Alert.alert("Você não pode cadastrar uma task com o mesmo nome");
      return;
    } else{
      setTasks(oldTasks => [...oldTasks, newTask])
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));

    const foundItem = updatedTasks.find(item => item.id === id);

    if(!foundItem) 
      return;
    
      foundItem.done = !foundItem.done;
      setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {

    Alert.alert("Excluir task", "Deseja excluir a task?", [
      {
        text: "Cancelar"

      },
      {
        text: "Sim",
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id);
          setTasks(updatedTasks);
        }
      }
    ])
    
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const taskToBeUpdated = updatedTasks.find(item => item.id === taskId);
    if(!taskToBeUpdated)
      return;

      taskToBeUpdated.title = taskNewTitle;
      setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})