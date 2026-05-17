import { useState } from "react";
import axios from "axios";

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

import { Mail, Lock } from "lucide-react";

export default function ForgotPassword({ setPage }) {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleSendOtp = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await axios.post(
        `http://localhost:8080/auth/forgot-password?email=${email}`
      );

      setLoading(false);

     setOtpSent(true);

    } catch (err) {
      setLoading(false);
      setErrorMessage(
          err.response?.data || "Something went wrong"
        );
    }
  };
if (otpSent) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-4">

      <Card className="w-full max-w-md shadow-2xl rounded-2xl">

        <CardContent className="flex flex-col items-center text-center space-y-6 p-8">

          <div className="bg-gray-100 p-5 rounded-full">
            <Mail className="w-8 h-8 text-black" />
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              Check Your Email
            </h2>

            <p className="text-gray-500 mt-3">
              We sent an OTP to
            </p>

            <p className="font-semibold text-lg mt-1">
              {email}
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-600 w-full">
            Didn't receive the email? Check your spam folder.
          </div>

          <Button
            className="w-full h-12 bg-teal-600 hover:bg-teal-700"
            onClick={() => setPage("reset-password")}
          >
            Continue
          </Button>

        </CardContent>

      </Card>

    </div>
  );
}
  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-white p-4">

      <div className="w-full max-w-md">

        <Card className="shadow-2xl rounded-2xl border-0">

          <CardHeader className="text-center space-y-4">

            <div className="mx-auto bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center">
              <Lock className="text-teal-600" />
            </div>

            <CardTitle className="text-3xl font-bold">
              Forgot Password
            </CardTitle>

            <CardDescription>
              Enter your email to receive OTP
            </CardDescription>

          </CardHeader>

          <form onSubmit={handleSendOtp}>

            <CardContent className="space-y-5">

              <div className="space-y-2">

                <Label>Email</Label>

                <div className="relative">

                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />

                </div>

              </div>

            </CardContent>

{errorMessage && (
  <p className="text-red-500 text-sm mt-3 px-5 text-left">
    {errorMessage}
  </p>
)}

            <CardFooter>

              <Button
                type="submit"
                className="w-full h-12 bg-teal-600 hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>

            </CardFooter>

          </form>

        </Card>

      </div>
    </div>
  );
}