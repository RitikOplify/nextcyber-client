"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, ArrowRight, Star, Briefcase, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { BiLogoLinkedinSquare } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";

const NextCyberAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("recruiter");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    router.push("/");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
    setShowPassword(false);
  };

  return (
    <section className="bg-[#07080A] ">
      <div className="min-h-screen flex max-w-[1440px] mx-auto">
        {/* Left Panel - Form */}
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-full max-w-sm space-y-7.5">
            {/* Logo */}

            <Image
              src="/logo.png"
              className=" h-9 w-auto mb-7.5"
              height={72}
              width={329}
              alt="nextcybr-logo"
            />

            {/* Form Header */}
            <div className="space-y-1 mb-7.5">
              <h1 className="text-[#9C9C9D] text-3xl font-medium leading-tight">
                {isLogin
                  ? "Sign In with your\nsocial account"
                  : "Create an account"}
              </h1>
              {!isLogin && (
                <p className="text-[#6A6B6C] text-sm">
                  Please enter your details here.
                </p>
              )}
            </div>

            {/* Role Toggle Buttons (Sign Up only) */}
            {!isLogin && (
              <div className="flex gap-4 mb-10">
                <button
                  onClick={() => setSelectedRole("recruiter")}
                  className={`flex-1 py-2 px-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    selectedRole === "recruiter"
                      ? "bg-[#025BCF] text-[#E6E6E6]"
                      : "bg-[#1B1C1E] text-[#9C9C9D]"
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  Recruiter
                </button>
                <button
                  onClick={() => setSelectedRole("candidate")}
                  className={`flex-1 py-2 px-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    selectedRole === "candidate"
                      ? "bg-[#025BCF] text-[#E6E6E6]"
                      : "bg-[#1B1C1E] text-[#9C9C9D]"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Candidate
                </button>
              </div>
            )}

            {/* Social Login Buttons (Login only) */}
            {isLogin && (
              <div className="space-y-7.5 mb-7.5">
                <div className="flex gap-4">
                  <button className="flex-1 bg-[#1B1C1E] text-[#9C9C9D] py-2 px-4 border border-[#2F3031] rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                    <FaLinkedin size={20} className="text-white" />
                    LinkedIn
                  </button>
                  <button className="flex-1 bg-[#1B1C1E] text-[#9C9C9D] py-2 px-4 border border-[#2F3031] rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                    <FcGoogle size={20} />
                    Google
                  </button>
                </div>

                <div className="text-start">
                  <p className="text-[#9C9C9D] text-sm">
                    Or Sign In with Email
                  </p>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      type="text"
                      placeholder="First name"
                      className="w-full bg-[#111214] border border-[#1B1C1E] rounded-lg px-5 py-4 text-white outline-none text-sm"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      {...register("lastName", {
                        required: "Last name is required",
                      })}
                      type="text"
                      placeholder="Last name"
                      className="w-full bg-[#111214] border border-[#1B1C1E] rounded-lg px-5 py-4 text-white outline-none text-sm"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder={isLogin ? "Email" : "Professional email"}
                  className="w-full bg-[#111214] border border-[#1B1C1E] rounded-lg px-5 py-4 text-white outline-none text-sm"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full bg-[#111214] border border-[#1B1C1E] rounded-lg px-5 py-4 text-white outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-[#025BCF] text-white py-3 px-6 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors mt-6"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Footer */}
            <div className="text-start space-y-1.5">
              <p className="text-[#6A6B6C] text-sm">
                {isLogin ? "Don't have an account? " : "Have an account? "}
                <button
                  onClick={toggleMode}
                  className="text-[#9C9C9D] font-medium cursor-pointer"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
              {!isLogin && (
                <p className="text-xs text-[#6A6B6C] leading-relaxed">
                  By proceeding, you agree to our{" "}
                  <a href="#" className="text-[#9C9C9D]">
                    Terms & Privacy Policy
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Testimonial */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="w-lg mx-auto space-y-10">
            {/* Header */}
            <div className="space-y-6 text-start">
              <h2 className="text-2xl  font-bold text-[#69EDFE] leading-tight max-w-sm">
                The World&apos;s ⚡ Leading Platform for Cyber Professionals
              </h2>
              <div
                className="inline-blockborder w-fit border-transparent bg-gradient-to-r from-[#111214] to-[#2F3031] bg-clip-border
 text-[#69EDFE] px-3 py-2 rounded-full text-sm font-medium"
              >
                #1 Highest Rated Hiring Agency in New Zealand
              </div>
            </div>

            {/* Background content that shows behind card */}
            <div className="relative bg-[#111214]  rounded-[10px]  overflow-hidden">
              {/* Background text content */}
              <div className="absolute inset-0 p-10 text-white blur-[0.8px] text-sm text-right leading-relaxed z-0 pt-19">
                <p className=" pr-4 text-lg text-[#6A6B6C]">er Google</p>
                <div className=" pt-28">
                  <p className=" pr-3.5">ad a reason</p>
                  <p className=" pr-10.5">d in the</p>
                  <p>e engagement</p>
                </div>
              </div>

              {/* Testimonial Card - positioned to partially cover background */}
              <div className="bg-[#111214] rounded-[10px] p-10 text-white relative z-10 border border-[#434345] max-w-sm">
                {/* Profile Section */}
                <div className="flex items-center gap-5 mb-15">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JB</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium text-base">
                      Jcob B.
                    </h3>
                    <p className="text-[#9C9C9D] mt-1 text-sm">
                      HR Manager Google
                    </p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-8 h-8 fill-[#D9A61C] text-[#D9A61C]"
                    />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-white text-sm leading-relaxed">
                  &quot;What impressed me most was their strategic approach.
                  Every design choice had a reason behind it&quot;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextCyberAuth;
