import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import * as Yup from "yup";
import { fnResetPassword } from "@/services/apiAuth"; // adjust path if needed

const PasswordResetVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    token: "",
    password: "",
    confirmPassword: "",
  });

  const [state, setState] = useState({
    loading: false,
    error: "",
    success: false,
    message: "",
  });

  // populate token and email from query params once
  useEffect(() => {
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";
    setFormData((prev) => ({ ...prev, token, email }));
    // clear previous messages when params change
    setState({ loading: false, error: "", success: false, message: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setState((s) => ({ ...s, error: "", message: "" }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setState((s) => ({ ...s, loading: true, error: "", message: "" }));

    // basic validation
    const schema = Yup.object().shape({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string().required("Please confirm your password"),
    });

    try {
      await schema.validate(
        {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        { abortEarly: false }
      );

      if (formData.password !== formData.confirmPassword) {
        setState({
          loading: false,
          error: "Passwords do not match",
          success: false,
          message: "",
        });
        return;
      }

      // Build payload expected by backend: { token, email, password }
      const payload = {
        token: formData.token,
        email: formData.email,
        password: formData.password,
      };

      const res = await fnResetPassword(payload);

      setState({
        loading: false,
        error: "",
        success: true,
        message:
          res?.data?.message ||
          "Password reset successful. Redirecting to login...",
      });

      // clear sensitive fields
      setFormData((p) => ({ ...p, password: "", confirmPassword: "" }));

      // redirect after a short delay
      setTimeout(() => navigate("/auth"), 2000);
    } catch (err) {
      // handle validation errors from Yup
      if (err && err.name === "ValidationError") {
        const msgs = err.inner?.map((i) => i.message).join(", ") || "Validation error";
        setState({
          loading: false,
          error: msgs,
          success: false,
          message: "",
        });
        return;
      }

      // axios-style or other errors
    //   console.error(err);
      const apiMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to reset password. Please try again.";
      setState({
        loading: false,
        error: apiMessage,
        success: false,
        message: "",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Enter a new password for{" "}
              <span className="font-medium">{formData.email || "your account"}</span>.
            </CardDescription>
            {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
            {state.success && <p className="text-green-600 mt-2">{state.message}</p>}
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <label className="block text-sm font-medium">New Password</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Create new password"
                  value={formData.password}
                  onChange={handleInput}
                  aria-label="New password"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleInput}
                  aria-label="Confirm password"
                />
              </div>

              {/* Hidden token/email inputs kept as before */}
              <input type="hidden" name="token" value={formData.token} />
              <input type="hidden" name="email" value={formData.email} />
            </CardContent>

            <CardFooter className="flex flex-col w-full space-y-3">
              <Button
                className="w-full"
                type="submit"
                disabled={state.loading || state.success}
              >
                {state.loading ? <BeatLoader size={8} /> : "Set New Password"}
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/auth")}
                type="button"
              >
                Back to Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};

export default PasswordResetVerification;
