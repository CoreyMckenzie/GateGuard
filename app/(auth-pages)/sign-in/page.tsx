import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/comps/form-message";
import { SubmitButton } from "@/comps/submit-button";
import { Input } from "@/comps/ui/input";
import { Label } from "@/comps/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <>
    <form className="flex-1 flex flex-col min-w-64 max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-16">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Sign in</h1>
      <p className="text-sm text-gray-600 text-center mb-6">
        Don't have an account?{" "}
        <span className="text-blue-600 font-medium">
          Contact I.T
        </span>
      </p>
      <div className="flex flex-col gap-4 mt-4">
        <div>
          <Label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</Label>
          <Input
            name="email"
            placeholder="you@example.com"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
            {/* <Link
              className="text-xs text-blue-600 underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link> */}
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <SubmitButton
          pendingText="Signing In..."
          formAction={signInAction}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign in
        </SubmitButton>
        <FormMessage message={searchParams}  />
      </div>
    </form>
    </>
  );
}
