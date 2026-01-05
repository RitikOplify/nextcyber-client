import { MapPin, Users, ArrowUpRight, Globe } from "lucide-react";
import Image from "next/image";

const CompanyCard = ({ company }) => {
  return (
    <div className="w-full max-w-md bg-g-700 rounded-[10px] overflow-hidden shadow-2xl p-4 border border-g-500">
      <div className="h-28 bg-gradient-to-br from-yellow-100 via-green-50 to-emerald-100 rounded-[10px]"></div>

      <div className="px-5 -mt-10">
        {company?.profilePicture?.url ? (
          <Image
            src={company?.profilePicture?.url}
            alt={`${company?.companyName} logo`}
            width={64}
            height={64}
            className="rounded-[10px] border-2 border-yellow-500"
          />
        ) : (
          <div className="w-16 h-16 bg-black rounded-[10px] border-2 border-yellow-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">dyson</span>
          </div>
        )}
      </div>

      <div className="pt-3">
        <h2 className="text-white text-xl font-semibold mb-3">
          {company?.companyName}
        </h2>

        <p className="text-g-100 text-sm mb-3">
          Tagline will come here (max 2 lines)
        </p>

        <p className="text-g-100 text-sm leading-relaxed mb-4">
          Google LLC is an American multinational technology corporation focused
          on information technology, online advertising...
        </p>

        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-g-100 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Texas, USA</span>
          </div>
          <div className="flex items-center gap-1.5 text-g-100 text-sm">
            <Users className="w-4 h-4" />
            <span>5000+</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-primary text-white font-medium py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <span>124 Open Jobs</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="bg-primary text-white p-3.5 rounded-lg transition-colors cursor-pointer">
            <Globe className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
