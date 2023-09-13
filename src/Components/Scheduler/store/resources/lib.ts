export type ResourceList =
  | {
      id: string | number;
      image?: string | null;
      name: string;
      [key: string]: unknown;
    }[]
  | null;

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
