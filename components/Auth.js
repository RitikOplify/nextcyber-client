"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Star,
  Briefcase,
  User,
  Loader2,
  Loader,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { asyncSigninUser, asyncSignupUser } from "@/store/actions/authActions";
import Link from "next/link";

const hasUpper = (s) => /[A-Z]/.test(s);
const hasLower = (s) => /[a-z]/.test(s);
const hasDigit = (s) => /[0-9]/.test(s);
const hasSpecial = (s) => /[!@#$%^&*(),.?":{}|<>]/.test(s);

const COMMON_PASSWORDS = [
  "password",
  "12345678",
  "qwerty",
  "letmein",
  "admin",
  "welcome",
  "iloveyou",
];

const isCommonPassword = (s) => COMMON_PASSWORDS.includes(s.toLowerCase());

const hasRepeatedChars = (s) => /(.)\1\1\1/.test(s); // 4 or more repeated chars

const hasSequentialChars = (s) => {
  const sequences = "abcdefghijklmnopqrstuvwxyz0123456789";
  const lower = s.toLowerCase();
  for (let i = 0; i < lower.length - 3; i++) {
    const sub = lower.slice(i, i + 4);
    if (sequences.includes(sub)) return true;
    if (sequences.split("").reverse().join("").includes(sub)) return true;
  }
  return false;
};

const NextCyberAuth = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("candidate");
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const user = {
      ...data,
      role: selectedRole,
    };

    if (isLogin) {
      dispatch(asyncSigninUser(user, setLoading, router));
    } else {
      dispatch(asyncSignupUser(user, setLoading, router));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
    setShowPassword(false);
  };

  const validatePassword = (password) => {
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (password.length > 100) return "Password is too long.";
    if (!hasUpper(password))
      return "Password must include at least one uppercase letter.";
    if (!hasLower(password))
      return "Password must include at least one lowercase letter.";
    if (!hasDigit(password))
      return "Password must include at least one number.";
    if (!hasSpecial(password))
      return "Password must include at least one special character.";
    if (isCommonPassword(password)) return "Password is too common.";
    if (hasRepeatedChars(password))
      return "Password must not contain 4 or more repeated characters.";
    if (hasSequentialChars(password))
      return "Password must not contain sequential characters like '1234' or 'abcd'.";
    return true; // valid
  };

  return (
    <section className="bg-g-900 py-20 sm:py-0">
      <div className="min-h-screen flex max-w-[1440px] mx-auto">
        <div className=" w-full lg:w-1/2 flex items-center justify-center px-5 sm:px-10">
          <div className="w-full max-w-sm space-y-7.5">
            <Image
              src="/logo.png"
              className=" h-9 w-auto mb-7.5"
              height={72}
              width={329}
              alt="nextcybr-logo"
            />

            <div className="space-y-1 mb-7.5">
              <h1 className="text-g-200 text-3xl font-medium leading-tight">
                {isLogin
                  ? "Sign In with your\nsocial account"
                  : "Create an account"}
              </h1>
              {!isLogin && (
                <p className="text-g-300 text-sm">
                  Please enter your details here.
                </p>
              )}
            </div>

            {
              <div
                className={`flex gap-4 ${
                  selectedRole == "candidate" ? "mb-5" : "mb-10"
                }`}
              >
                <button
                  onClick={() => setSelectedRole("recruiter")}
                  className={`flex-1 py-2 px-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    selectedRole === "recruiter"
                      ? "bg-primary text-g-50"
                      : "bg-g-600 text-g-500"
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  Recruiter
                </button>
                <button
                  onClick={() => setSelectedRole("candidate")}
                  className={`flex-1 py-2 px-4 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    selectedRole === "candidate"
                      ? "bg-primary text-g-50"
                      : "bg-g-600 text-g-500"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Candidate
                </button>
              </div>
            }

            {/* Social Login Buttons (Login only) */}
            {selectedRole == "candidate" && (
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
                    Or {isLogin ? "Sign In" : "Sign Up"} with Email
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
              <div className="relative">
                <input
                  {...register("password", { validate: validatePassword })}
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
              <div className=" text-end text-g-200 font-medium text-xs leading-4 cursor-pointer">
                <Link
                  href={"/forgot-password"}
                  className=" border-b border-dotted"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className="w-full disabled:bg-primary/50 disabled:text-g-200 bg-primary text-white py-3 px-6 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors mt-6"
            >
              {loading && (
                <Loader2 className=" animate-spin text-g-200" size={18} />
              )}
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
        <div className="w-1/2 pr-10 lg:flex hidden flex-col justify-center items-start">
          <div className="min-w-lg space-y-10">
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
            <div className="relative bg-[#111214] w-[93%] xl:w-full  rounded-[10px]  overflow-hidden">
              {/* Background text content */}
              <div className="absolute inset-0 p-10 text-white blur-[0.8px] text-right text-sm leading-relaxed z-0 pt-19">
                <p className="text-lg text-[#6A6B6C]">HR Manager Google</p>
                <div className=" pt-28">
                  <p>ad a reason</p>
                  <p>d in the</p>
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
