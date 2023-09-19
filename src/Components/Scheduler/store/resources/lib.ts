export type ResourceItem = {
  id: string | number;
  image?: string | null;
  name: string;
  contractedHours: number;
  [key: string]: unknown;
};

export type ResourceList = ResourceItem[] | null;

export interface ResourcesState {
  filter: {
    resourceName: string | null;
  };
  sort: {
    key: string | null;
    direction: "asc" | "desc";
  };
  resourceList: ResourceList;
  filteredList: ResourceList;
  groupBy: {
    key: string | number | null;
    friendlyName: string | null;
  };
}
