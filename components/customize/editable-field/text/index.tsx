import React, { useState } from "react";
import { EditableFieldProvider } from "@/lib/context/editable-field-context";
import EditableField from "..";

interface TextFieldContainerProps {
  initialValue?: any;
  regenerateOptions?: string[];
  initialGenerationType?: string;
  isSwitchable?: boolean;
  initialSwitchChecked?: boolean;
  onValueChange?: (text: string) => void;
  onSwitchChange?: (checked: boolean) => void;
  onRegenerate?: (image: string) => void;
}

const TextFieldContainer: React.FC<TextFieldContainerProps> = ({
  initialValue = null,
  regenerateOptions = ["Option1", "Option2"],
  initialGenerationType = "",
  isSwitchable = true,
  initialSwitchChecked = false,
  onValueChange = (text) => console.log("set:", text),
  onSwitchChange = (checked) => console.log("Switch changed:", checked),
  onRegenerate = (image) => console.log("regenerate"),
}) => {
  const [value, setValue] = useState<any>(initialValue);
  const [generationType, setGenerationType] = useState<string>(
    initialGenerationType,
  );
  const [switchChecked, setSwitchChecked] =
    useState<boolean>(initialSwitchChecked);

  return (
    <EditableFieldProvider
      type="text"
      value={value}
      setValue={setValue}
      regenerateOptions={regenerateOptions}
      generationType={generationType}
      setGenerationType={setGenerationType}
      onValueChange={onValueChange}
      isSwitchable={isSwitchable}
      switchChecked={switchChecked}
      onSwitchChange={(checked) => {
        setSwitchChecked(checked);
        onSwitchChange(checked);
      }}
      onRegenerate={onRegenerate}
    >
      <EditableField />
    </EditableFieldProvider>
  );
};

export default TextFieldContainer;
