import getUserData from "@/lib/actions/getUserData";

export default async function SiteHomePage({
  params,
}: {
  params: { domain: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const { success, data } = await getUserData(domain);

  if (!success || !data) {
    return (
      <div>
        <h1>Domain: {domain}</h1>
        <h2>Not Found</h2>
      </div>
    );
  }

  let posts = JSON.parse(data?.posts || "[]");
  let aiResult = JSON.parse(data?.aiResult || "{}");

  return (
    <div>
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between px-6 py-3.5 bg-gray-100 border border-gray-100 rounded-full">
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div
                  className="w-auto text-xl text-black-300 font-medium"
                  style={{ color: aiResult["colors"]["primary"] }}
                >
                  <a href="#">{aiResult["businessName"]}</a>
                </div>
              </div>
            </div>
            <div className="w-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-auto lg:block">
                  <div className="flex flex-wrap -m-2">
                    <div className="w-full md:w-auto p-2">
                      <a
                        className="block w-full px-4 py-2.5 text-sm text-center text-white font-bold bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-full"
                        style={{
                          backgroundColor: aiResult["colors"]["secondary"],
                        }}
                        href="#"
                      >
                        {aiResult["hero"]["cta"]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-10 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="py-16 px-8 bg-white rounded-3xl">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap -m-8 mb-10">
                <div className="w-full md:w-1/2 p-8">
                  <div className="md:max-w-lg">
                    <h2
                      className={`font-heading mb-6 text-4xl md:text-5xl text-gray-300 font-black tracking-tight`}
                      style={{ color: aiResult["colors"]["primary"] }}
                    >
                      {aiResult["hero"]["heading"]}
                    </h2>
                    <p className="mb-8 text-xl font-bold">
                      {aiResult["hero"]["subheading"]}
                    </p>
                    <div className="flex flex-wrap -m-2">
                      <div className="w-full md:w-auto p-2">
                        <a
                          className="block w-full px-8 py-3.5 text-lg text-center text-white font-bold bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 rounded-full"
                          style={{
                            backgroundColor: aiResult["colors"]["secondary"],
                          }}
                          href="#"
                        >
                          {aiResult["hero"]["cta"]}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 p-8">
                  <img
                    className="object-contain mx-auto md:mr-0 rounded-3xl"
                    width="256"
                    height="256"
                    src={aiResult["hero"]["imageUrl"]}
                    alt=""
                  />
                </div>
              </div>
              <div className="p-8 md:p-12 bg-gray-100 rounded-3xl">
                <div className="flex flex-wrap -m-8">
                  {aiResult["services"]["list"].map((service) => (
                    <div key={0} className="w-full md:w-1/3 p-8">
                      <div className="flex flex-wrap -m-3">
                        <div className="w-auto md:w-full lg:w-auto p-3">
                          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl">
                            <svg
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14 16C14 17.77 13.23 19.37 12 20.46C10.94 21.42 9.54 22 8 22C4.69 22 2 19.31 2 16C2 13.9753 3.01397 12.1814 4.5554 11.0973C4.80358 10.9228 5.1393 11.0422 5.27324 11.3145C6.21715 13.2332 7.95419 14.6699 10.02 15.23C10.65 15.41 11.31 15.5 12 15.5C12.4872 15.5 12.9539 15.4538 13.4074 15.3687C13.6958 15.3147 13.9828 15.4995 13.9955 15.7926C13.9985 15.8621 14 15.9314 14 16Z"
                                fill={aiResult["colors"]["primary"]}
                              />
                              <path
                                d="M18 8C18 8.78 17.85 9.53 17.58 10.21C16.89 11.95 15.41 13.29 13.58 13.79C13.08 13.93 12.55 14 12 14C11.45 14 10.92 13.93 10.42 13.79C8.59 13.29 7.11 11.95 6.42 10.21C6.15 9.53 6 8.78 6 8C6 4.69 8.69 2 12 2C15.31 2 18 4.69 18 8Z"
                                fill={aiResult["colors"]["primary"]}
                              />
                              <path
                                d="M22 16C22 19.31 19.31 22 16 22C15.2555 22 14.5393 21.8643 13.8811 21.6141C13.5624 21.4929 13.503 21.0851 13.7248 20.8262C14.8668 19.4938 15.5 17.786 15.5 16C15.5 15.66 15.47 15.32 15.42 15C15.3902 14.8155 15.4844 14.6342 15.6478 14.5437C16.9719 13.8107 18.0532 12.6876 18.727 11.3153C18.8609 11.0427 19.1968 10.923 19.4452 11.0978C20.9863 12.1818 22 13.9755 22 16Z"
                                fill={aiResult["colors"]["primary"]}
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 p-3">
                          <h3 className="font-heading mb-2 text-xl text-gray-900 font-black">
                            {service["name"]}
                          </h3>
                          <p className="text-sm text-gray-700 font-bold">
                            {service["description"]}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*<p className="text-base font-semibold leading-7 text-indigo-600">WebEasy.AI</p>
      <div className="mx-auto max-w-2xl text-base leading-7 text-gray-700" dangerouslySetInnerHTML={{ __html: aiContent }} />*/}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Posts</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {posts.map((post) => (
            <a key={post.id} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                {post.media_type === "VIDEO" ? (
                  <video
                    src={post.media_url}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={post.media_url}
                    alt={post.caption}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                )}
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{post.caption}</h3>
              <p className="mt-1 text-xs font-medium text-gray-900">
                {post.timestamp}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
