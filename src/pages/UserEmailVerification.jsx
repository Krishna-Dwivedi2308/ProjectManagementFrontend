import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { fnVerifyEmail } from "@/services/apiAuth";

const UserEmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState({ loading: true, message: "", success: false });

  useEffect(() => {
    const verify = async () => {
      try {
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (!token || !email) {
          setStatus({ loading: false, success: false, message: "Invalid verification link." });
          return;
        }
        
        const res = await fnVerifyEmail({ token, email });
        
        setStatus({
          loading: false,
          success: true,
          message: res.data?.message || "Email verified successfully!",
        });
      } catch (err) {
        // console.log(err);
        
        setStatus({
          loading: false,
          success: false,
          message: err || "Verification failed.",
        });
      }
    };

    verify();
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <Card className="w-[400px] p-4">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {status.loading ? (
            <div className="flex justify-center items-center space-x-2">
              <Loader2 className="animate-spin" />
              <span>Verifying your email...</span>
            </div>
          ) : (
            <p className={status.success ? "text-green-500" : "text-red-500"}>
              {status.message}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEmailVerification;
