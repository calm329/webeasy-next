import WebsitesForm from "@/components/ui/form/websites-form";

export default function MyWebsites() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
      <div className="mx-auto max-w-2xl space-y-16 max-lg:m-0 max-lg:max-w-full sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            My Websites
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This contains all the information about your websites.
          </p>
          <WebsitesForm />
        </div>
      </div>
    </main>
  );
}
