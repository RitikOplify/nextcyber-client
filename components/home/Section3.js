import React from "react";

const ClientReviewsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Smith",
      position: "HR Manager Bank Central",
      avatar: "/avatar.jpeg",
      rating: 5,
      review:
        "The team took time to our vision and understand translated it into a design that feels intentional, and completely authentic.",
    },
    {
      id: 2,
      name: "Jcob B.",
      position: "HR Manager Google",
      avatar: "/avatar.jpeg",

      rating: 5,
      review:
        "What impressed me most was their strategic approach. Every design choice had a reason behind it.",
    },
    {
      id: 3,
      name: "Sahar N",
      position: "HR Manager",
      avatar: "/avatar.jpeg",

      rating: 5,
      review:
        "Every design choice had a reason behind it, and it showed in the results. We've had more than ever before!",
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? "text-yellow-400 fill-current" : "text-gray-600"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black py-20 ">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20">
          <div>
            <h2 className="text-[#CDCECE] text-2xl lg:text-3xl font-semibold">
              4.5/5 client review
            </h2>
          </div>
          <div className="text-right text-[#69EDFE]">
            <h3 className=" text-xl lg:text-2xl font-medium">
              Thousands of Satisfied
            </h3>
            <h3 className=" text-xl lg:text-2xl font-medium">
              Clients and Jobseekers
            </h3>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Rating Card */}
          <div className="bg-[#1B1C1E] rounded-[10px] p-10">
            <div className="text-start">
              <div className="text-6xl font-bold text-white mb-4">4.5</div>
              <div className="text-gray-400 text-sm mb-15">
                Client Satisfaction Rate
              </div>
              <div className="text-white text-xl font-medium">
                Trusted by clients worldwide
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#1B1C1E] rounded-[10px] p-10"
            >
              {/* User Info */}
              <div className="flex items-center gap-5 mb-15">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-white font-medium text-sm mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#6A6B6C] text-xs whitespace-nowrap">
                    {testimonial.position}
                  </p>
                </div>
              </div>

              {/* Star Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Review Text */}
              <p className="text-gray-300 text-sm mt-5 leading-relaxed">
                &quot;{testimonial.review}&quot;
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientReviewsSection;
