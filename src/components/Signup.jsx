import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import { fnRegisterUser } from "@/services/apiAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "", // added username
    email: "",
    password: "",
    profile_pic: null,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSignup = async () => {
    setErrors({});
    setApiError("");
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is Required"),
        username: Yup.string().min(3, "Username must be at least 3 chars").required("Username is required"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 chars")
          .required("Password is required"),
        profile_pic: Yup.mixed().required("Profile Pic is Required"),
      });

      await schema.validate(formData, { abortEarly: false });

      setLoading(true);
      const res = await fnRegisterUser(formData);

      console.log("Signup success:", res);
    } catch (error) {
      if (error.inner) {
        // Yup validation errors
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setApiError(error.message || "Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-100 max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven't already
        </CardDescription>
        {apiError && <p className="text-red-500">{apiError}</p>}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInput}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>
        <div className="space-y-1">
          <Input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleInput}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </div>
        <div className="space-y-1">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInput}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="space-y-1">
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInput}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="space-y-1">
          <Input
            type="file"
            name="profile_pic"
            accept="image/*"
            onChange={handleInput}
          />
          {errors.profile_pic && <p className="text-red-500">{errors.profile_pic}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup} type="submit" disabled={loading}>
          {loading ? (
            <BeatLoader size={10} color="#000000" />
          ) : (
            "Create Account"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
