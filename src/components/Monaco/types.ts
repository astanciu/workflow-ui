export type Props = {
  id?: string;
  fileName?: string;
  code: string;
  width?: string;
  height?: string;
  language?: string;
  hideGutter?: boolean;
  readOnly?: boolean;
  toolbar?: boolean;
  focus?: boolean;
  onSave?: (code: string) => void;
  onChange?: (code: string) => void;
  onDirty?: (fileName: string, dirty: boolean) => void;
};
