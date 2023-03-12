export type CategoryTypes = { name: string; id: string };
export type DropdownTypes = {
  catalogName?: string;
  info?: CategoryTypes[];
  infoForProduct?: {
    nameWrapper: string;
    dropDownItem: string;
  };
  calb?: () => void;
};
