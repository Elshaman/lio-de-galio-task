import React from 'react'
import {ITask, ITaskItems} from './components/ITask';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
         KeyboardAvoidingView, 
         Text,
         View,
         TextInput, 
         Platform
         TouchableOpacity,
         Keyboard,
         ScrollView  } from 'react-native';
import Task from './components/Task';




export default function App() {

  

  const [task, setTask] = React.useState<ITask>({ text: ''});
  const [taskItems, setTaskItems] = React.useState<ITaskItems>( []);

  function handleAddTask() {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask({text:''});
  }

  function completeTask(index:number) {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{  flexGrow:1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.taskWrapper}> 
            <Text style={styles.sectionTitle}> Mi lista de tareas  </Text>
            <View style={styles.items}>
              {
                taskItems.map((item,index)=>{
                  return(
                    <TouchableOpacity
                      key={index}
                      onPress={()=>completeTask(index)}>
                        <Task text={item.text} />
                    </TouchableOpacity>
                  )
                })
              }

            </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
       >
         <TextInput
          style={styles.input}
          placeholder={"Add new task"}
          value={task.text}
          onChangeText={(text) => setTask({text:text})}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        
        </KeyboardAvoidingView>   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',  
  },
  taskWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold'
  },
  items:{
    marginTop:30
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor: "#FFF",
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {},
});
