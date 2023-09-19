import { addDays, addHours, setHours } from "date-fns";
import "./App.css";
import RBScheduler from "./Components/Scheduler";
import { EventsList } from "./Components/Scheduler/store/events/lib";
import { ResourceList } from "./Components/Scheduler/store/resources/lib";

const resources: ResourceList = [
  {
    id: 1,
    name: "Fred Perry",
    role: "test role",
    contractedHours: 37.5,
  },
  {
    id: 2,
    name: "Kathrine Kidston",
    role: "test role 2",
    contractedHours: 37.5,
  },
  {
    id: 3,
    name: "Tom Ford",
    role: "test role 3",
    contractedHours: 40,
  },
  {
    id: 4,
    name: "John Bishop",
    role: "test role 4",
    contractedHours: 12,
  },
];

const dateDec = setHours(new Date(2024, 11, 30), 9);

const events: EventsList = [
  {
    id: 234,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 1,
    startDate: dateDec,
    endDate: setHours(addHours(dateDec, 8), 17.5),
  },
  {
    id: 244,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 1,
    startDate: setHours(addDays(dateDec, 1), 16),
    endDate: addHours(setHours(addDays(dateDec, 1), 16), 12),
  },
  {
    id: 254,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 1,
    startDate: setHours(addDays(dateDec, 2), 9),
    endDate: setHours(addDays(dateDec, 2), 12),
  },
  {
    id: 264,
    name: "Meeting",
    meta: {
      createdBy: "bob",
    },
    resourceId: 1,
    startDate: setHours(addDays(dateDec, 2), 13),
    endDate: setHours(addDays(dateDec, 2), 14),
  },
  {
    id: 274,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 1,
    startDate: setHours(addDays(dateDec, 2), 14),
    endDate: setHours(addDays(dateDec, 2), 17),
  },
  {
    id: 284,
    name: "Application Developer - night",
    meta: {
      createdBy: "bob",
    },
    resourceId: null,
    startDate: setHours(addDays(dateDec, 1), 9),
    endDate: addHours(addDays(dateDec, 1), 8),
  },
  {
    id: 294,
    name: "Dog Walker",
    meta: {
      createdBy: "bob",
    },
    resourceId: 2,
    startDate: setHours(addDays(dateDec, 1), 9),
    endDate: addHours(addDays(dateDec, 1), 8),
  },
  // tom ford 3 days
  {
    id: 234,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 3,
    startDate: dateDec,
    endDate: setHours(addHours(dateDec, 8), 17.5),
  },
  {
    id: 244,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 3,
    startDate: setHours(addDays(dateDec, 1), 16),
    endDate: addHours(setHours(addDays(dateDec, 1), 16), 12),
  },
  {
    id: 254,
    name: "Application Developer - Day",
    meta: {
      createdBy: "bob",
    },
    resourceId: 3,
    startDate: setHours(addDays(dateDec, 2), 9),
    endDate: setHours(addDays(dateDec, 2), 17.5),
  },
  {
    id: 264,
    name: "Meeting",
    meta: {
      createdBy: "bob",
    },
    resourceId: 3,
    startDate: setHours(addDays(dateDec, 2), 13),
    endDate: setHours(addDays(dateDec, 2), 14),
  },
  // no date, sent to avialable
  {
    id: 284,
    name: "Application Developer - night",
    meta: {
      createdBy: "bob",
    },
    resourceId: null,
    startDate: setHours(addDays(dateDec, 1), 9),
    endDate: addHours(addDays(dateDec, 1), 8),
  },
];

const config = {
  resource: {
    avatar: true,
    slots: [
      {
        resourceDataKey: "name",
      },
      {
        resourceDataKey: "role",
      },
      {
        resourceDataKey: "contractedHours",
        textContent: "Hours: ",
      },
    ],
  },
};

function App() {
  return (
    <div className="App">
      <RBScheduler resources={resources} events={[]} config={config} />
      <h4>Completed</h4>
      <ul>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>Create week scroller</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>Create week scroller</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>Table using div and GRID</span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>
            Year indicator on date scroll
          </span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>
            display additonal resource info
          </span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>
            Color table and use grid-container for the rows
          </span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>
            Add contextMenu to each cell
          </span>
        </li>
        <li>
          <input type="checkbox" checked={true} />
          <span style={{ marginLeft: "8px" }}>
            Add Event modal with basic name of event input & save to list of
            events
          </span>
        </li>
      </ul>

      <h4>outstanding</h4>
      <ul>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>stacked shifts</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>
            Add ability to add dates/times to evemt
          </span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>
            display hours of event, and other details while making one.
          </span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>
            events over two or more days/span event
          </span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Duplicate event</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Group Resource</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Filter by resource</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Filter By event</span>
        </li>
        <hr />
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Create mobile view</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Restyle/skin</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Drag & Drop support</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Group Resource</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Avatars</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Refactor</span>
        </li>
        <li>
          <input type="checkbox" checked={false} />
          <span style={{ marginLeft: "8px" }}>Performance Optomizations</span>
        </li>
      </ul>
    </div>
  );
}

export default App;
