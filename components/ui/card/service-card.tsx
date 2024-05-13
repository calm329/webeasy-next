import { ServiceIcon } from "../../icons";

type ServiceCardProps = {
  name: string;
  description: string;
  color: string;
};

export default function ServiceCard(props: ServiceCardProps) {
  const { name, description, color } = props;
  return (
    <div className="w-full p-8 md:w-1/3">
      <div className="-m-3 flex flex-wrap">
        <div className="w-auto p-3 md:w-full lg:w-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
            <ServiceIcon color={color} size={24} />
          </div>
        </div>
        <div className="flex-1 p-3">
          <h3 className="font-heading mb-2 text-xl font-black text-gray-900">
            {name}
          </h3>
          <p className="text-sm font-bold text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
