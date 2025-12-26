import { Input } from "@/components/ui/Input";
import { SaveButton } from "@/components/ui/SaveButton";

export default function CompanyDetails() {
  return (
    <div className="max-w-5xl mx-auto mt-10 flex flex-col gap-y-10">
      <div>
        <h2 className="text-xl font-semibold text-g-100 leading-6 mb-7.5">
          General
        </h2>

        <div className="grid grid-cols-2 gap-x-5 gap-y-7.5">
          <Input label="Company Name" placeholder="Enter company name" />
          <Input label="Company Email" placeholder="Enter company email" />
          <Input
            label="Company Website Link"
            placeholder="Enter website link"
          />
          <Input label="Headquarters" placeholder="Enter location" />
          <Input label="Founded" placeholder="Year" />
          <Input label="Company Size" placeholder="Select your company size" />
          <Input label="Industry" placeholder="Industry" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-g-100 leading-6 mb-7.5">
          Social
        </h2>

        <div className="grid grid-cols-2 gap-x-5 gap-y-7.5">
          <Input label="Facebook URL" placeholder="Enter Facebook URL" />
          <Input label="LinkedIn URL" placeholder="Enter LinkedIn URL" />
          <Input label="X URL" placeholder="Enter X URL" />
          <Input label="Instagram URL" placeholder="Enter Instagram URL" />
          <Input label="Glassdoor URL" placeholder="Enter Glassdoor URL" />
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  );
}
