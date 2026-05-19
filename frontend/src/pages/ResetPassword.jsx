import { useState,useEffect} from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Lock } from "lucide-react";

export default function ResetPassword({ setPage }) {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showOtpExpired, setShowOtpExpired] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);
useEffect(() => {

  if (timeLeft <= 0) {

    setShowOtpExpired(true);

  }

}, [timeLeft]);

  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const res = await axios.post(
        `http://localhost:8080/auth/reset-password?email=${email}&otp=${otp}&newPassword=${newPassword}`
      );

      setLoading(false);

      if (res.data === "Password reset successful") {

        setShowSuccessModal(true);

      }

    } catch (err) {

      setLoading(false);

      setShowSuccessModal(false);

      setErrorMessage(
        err.response?.data || "Reset password failed"
      );
    }
  };
const handleResendOtp = async () => {

  try {

    const res = await axios.post(
      `http://localhost:8080/auth/forgot-password?email=${email}`
    );

    setTimeLeft(300);
    setShowOtpExpired(false);
    setErrorMessage("");
   setSuccessMessage(res.data);

  } catch (err) {
    setErrorMessage(
      err.response?.data || "Failed to resend OTP"
    );
  }
};
const minutes = Math.floor(timeLeft / 60);

const seconds = timeLeft % 60;
if (showSuccessModal) {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-4">

      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0">

        <CardContent className="flex flex-col items-center text-center space-y-6 p-8">

          <div className="bg-green-100 p-5 rounded-full">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Password Reset Successful
            </h1>

            <p className="text-gray-500 mt-4 text-lg">
              Your password has been successfully reset.
              You can now log in with your new password.
            </p>

          </div>

          <Button
            className="w-full h-12 bg-black hover:bg-gray-900 text-white rounded-xl"
            onClick={() => setPage("home")}
          >
            Continue to Login
          </Button>

        </CardContent>

      </Card>

    </div>
  );
}  return (


    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-4">

      <div className="w-full max-w-md">

        <Card className="shadow-2xl rounded-2xl border-0">

          <CardHeader className="text-center space-y-4">

            <div className="mx-auto bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center">
              <Lock className="text-teal-600" />
            </div>

            <CardTitle className="text-3xl font-bold">
              Reset Password
            </CardTitle>

            <CardDescription>
             Your new password must be different from previously used passwords
            </CardDescription>

          </CardHeader>

          <form onSubmit={handleResetPassword}>

            <CardContent className="space-y-5">

              <div className="space-y-2">

                <Label>Email</Label>

                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  required
                />

              </div>

              <div className="space-y-2">

                <Label>OTP</Label>

                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-12"
                  required
                />


              </div>

              <div className="space-y-2">

                <Label>New Password</Label>

                <div className="relative">

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-12 pr-12"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>

                </div>

              </div>
              <div className="space-y-2">

                <Label>Confirm Password</Label>

                <div className="relative">

                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 pr-12"
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>

                </div>

              </div>
              <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-600">

                <p className="font-semibold mb-2">
                  Password must:
                </p>

                <ul className="list-disc list-inside space-y-1">
                  <li>Be at least 8 characters long</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                   <li>Include at least special characters</li>
                </ul>

              </div>
              <p className="text-sm text-gray-500 mt-2">
                OTP expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </p>
              {showOtpExpired && (
                <div className="mt-2">

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-teal-600 font-semibold mt-2 hover:underline"
                  >
                    Resend OTP
                  </button>

                </div>
              )}

              {successMessage && (
                <p className="text-green-600 text-sm mt-2">
                  {successMessage}
                </p>
              )}

            </CardContent>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-3 px-5 text-left">
                {errorMessage}
              </p>
            )}

            <CardFooter className="border-0">

              <Button
                type="submit"
                className="w-full h-12 bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

            </CardFooter>

          </form>

        </Card>

      </div>

    </div>
  );
}