import type { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput, signinInput, type SingupInput } from "@anukiranghosh/inknest-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ZodError } from "zod";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SingupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [error, setError] = useState<string | null>(null);

  async function sendRequest() {
    setError(null);

    try {
      if (type === "signup") {
        signupInput.parse(postInputs); // throws if invalid
      } else {
        signinInput.parse({
          email: postInputs.email,
          password: postInputs.password,
        });
      }

      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      if (e instanceof ZodError) {
        setError(e.errors[0]?.message || "Validation failed");
      } else {
        setError("Something went wrong");
      }
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              {type === "signin" ? "Log in to your account" : "Create an account"}
            </div>
            <div className="text-slate-500 text-center">
              {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link className="pl-2 underline" to={type === "signin" ? "/signup" : "/signin"}>
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="pt-8">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Tirtha Sarkar"
                onChange={(e) => {
                  const value = e.target.value;
                  const updatedInputs = { ...postInputs, name: value };
                  setPostInputs(updatedInputs);

                  const schema = type === "signup" ? signupInput : signinInput;
                  const result = schema.safeParse(updatedInputs);

                if (!result.success) {
                    const fieldError = (result.error.formErrors.fieldErrors as { name?: string[] }).name?.[0];
                    setErrors(prev => ({ ...prev, name: fieldError || "" }));
                } else {
                    setErrors(prev => ({ ...prev, name: "" }));
                }

                }}
                error={errors.name}
              />
            ) : null}
            <LabelledInput
              label="Email"
              placeholder="tirtha@gmail.com"
              onChange={(e) => {
                const value = e.target.value;
                const updatedInputs = { ...postInputs, email: value };
                setPostInputs(updatedInputs);

                const schema = type === "signup" ? signupInput : signinInput;
                const result = schema.safeParse(updatedInputs);

                if (!result.success) {
                  const fieldError = result.error.formErrors.fieldErrors.email?.[0];
                  setErrors((prev) => ({ ...prev, email: fieldError || "" }));
                } else {
                  setErrors((prev) => ({ ...prev, email: "" }));
                }
              }}
              error={errors.email}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="******"
              onChange={(e) => {
                const value = e.target.value;
                const updatedInputs = { ...postInputs, password: value };
                setPostInputs(updatedInputs);

                const schema = type === "signup" ? signupInput : signinInput;
                const result = schema.safeParse(updatedInputs);

                if (!result.success) {
                  const fieldError = result.error.formErrors.fieldErrors.password?.[0];
                  setErrors((prev) => ({ ...prev, password: fieldError || "" }));
                } else {
                  setErrors((prev) => ({ ...prev, password: "" }));
                }
              }}
              error={errors.password}
            />
            {error && <div className="text-red-500 pt-2">{error}</div>}
            <button
              onClick={sendRequest}
              type="button"
              className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string; // ✅ new prop
}

function LabelledInput({ label, placeholder, onChange, type, error }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-900 font-semibold pt-4">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
      {/* ✅ Show inline error */}
      {error && <p className="text-red-500 text-sm pt-1">{error}</p>}
    </div>
  );
}
