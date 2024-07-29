import React, { useState } from "react";
import { EditableFieldProvider } from "@/lib/context/editable-field-context";
import EditableField from "..";

interface ImageFieldContainerProps {
  initialValue?: any;
  regenerateOptions?: string[];
  initialImageGenerationType?: string;
  isSwitchable?: boolean;
  initialSwitchChecked?: boolean;
  onImageSet?: (url: string) => void;
  onSwitchChange?: (checked: boolean) => void;
  onRegenerate?: (image: string) => void;
  imagePosition?: {
    horizontal: number;
    vertical: number;
  };
  setImagePosition?: ({
    horizontal,
    vertical,
  }: {
    horizontal: number;
    vertical: number;
  }) => void;
}

const ImageFieldContainer: React.FC<ImageFieldContainerProps> = ({
  initialValue = null,
  regenerateOptions = ["Option1", "Option2"],
  initialImageGenerationType = "",
  isSwitchable = true,
  initialSwitchChecked = false,
  onImageSet = (url) => console.log("Image set:", url),
  onSwitchChange = (checked) => console.log("Switch changed:", checked),
  onRegenerate = (image) => console.log("regenerate"),
  imagePosition = { horizontal: 0, vertical: 0 },
  setImagePosition = ({ horizontal, vertical }) =>
    console.log("values", horizontal, vertical),
}) => {
  const [imageValue, setImageValue] = useState<any>(initialValue);
  const [imageGenerationType, setImageGenerationType] = useState<string>(
    initialImageGenerationType,
  );
  const [switchChecked, setSwitchChecked] =
    useState<boolean>(initialSwitchChecked);

  return (
    <EditableFieldProvider
      type="image"
      value={imageValue}
      setValue={setImageValue}
      regenerateOptions={regenerateOptions}
      generationType={imageGenerationType}
      setGenerationType={setImageGenerationType}
      onValueChange={onImageSet}
      isSwitchable={isSwitchable}
      switchChecked={switchChecked}
      onSwitchChange={(checked) => {
        setSwitchChecked(checked);
        onSwitchChange(checked);
      }}
      onRegenerate={onRegenerate}
      setImagePosition={setImagePosition}
      imagePosition={imagePosition}
    >
      <EditableField />
    </EditableFieldProvider>
  );
};

export default ImageFieldContainer;
