import DomainForm from "@/components/ui/form/domain-form";
export default function Domain() {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          My Domain
        </h2>
      </div>
      <DomainForm />
    </div>
  );
}
