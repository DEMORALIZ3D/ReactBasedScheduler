import { SchedulerProps } from "./lib/interfaces";
import Scheduler from "./components/Scheduler";
import { Provider } from "react-redux";
import { store } from "./store/store";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { enGB } from "date-fns/locale";

const RBScheduler = (props: SchedulerProps) => {
  setDefaultOptions({
    locale: enGB,
  });
  return (
    <Provider store={store}>
      <Scheduler {...props} />
    </Provider>
  );
};

export default RBScheduler;
