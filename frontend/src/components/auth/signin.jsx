import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { useState } from "react";
import { useAuthStore } from "./../../../store/authStore";
import { OtpModal } from "./otpModal";

export function SignIn() {
    const params = new URL(document.location).searchParams;

    const [email, setEmail] = useState(params.get("emails") || "");
    const [password, setPassword] = useState("");

    const { signin, isOtpModalOpen } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signin({ email, password });
    };

    if (isOtpModalOpen) {
        return <OtpModal />;
    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign In</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    value={email}
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="/forget"
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    value={password}
                                    id="password"
                                    type="password"
                                    placeholder="******"
                                    required
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                variant="outline"
                            >
                                Sign In
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="underline underline-offset-4"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
