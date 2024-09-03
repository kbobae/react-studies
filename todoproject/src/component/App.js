import './App.css';
import Header from './Header';
import TodoEditor from './TodoEditor';
import TodoList from './TodoList';


 function App() {

   return (
     <div className="App">
      <Header />
        <TodoEditor />
        <TodoList />
     </div>
   );
 }

 export default App;
