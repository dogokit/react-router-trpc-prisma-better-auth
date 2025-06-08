import { authClient } from "@/utils/auth/client";

export default function RegisterRoute() {
  const signUp = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/user",
    });
  };

  return (
    <div className="px-6 sm:px-0 max-w-sm min-h-screen mx-auto flex items-center justify-center">
      <button
        type="button"
        className="text-white bg-blue-500 hover:bg-[#4285F4]/90  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
        onClick={() => signUp()}
      >
        Sign Up with GitHub
      </button>
    </div>
  );
}
