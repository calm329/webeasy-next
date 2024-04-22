import { Spinner } from "@nextui-org/react";

export default function Loader({ text }: { text: string }) {
  return (
    <div className="flex items-center text-sm lowercase">
      <Spinner color="primary" size="sm" /> &nbsp; {text}
    </div>
  );
}
