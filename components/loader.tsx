import { ImSpinner2 } from "react-icons/im";

export default function Loader({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center lowercase">
      <ImSpinner2 className="animate-spin text-lg text-indigo-600" /> &nbsp;{" "}
      {text}
    </div>
  );
}
