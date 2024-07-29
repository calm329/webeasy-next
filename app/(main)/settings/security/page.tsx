import SecurityForm from "@/components/ui/form/security-form";

export default function Security() {
  return (
    <main className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow">
      <div className="mx-auto max-w-2xl space-y-16 max-lg:m-0 max-lg:max-w-full sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Security
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This information is confidential so please don&apos;t share it.
          </p>
          <SecurityForm />
        </div>
      </div>
    </main>
  );
}
