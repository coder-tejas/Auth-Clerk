import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/clerk-react";
import { SignUpSchema, type SignUpFormData } from "../lib/schema";
import { Link } from "react-router-dom";

type OAuthStrategy = "oauth_google" | "oauth_apple" | "oauth_facebook";

const Signup = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      role: "Tenant",
    },
  });

  const { signUp } = useSignUp();

  const onSubmit = async (data: SignUpFormData) => {
    try {
      if (!signUp) return;

      const result = await signUp.create({
        emailAddress: data.email,
        phoneNumber: data.phoneNumber,
        firstName: data.name,
        unsafeMetadata: {
          role: data.role, // Custom data
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      console.log("User created successfully:", result);
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy): Promise<void> => {
    try {
      if (!signUp) return;

      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("OAuth error:", err instanceof Error ? err.message : err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          100<span className="text-red-500">Acres</span>
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Welcome! Please sign up to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="tel"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}

          <div className="space-y-2">
            <p className="font-medium">Role</p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Tenant"
                  {...register("role")}
                />
                Tenant
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Manager"
                  {...register("role")}
                />
                Manager
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <div className="mt-6 flex justify-between space-x-3">
            <button
              type="button"
              onClick={() => handleOAuth("oauth_google")}
              className="w-full py-3 bg-white border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-100"
            >
              <img src="/google-logo.png" alt="Google" className="w-7 h-7 mr-2" />
            </button>

            <button
              type="button"
              onClick={() => handleOAuth("oauth_apple")}
              className="w-full py-3 bg-black text-white rounded-md flex items-center justify-center hover:opacity-90"
            >
              <img src="/apple.png" alt="Apple" className="w-5 h-5 mr-2" />
            </button>

            <button
              type="button"
              onClick={() => handleOAuth("oauth_facebook")}
              className="w-full py-3 bg-[#1877F2] text-white rounded-md flex items-center justify-center hover:bg-[#165fd7]"
            >
              <img src="/facebook.png" alt="Facebook" className="w-5 h-5 mr-2" />
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            <Link to={"/api/auth/login"}>Login</Link>
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
