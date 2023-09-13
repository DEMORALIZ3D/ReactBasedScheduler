import "./App.css";
import RBScheduler from "./Components/Scheduler";

const resources = [
  {
    id: 1,
    name: "Fred Perry",
    role: "test role",
  },
  {
    id: 2,
    name: "Kathrine Kidston",
    role: "test role 2",
  },
];

const events = [
  {
    id: 234,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 1,
    date: new Date(),
  },
  {
    id: 235,
    name: "Application Developer - night",
    meta: {
      createdBy: "bob",
    },
    resourceId: null,
    date: null,
  },
];

function App() {
  return (
    <div className="App">
      <RBScheduler resources={resources} events={events} />
    </div>
  );
}

export default App;
