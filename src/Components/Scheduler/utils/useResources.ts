import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ResourceList } from "../store/resources/lib";
import { initResource } from "../store/resources/slice";
import { useTypedSelector } from "./stateHooks";

export const useResources = (resourcesRaw: ResourceList) => {
  const dispatch = useDispatch();
  const resourceList = useTypedSelector(
    (state) => state.resources.resourceList,
  );
  const filteredResourceList = useTypedSelector(
    (state) => state.resources.filteredList,
  );
  const isResourcesListInitialised = !!(
    resourceList && resourceList.length > 0
  );

  const initialiseResource = (payload: ResourceList) =>
    dispatch(initResource(payload));

  const init = useCallback(() => {
    if (
      !isResourcesListInitialised &&
      resourcesRaw &&
      resourcesRaw.length > 0
    ) {
      console.log("init", { isResourcesListInitialised });
      initialiseResource(resourcesRaw);
    } else {
      new Error("Unable to initialise, no resources found");
    }
  }, [resourcesRaw, isResourcesListInitialised]);

  useEffect(() => {
    init();
  }, [init]);

  return {
    isResourcesListInitialised,
    filteredResourceList,
    initialiseResource,
  };
};
