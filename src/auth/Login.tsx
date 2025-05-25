import { useSignIn } from "@clerk/clerk-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../lib/schema";
import { useState } from "react";

type OAuthStrategy = "oauth_google" | "oauth_apple" | "oauth_facebook";

export default function LoginForm() {
  const [usePhone, setUsePhone] = useState(true);
  const { signIn } = useSignIn();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      method: "phone",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (!signIn) return;

      if (data.method === "email" && data.email) {
        await signIn.create({ identifier: data.email });
      } else if (data.method === "phone" && data.phone) {
        await signIn.create({ identifier: data.phone });
      }

      // Redirect after login, handle accordingly
    } catch (err) {
      console.error("Log-in error:", err);
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    if (!signIn) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("OAuth error:", err instanceof Error ? err.message : err);
    }
  };

  const selectedMethod = watch("method");

  return (
    <div className="w-full max-w-md mx-auto mt-20 bg-white shadow-xl rounded-xl p-8">
      <h1 className="text-3xl font-bold text-center text-[#2563eb] mb-1">
        100<span className="text-[#ef4444]">Acres</span>
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Welcome back! Please log in to continue
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="hidden"
          {...register("method")}
          value={usePhone ? "phone" : "email"}
        />

        {usePhone ? (
          <>
            <label className="block text-gray-800 font-medium mb-1">
              Phone number
              <span
                onClick={() => setUsePhone(false)}
                className="float-right text-[#6366f1] cursor-pointer text-sm"
              >
                Use email or username
              </span>
            </label>
            <input
              type="tel"
              placeholder="+91 Enter your phone number"
              {...register("phone")}
              className="w-full p-3 border border-gray-300 rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </>
        ) : (
          <>
            <label className="block text-gray-800 font-medium mb-1">
              Email address or username
              <span
                onClick={() => setUsePhone(true)}
                className="float-right text-[#6366f1] cursor-pointer text-sm"
              >
                Use phone
              </span>
            </label>
            <input
              type="email"
              placeholder="Enter email or username"
              {...register("email")}
              className="w-full p-3 border border-gray-300 rounded-md mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </>
        )}

        <button
          type="submit"
          className="w-full bg-[#2563eb] text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          Continue
        </button>
      </form>

      {/* OAUTH BUTTONS */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <button
          onClick={() => handleOAuth("oauth_google")}
          className="py-3 bg-white border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
        >
          <img src="/google-logo.png" alt="Google" className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleOAuth("oauth_apple")}
          className="py-3 bg-black text-white rounded-md flex items-center justify-center hover:opacity-90"
        >
          <img src="/apple.png" alt="Apple" className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleOAuth("oauth_facebook")}
          className="py-3 bg-[#1877F2] text-white rounded-md flex items-center justify-center hover:bg-[#165fd7]"
        >
          <img src="/facebook.png" alt="Facebook" className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-sm mt-4">
        Don&apos;t have an account?{" "}
        <a href="/signup" className="text-[#2563eb] hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
