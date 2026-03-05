export const runtime = 'edge';
import { SignIn } from "@clerk/nextjs";
import Header from "@/components/Header";

export default function SignInPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#050507] flex items-center justify-center pt-20">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
              card: 'bg-[#111116] border border-white/10 shadow-xl',
              headerTitle: 'text-white',
              headerSubtitle: 'text-gray-400',
              socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
              socialButtonsBlockButtonText: 'text-white',
              formFieldLabel: 'text-gray-400',
              formFieldInput: 'bg-black/50 border-white/10 text-white',
              footerActionLink: 'text-blue-400 hover:text-blue-300'
            }
          }}
        />
      </div>
    </>
  );
}
