import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
// adjust this path to where your API helpers live
import { fnResendEmail } from "@/services/apiAuth";

const ResendVerificationDialog = ({ open, onOpenChange }) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const resendEmailTrigger = async () => {
    setError("");
    setSuccess("");
    try {
      setLoading(true);
      // fnResendEmail should accept { email, password } or FormData depending on your backend
      const res = await fnResendEmail(formData);
      // assume success if no exception; you can inspect res for a message
      setSuccess(
        (res && (res.message || res.data?.message)) ||
          "Verification email sent. Check your inbox."
      );
      
    
      return res;
    } catch (err) {
      console.log(err);
      
      // if error message is in the response 
    setError(err.message || "Send failed");

      // console.error("Resend email error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
    // clear related errors on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setError("");
    setSuccess("");
  };

  const handleSend = async (e) => {
    e?.preventDefault?.();
    setErrors({});
    setError("");
    setSuccess("");

    try {
      const schema = Yup.object().shape({
        email: Yup.string().trim().email("Invalid email").required("Email is required"),
        // If your backend requires password here, keep it; otherwise remove validation for password
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });

      await resendEmailTrigger();
    } catch (err) {
      if (err.name === "ValidationError" && err.inner) {
        const newErrors = {};
        err.inner.forEach((ve) => {
          if (ve.path) newErrors[ve.path] = ve.message;
        });
        setErrors(newErrors);
      } else {
        setError(err.message || "Validation failed");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resend Verification Email</DialogTitle>
          <DialogDescription>
            Enter your email and password to receive a new verification link.Make sure to verify within 20 minutes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSend} className="space-y-3">
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInput}
              aria-label="Email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInput}
              aria-label="Password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}

          <DialogFooter>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
                Cancel
              </Button>

              <Button type="submit" onClick={handleSend} disabled={loading}>
                {loading ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResendVerificationDialog;
