"use client";

import Link from "next/link";
import { Button } from "../button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const Login = () => {
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputs = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: formInput.email,
        password: formInput.password,
        redirect: false,
      });

      if (res.error) {
        // Handle authentication error
        toast.error(res.error);
      } else {
        // Handle successful authentication
        toast.success("Login successful!");
        router.push("/dashboard");
      }
      setLoading(false);
    } catch (error) {
     if (error.message === "Incorrect password!") {
       toast.error("Incorrect password!");
     } else {
       toast.error("An errort occurred. Please try again.");
     }
      setLoading(false);
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
      <label
        htmlFor="email-address-icon"
        className="block mb-1 text-xs font-normal text-dark"
      >
        Your Email
      </label>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z"
              fill="#737373"
            />
          </svg>
        </div>
        <input
          type="email"
          className="bg-gray-50 border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary block w-full ps-10 p-2.5 text-sm text-grey"
          placeholder="e.g. alex@email.com"
          onChange={handleInputs}
          name="email"
        />
      </div>

      {/* password */}
      <label
        htmlFor="email-address-icon"
        className="block mb-1 text-xs font-normal text-dark"
      >
        Password
      </label>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 5H11V3.5C11 2.70435 10.6839 1.94129 10.1213 1.37868C9.55871 0.81607 8.79565 0.5 8 0.5C7.20435 0.5 6.44129 0.81607 5.87868 1.37868C5.31607 1.94129 5 2.70435 5 3.5V5H3C2.73478 5 2.48043 5.10536 2.29289 5.29289C2.10536 5.48043 2 5.73478 2 6V13C2 13.2652 2.10536 13.5196 2.29289 13.7071C2.48043 13.8946 2.73478 14 3 14H13C13.2652 14 13.5196 13.8946 13.7071 13.7071C13.8946 13.5196 14 13.2652 14 13V6C14 5.73478 13.8946 5.48043 13.7071 5.29289C13.5196 5.10536 13.2652 5 13 5ZM8.5 9.91438V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V9.91438C7.16639 9.79643 6.88522 9.56434 6.70618 9.25914C6.52715 8.95393 6.46177 8.59526 6.5216 8.24651C6.58144 7.89776 6.76264 7.58139 7.03317 7.35332C7.3037 7.12525 7.64616 7.00016 8 7.00016C8.35384 7.00016 8.6963 7.12525 8.96683 7.35332C9.23736 7.58139 9.41856 7.89776 9.4784 8.24651C9.53823 8.59526 9.47285 8.95393 9.29382 9.25914C9.11478 9.56434 8.83361 9.79643 8.5 9.91438ZM10 5H6V3.5C6 2.96957 6.21071 2.46086 6.58579 2.08579C6.96086 1.71071 7.46957 1.5 8 1.5C8.53043 1.5 9.03914 1.71071 9.41421 2.08579C9.78929 2.46086 10 2.96957 10 3.5V5Z"
              fill="#737373"
            />
          </svg>
        </div>
        <input
          type="password"
          className="bg-gray-50 border border-lightGrey rounded-lg focus:ring-primary focus:border-primary focus:outline-primary block w-full ps-10 p-2.5 text-sm text-grey"
          placeholder="Enter your password"
          onChange={handleInputs}
          name="password"
        />
      </div>

      {/* button */}
      <Button
        variant="default"
        size="default"
        className="w-full"
        disabled={loading}
      >
        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Login"}
      </Button>

      <span className="block text-sm font-normal text-grey text-center mt-3">
        Don’t have an account?{" "}
        <Link href={"/register"} className="text-primary font-semibold">
          Create account
        </Link>
      </span>
    </form>
  );
};

export default Login;
