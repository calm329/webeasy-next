import Profileform from "@/components/ui/form/profile-form";
export default function General() {
  return (
    <main className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow">
      <div className="mt-1">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Profile
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-500">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <div className="mr-8 mt-1">
        <Profileform />
      </div>
    </main>
  );
}
