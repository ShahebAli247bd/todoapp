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
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuthStore } from "./../../../store/authStore";

export function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { signup, redirectAfterSignUp } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup({ username, email, password });
    };
    if (redirectAfterSignUp) {
        navigate(`/signin?emails=${email}`);
    }
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    value={username}
                                    id="username"
                                    type="username"
                                    placeholder="Username"
                                    required
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>

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
                                Sign Up
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to={"/signin"}
                                className="underline underline-offset-4"
                            >
                                Sign In
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
