import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validateRegister from "../../utils/validators";

export default function Register() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
    // console.log(input);
  };

  const hdlRegister = async (e) => {
    // console.log(input.password, input.confirmPassword)

    e.preventDefault();

    // console.log(input)
    // validation
    const error = validateRegister(input);

    if (error) {
      return setFormErrors(error);
    }
    setFormErrors({})

      try {
      const result = await axios.post(
        "http://localhost:5588/register",
        input
      );
      // console.log(result.data)
      setInput({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
      })
      e.target.closest("dialog").close()
      toast.success("Welcome new user")
    } catch (err) {
      if (err.response) {
        const errMsg = err.response.data.error || err.response.data.message || "Something went wrong!";
        toast.error(errMsg);
      } else {
        toast.error("Network error or server not responding");
      }
      // const errMsg = err.response?.data?.error || err.message;
      // console.log(errMsg)
      // toast.error(errMsg)
    }
  };

  return (
    <form onSubmit={hdlRegister} className="flex flex-col gap-3 p-4 pt-10">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="First name"
          className="input input-bordered w-full"
          name="firstName"
          value={input.firstName}
          onChange={hdlChange}
        />
        {formErrors.firstName && (
          <span className="text-red-500 text-xs">{formErrors.firstName}</span>
        )}
        <input
          type="text"
          placeholder="Surname"
          className="input input-bordered w-full"
          name="lastName"
          value={input.lastName}
          onChange={hdlChange}
        />
        {formErrors.lastName && (
          <span className="text-red-500 text-xs">{formErrors.lastName}</span>
        )}
      </div>
      <input
        type="text"
        placeholder="Email"
        className="input input-bordered w-full"
        name="email"
        value={input.email}
        onChange={hdlChange}
      />
      {formErrors.email && (
        <span className="text-red-500 text-xs">{formErrors.email}</span>
      )}
      <input
        type="password"
        placeholder="New password"
        className="input input-bordered w-full"
        name="password"
        value={input.password}
        onChange={hdlChange}
      />
      {formErrors.password && (
        <span className="text-red-500 text-xs">{formErrors.password}</span>
      )}
      <input
        type="password"
        placeholder="Confirm password"
        className="input input-bordered w-full"
        name="confirmPassword"
        value={input.confirmPassword}
        onChange={hdlChange}
      />
      {formErrors.confirmPassword && (
        <span className="text-red-500 text-xs">
          {formErrors.confirmPassword}
        </span>
      )}
      <button className="btn btn-secondary text-xl text-white">Sign up</button>
    </form>
  );
}
