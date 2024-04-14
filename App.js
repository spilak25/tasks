import React, { useState } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,FlatList, Modal, Pressable, Button,} from 'react-native';

function DeleteModal ({taskID, isOpen, setIsOpen, tasks, setTasks}) {
  return(
    <Modal
      visible={isOpen} animationType='fade' transparent={true} onRequestClose={()=> {setIsOpen(false)}}
    >
      <View 
        style={{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }}
      >
        <Pressable style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}} onPress={() => setIsOpen(false)} />
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
        <Text style={{fontSize: 24, textAlign:"center"}}>Voulez-vous supprimer la tache ?</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
              <Button color={'black'} title="Oui" onPress={() => {
                  setTasks(tasks.filter(task => task.id !== taskID));
                  setIsOpen(false);
              }} />
              <Button color={'black'} title="Non" onPress={() => setIsOpen(false)} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedTask, setDeletedTask] = useState(null);

  const addTask = () => {
    if (taskText.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: taskText }]);
    setTaskText('');
  };

  const deleteTask = id => {
    setDeletedTask(id);
    setIsDeleteModalOpen(true);
  };

  const startEditingTask = (id, text) => {
    setEditingTaskId(id);
    setEditedTaskText(text);
  };

  const saveEditedTask = (id, newText) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: newText } : task)));
    setEditingTaskId(null);
    setEditedTaskText('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des tâches</Text>
      <FlatList
        style={styles.taskList}
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={styles.task}>
              {editingTaskId === item.id ? (
                <View style={styles.editContainer}>
                  <TextInput
                    style={styles.editInput}
                    value={editedTaskText}
                    onChangeText={text => setEditedTaskText(text)}
                  />
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => saveEditedTask(item.id, editedTaskText)}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.taskText}>{item.text}</Text>
              )}
              <View style={styles.taskButtons}>
                <TouchableOpacity onPress={() => startEditingTask(item.id, item.text)}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la tâche"
          value={taskText}
          onChangeText={text => setTaskText(text)}
        />
        <TouchableOpacity style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
      <DeleteModal isOpen={isDeleteModalOpen} setIsOpen={setIsDeleteModalOpen} setTasks={setTasks} taskID={deletedTask} tasks={tasks}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  taskList: {
    flex: 1,
  },
  taskContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  taskText: {
    flex: 1,
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  taskButtons: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  editButton: {
    marginRight: 10,
    color: 'green',
  },
  deleteButton: {
    color: 'red',
  },
});
