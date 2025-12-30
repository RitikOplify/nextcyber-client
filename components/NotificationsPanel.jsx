export default function NotificationsPanel() {
  return (
    <div className="w-[748px] rounded-xl bg-g-600 mx-auto">
      <div className="p-5 border-b border-g-700 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-g-100 text-xl font-medium">Your Notifications</h2>
          <button className="text-sm font-medium text-dark-green underline">
            Mark all as read
          </button>
        </div>

        <div className="flex items-center gap-1 p-2 rounded-full bg-g-700 border border-g-500">
          <div className="flex items-center justify-center gap-2 flex-1 px-4 py-2 rounded-full bg-g-500">
            <span className="text-sm font-medium text-g-50">All</span>
            <span className="px-1.5 py-0.5 text-xs font-medium rounded bg-g-400 text-g-100">
              4
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 flex-1 px-4 py-2">
            <span className="text-sm font-medium text-g-200">Jobs</span>
            <span className="px-1.5 py-0.5 text-xs rounded bg-g-500 text-g-200">
              6
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 flex-1 px-4 py-2">
            <span className="text-sm font-medium text-g-200">Payments</span>
            <span className="px-1.5 py-0.5 text-xs rounded bg-g-500 text-g-200">
              2
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex gap-5 p-5 bg-g-700 rounded-lg shadow-[0_0_4px_#2F3031]">
          <div className="w-12 h-12 rounded bg-primary flex items-center justify-center text-basewhite font-bold shrink-0">
            M
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-g-100">
              Job Posted Successfully
            </p>
            <p className="text-sm text-g-200">
              Your job listing is live and visible to job seekers.{" "}
              <span className=" text-primary-2 underline cursor-pointer">
                JOB-ID
              </span>
            </p>
            <p className="text-xs text-g-300">July 16, 2024 | 09:23 PM</p>
          </div>
        </div>

        <div className="flex gap-5 p-5 bg-g-700 rounded-lg shadow-[0_0_4px_#2F3031]">
          <div className="w-12 h-12 rounded bg-primary flex items-center justify-center text-basewhite font-bold shrink-0">
            M
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-g-100">
              Job Posting Closed
            </p>
            <p className="text-sm text-g-200">
              Your job listing is live and visible to job seekers.{" "}
              <span className="text-primary-2 underline cursor-pointer">
                JOB-ID
              </span>
            </p>
            <p className="text-xs text-g-300">July 16, 2024 | 09:23 PM</p>
          </div>
        </div>

        <div className="flex gap-5 p-5 bg-g-700 rounded-lg shadow-[0_0_4px_#2F3031]">
          <div className="w-12 h-12 rounded-full bg-g-500 shrink-0" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-g-100">
              New Job Application Received
            </p>
            <p className="text-sm text-g-200">
              A candidate has applied for your job posting. Review the
              application in your Organization Dashboard.
            </p>
            <p className="text-xs text-g-300">July 15, 2024 | 11:47 AM</p>
          </div>
        </div>

        <div className="flex gap-5 p-5 bg-g-700 rounded-lg shadow-[0_0_4px_#2F3031]">
          <div className="w-12 h-12 rounded bg-g-500 flex items-center justify-center shrink-0">
            <span className="text-dark-green font-bold">$</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-g-100">Payment Reminder</p>
            <p className="text-sm text-g-200">
              Your monthly subscription payment is scheduled soon. Please be
              prepared to complete the payment.
            </p>
            <p className="text-xs text-g-300">July 15, 2024 | 11:47 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
