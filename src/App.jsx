import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Состояние для вкладок
  const [activeTab, setActiveTab] = useState('habits')
  
  // Состояние для привычек
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Утренняя зарядка', streak: 5, completedToday: false, color: '#4CAF50' },
      { id: 2, name: 'Чтение книги', streak: 12, completedToday: false, color: '#2196F3' },
      { id: 3, name: 'Планирование дня', streak: 8, completedToday: true, color: '#FF9800' }
    ]
  })
  
  // Состояние для задач
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Подготовить отчет', priority: 'high', completed: false },
      { id: 2, title: 'Ответить на письма', priority: 'medium', completed: false },
      { id: 3, title: 'Купить продукты', priority: 'low', completed: true }
    ]
  })
  
  // Состояние для таймера Pomodoro
  const [timerMinutes, setTimerMinutes] = useState(25)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerMode, setTimerMode] = useState('work') // work, shortBreak, longBreak
  
  // Состояние для новой привычки
  const [newHabitName, setNewHabitName] = useState('')
  
  // Состояние для новой задачи
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('medium')
  
  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  // Таймер Pomodoro
  useEffect(() => {
    let interval = null
    if (timerRunning && timerMinutes > 0 || timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            setTimerRunning(false)
          } else {
            setTimerMinutes(timerMinutes - 1)
            setTimerSeconds(59)
          }
        } else {
          setTimerSeconds(timerSeconds - 1)
        }
      }, 1000)
    } else if (timerRunning && timerMinutes === 0 && timerSeconds === 0) {
      setTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [timerRunning, timerMinutes, timerSeconds])
  
  // Функции для привычек
  const toggleHabit = (id) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completedToday: !habit.completedToday, streak: habit.completedToday ? habit.streak - 1 : habit.streak + 1 }
        : habit
    ))
  }
  
  const addHabit = () => {
    if (newHabitName.trim()) {
      const colors = ['#4CAF50', '#2196F3', '#FF9800', '#E91E63', '#9C27B0']
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setHabits([...habits, { 
        id: Date.now(), 
        name: newHabitName, 
        streak: 0, 
        completedToday: false, 
        color: randomColor 
      }])
      setNewHabitName('')
    }
  }
  
  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id))
  }
  
  // Функции для задач
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }
  
  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        title: newTaskTitle, 
        priority: newTaskPriority, 
        completed: false 
      }])
      setNewTaskTitle('')
      setNewTaskPriority('medium')
    }
  }
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }
  
  // Функции для таймера
  const startTimer = () => setTimerRunning(true)
  const pauseTimer = () => setTimerRunning(false)
  const resetTimer = () => {
    setTimerRunning(false)
    if (timerMode === 'work') {
      setTimerMinutes(25)
    } else if (timerMode === 'shortBreak') {
      setTimerMinutes(5)
    } else {
      setTimerMinutes(15)
    }
    setTimerSeconds(0)
  }
  
  const setMode = (mode) => {
    setTimerMode(mode)
    setTimerRunning(false)
    if (mode === 'work') {
      setTimerMinutes(25)
    } else if (mode === 'shortBreak') {
      setTimerMinutes(5)
    } else {
      setTimerMinutes(15)
    }
    setTimerSeconds(0)
  }
  
  // Подсчет статистики
  const completedHabitsToday = habits.filter(h => h.completedToday).length
  const totalHabits = habits.length
  const completedTasks = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const productivityScore = totalHabits > 0 ? Math.round((completedHabitsToday / totalHabits) * 100) : 0
  
  return (
    <div className="app">
      <header className="header">
        <h1>📊 Продуктивность</h1>
        <p>Инструмент повышения личной эффективности</p>
      </header>
      
      {/* Статистика */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Привычки сегодня</h3>
          <div className="stat-value">{completedHabitsToday}/{totalHabits}</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${productivityScore}%` }}></div>
          </div>
        </div>
        <div className="stat-card">
          <h3>Задачи выполнено</h3>
          <div className="stat-value">{completedTasks}/{totalTasks}</div>
          <div className="progress-bar">
            <div className="progress-fill task-progress" style={{ width: `${totalTasks > 0 ? (completedTasks/totalTasks)*100 : 0}%` }}></div>
          </div>
        </div>
      </div>
      
      {/* Вкладки навигации */}
      <nav className="tabs">
        <button 
          className={`tab ${activeTab === 'habits' ? 'active' : ''}`}
          onClick={() => setActiveTab('habits')}
        >
          🎯 Привычки
        </button>
        <button 
          className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          ✅ Задачи
        </button>
        <button 
          className={`tab ${activeTab === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveTab('timer')}
        >
          ⏱️ Pomodoro
        </button>
      </nav>
      
      {/* Контент вкладок */}
      <main className="content">
        {/* Вкладка Привычки */}
        {activeTab === 'habits' && (
          <div className="habits-section">
            <h2>Мои привычки</h2>
            <div className="add-habit-form">
              <input
                type="text"
                placeholder="Название новой привычки"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              />
              <button onClick={addHabit}>Добавить</button>
            </div>
            
            <div className="habits-list">
              {habits.map(habit => (
                <div key={habit.id} className="habit-item" style={{ borderLeftColor: habit.color }}>
                  <div className="habit-info">
                    <h3>{habit.name}</h3>
                    <span className="streak">🔥 {habit.streak} дней подряд</span>
                  </div>
                  <div className="habit-actions">
                    <button 
                      className={`complete-btn ${habit.completedToday ? 'completed' : ''}`}
                      onClick={() => toggleHabit(habit.id)}
                    >
                      {habit.completedToday ? '✓ Выполнено' : 'Отметить'}
                    </button>
                    <button className="delete-btn" onClick={() => deleteHabit(habit.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Вкладка Задачи */}
        {activeTab === 'tasks' && (
          <div className="tasks-section">
            <h2>Список задач</h2>
            <div className="add-task-form">
              <input
                type="text"
                placeholder="Название задачи"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
              />
              <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)}>
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
              <button onClick={addTask}>Добавить</button>
            </div>
            
            <div className="tasks-list">
              {tasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                  </div>
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                  </div>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Вкладка Pomodoro */}
        {activeTab === 'timer' && (
          <div className="timer-section">
            <h2>Таймер Pomodoro</h2>
            <div className="timer-modes">
              <button 
                className={`mode-btn ${timerMode === 'work' ? 'active' : ''}`}
                onClick={() => setMode('work')}
              >
                Работа
              </button>
              <button 
                className={`mode-btn ${timerMode === 'shortBreak' ? 'active' : ''}`}
                onClick={() => setMode('shortBreak')}
              >
                Короткий перерыв
              </button>
              <button 
                className={`mode-btn ${timerMode === 'longBreak' ? 'active' : ''}`}
                onClick={() => setMode('longBreak')}
              >
                Длинный перерыв
              </button>
            </div>
            
            <div className="timer-display">
              <div className="time">
                <span className="minutes">{String(timerMinutes).padStart(2, '0')}</span>
                <span className="separator">:</span>
                <span className="seconds">{String(timerSeconds).padStart(2, '0')}</span>
              </div>
            </div>
            
            <div className="timer-controls">
              {!timerRunning ? (
                <button className="control-btn start" onClick={startTimer}>▶️ Старт</button>
              ) : (
                <button className="control-btn pause" onClick={pauseTimer}>⏸️ Пауза</button>
              )}
              <button className="control-btn reset" onClick={resetTimer}>🔄 Сброс</button>
            </div>
            
            <div className="timer-info">
              <p>Метод Pomodoro помогает поддерживать концентрацию:</p>
              <ul>
                <li>25 минут работы</li>
                <li>5 минут короткого перерыва</li>
                <li>15 минут длинного перерыва после 4 циклов</li>
              </ul>
            </div>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <p>© 2024 Инструмент продуктивности. Создано для диплома.</p>
      </footer>
    </div>
  )
}

export default App
