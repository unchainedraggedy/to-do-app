import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), text: newTask, completed: false },
      ]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const remainingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="container">
      <div className="input-wrapper">
        <input
          className="input-task"
          type="text"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={addTask}
        />
  <img
          src="/images/free-icon-down-arrow-2985150.png"
          alt="down arrow"
          className="down-arrow"
        />      </div>
      <ul className="task-list">
        {filteredTasks.map(task => (
   <li
   key={task.id}
   className={`task-item ${task.completed ? 'completed' : ''}`}
 >
   <div
     className={`task-checkbox ${task.completed ? 'completed' : ''}`}
     onClick={() => toggleTaskCompletion(task.id)}
   >
     {task.completed && <span>&#10003;</span>}
   </div>
   {task.text}
 </li>
 
     
        ))}
      </ul>
      <div className="header">
      <div className="header-left">{remainingTasks} items left</div>
        <div className="header-center">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <div className="header-right">
          <button onClick={deleteCompletedTasks}>Clear Completed</button>
        </div>
      </div>
    </div>
  );
};

export default App;
