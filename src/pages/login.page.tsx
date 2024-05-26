import apiService from "@/services/api.service";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { StatusCodes } from "http-status-codes";

type LoginPageProps = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginPageProps>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginPageProps> = async (data) => {
    const response = await apiService.login(data.email, data.password);

    if (response.status !== StatusCodes.OK) {
      const result = response.data;
      console.log("login.page", "result", result);
      setError("email", { type: "manual", message: result.detail });
      setError("password", { type: "manual", message: result.detail });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="p-6 bg-white rounded shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-4 text-2xl">Login</h2>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            Email
          </label>
          <input
            className={`input input-bordered w-full ${
              errors.email ? "input-error" : ""
            }`}
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="mt-1 text-error">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-1" htmlFor="password">
            Password
          </label>
          <input
            className={`input input-bordered w-full ${
              errors.password ? "input-error" : ""
            }`}
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="mt-1 text-error">{errors.password.message}</p>
          )}
        </div>

        <button className="w-full btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
