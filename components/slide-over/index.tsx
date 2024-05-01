import { useState } from "react"

function SlideOver (){
    const [open,setOpen] =  useState(true)
 return (
    <div className="relative z-10  " aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
  <div className="fixed inset-0"></div>

  <div className="fixed inset-0 overflow-hidden ">
    <div className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
        <div className={`pointer-events-auto w-screen max-w-md ${open?"translate-x-0":"translate-x-full"} transform transition ease-in-out duration-500 sm:duration-700`}>
          <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
            <div className="h-0 flex-1 overflow-y-auto">
              <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold leading-6 text-white" id="slide-over-title">New Project</h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button type="button" className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={()=>setOpen(false)}>
                      <span className="absolute -inset-2.5"></span>
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-1">
                  <p className="text-sm text-indigo-300">Get started by filling in the information below to create your new project.</p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                  <div className="space-y-6 pb-5 pt-6">
                    <div>
                      <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-900">Project name</label>
                      <div className="mt-2">
                        <input type="text" name="project-name" id="project-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                      <div className="mt-2">
                        <textarea id="description" name="description" rows={4} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                      <div className="mt-2">
                        <div className="flex space-x-2">
                          <a href="#" className="relative rounded-full hover:opacity-75">
                            <img className="inline-block h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Tom Cook"/>
                          </a>
                          <a href="#" className="relative rounded-full hover:opacity-75">
                            <img className="inline-block h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Whitney Francis"/>
                          </a>
                          <a href="#" className="relative rounded-full hover:opacity-75">
                            <img className="inline-block h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Leonard Krasner"/>
                          </a>
                          <a href="#" className="relative rounded-full hover:opacity-75">
                            <img className="inline-block h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Floyd Miles"/>
                          </a>
                          <a href="#" className="relative rounded-full hover:opacity-75">
                            <img className="inline-block h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Emily Selman"/>
                          </a>

                          <button type="button" className="relative inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span className="absolute -inset-2"></span>
                            <span className="sr-only">Add team member</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <fieldset>
                      <legend className="text-sm font-medium leading-6 text-gray-900">Privacy</legend>
                      <div className="mt-2 space-y-4">
                        <div className="relative flex items-start">
                          <div className="absolute flex h-6 items-center">
                            <input id="privacy-public" name="privacy" aria-describedby="privacy-public-description" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" checked/>
                          </div>
                          <div className="pl-7 text-sm leading-6">
                            <label htmlFor="privacy-public" className="font-medium text-gray-900">Public access</label>
                            <p id="privacy-public-description" className="text-gray-500">Everyone with the link will see this project.</p>
                          </div>
                        </div>
                        <div>
                          <div className="relative flex items-start">
                            <div className="absolute flex h-6 items-center">
                              <input id="privacy-private-to-project" name="privacy" aria-describedby="privacy-private-to-project-description" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                            </div>
                            <div className="pl-7 text-sm leading-6">
                              <label htmlFor="privacy-private-to-project" className="font-medium text-gray-900">Private to project members</label>
                              <p id="privacy-private-to-project-description" className="text-gray-500">Only members of this project would be able to access.</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="relative flex items-start">
                            <div className="absolute flex h-6 items-center">
                              <input id="privacy-private" name="privacy" aria-describedby="privacy-private-to-project-description" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                            </div>
                            <div className="pl-7 text-sm leading-6">
                              <label htmlFor="privacy-private" className="font-medium text-gray-900">Private to you</label>
                              <p id="privacy-private-description" className="text-gray-500">You are the only one able to access this project.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div className="pb-6 pt-4">
                    <div className="flex text-sm">
                      <a href="#" className="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900">
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                          <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                        </svg>
                        <span className="ml-2">Copy link</span>
                      </a>
                    </div>
                    <div className="mt-4 flex text-sm">
                      <a href="#" className="group inline-flex items-center text-gray-500 hover:text-gray-900">
                        <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                        <span className="ml-2">Learn more about sharing</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="flex flex-shrink-0 justify-end px-4 py-4">
              <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
 )
}

export default SlideOver