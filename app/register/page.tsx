import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { RegistrationForm } from "@/components/registration-form";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Starfield />
      <Navbar />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20 pb-16">
        <RegistrationForm />
      </main>
    </div>
  );
}
