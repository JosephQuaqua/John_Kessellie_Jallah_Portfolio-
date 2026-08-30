import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';

export function AdminLoginPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        throw signInError;
      }

      toast('Welcome back!', 'success');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Invalid credentials'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0755a5]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#69b7f5] via-[#1672c9] to-[#043b82]" />

      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[620px] w-[620px] rounded-full bg-[#002f70]/35 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          [background-size:44px_44px]
        "
      />

      {/* BACK TO WEBSITE */}
      <Link
        to="/"
        className="
          group
          absolute
          left-5
          top-5
          z-20
          inline-flex
          items-center
          gap-2
          rounded-lg
          px-1
          py-1
          text-sm
          font-medium
          text-white/70
          transition-colors
          duration-200
          hover:text-white
          sm:left-8
          sm:top-8
        "
      >
        <ArrowLeft
          className="
            h-4
            w-4
            transition-transform
            duration-200
            group-hover:-translate-x-1
          "
        />

        <span>Back to website</span>
      </Link>

      {/* LOGIN CONTAINER */}
      <main
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-6
          py-24
          sm:px-8
        "
      >
        <div className="w-full max-w-[380px]">

          {/* LOGO */}
          <div className="mb-6 flex justify-center">
            <div
              className="
                flex
                h-[76px]
                w-[76px]
                items-center
                justify-center
                overflow-hidden
                rounded-full
                border
                border-white/20
                bg-[#06468e]/80
                shadow-[0_12px_40px_rgba(0,30,90,0.28)]
                backdrop-blur-md
                sm:h-[82px]
                sm:w-[82px]
              "
            >
              <span
                className="
                  font-serif
                  text-[2.15rem]
                  font-bold
                  leading-none
                  tracking-[-0.12em]
                  text-white
                  sm:text-[2.35rem]
                "
              >
                JK
              </span>
            </div>
          </div>

          {/* HEADING */}
          <div className="mb-10 text-center">
            <h1
              className="
                font-display
                text-[24px]
                font-light
                uppercase
                tracking-[0.24em]
                text-white
                sm:text-[28px]
                sm:tracking-[0.28em]
              "
            >
              Admin Login
            </h1>

            <p
              className="
                mt-3
                text-xs
                font-light
                tracking-wide
                text-white/60
              "
            >
              Secure access to your portfolio
            </p>
          </div>

          {/* ERROR */}
          {error && (
            <div
              className="
                mb-6
                flex
                items-start
                gap-3
                border
                border-red-200/20
                bg-red-950/20
                px-4
                py-3
                text-sm
                text-white
                shadow-lg
                backdrop-blur-sm
              "
            >
              <AlertCircle
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-red-200
                "
              />

              <span className="leading-5">
                {error}
              </span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* EMAIL */}
            <div className="group relative">
              <Mail
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-1/2
                  h-[17px]
                  w-[17px]
                  -translate-y-1/2
                  text-white/65
                  transition-colors
                  duration-200
                  group-focus-within:text-white
                "
              />

              <input
                id="admin-email"
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="
                  h-12
                  w-full
                  border-0
                  border-b
                  border-white/45
                  bg-transparent
                  pl-8
                  pr-2
                  text-sm
                  font-light
                  tracking-wide
                  text-white
                  outline-none
                  placeholder:text-white/60
                  transition-all
                  duration-200
                  focus:border-white
                  focus:ring-0
                  sm:h-[50px]
                "
              />
            </div>

            {/* PASSWORD */}
            <div className="group relative">
              <Lock
                className="
                  pointer-events-none
                  absolute
                  left-0
                  top-1/2
                  h-[17px]
                  w-[17px]
                  -translate-y-1/2
                  text-white/65
                  transition-colors
                  duration-200
                  group-focus-within:text-white
                "
              />

              <input
                id="admin-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="
                  h-12
                  w-full
                  border-0
                  border-b
                  border-white/45
                  bg-transparent
                  pl-8
                  pr-2
                  text-sm
                  font-light
                  tracking-wide
                  text-white
                  outline-none
                  placeholder:text-white/60
                  transition-all
                  duration-200
                  focus:border-white
                  focus:ring-0
                  sm:h-[50px]
                "
              />
            </div>

            {/* REMEMBER / FORGOT */}
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                pt-1
                text-[11px]
                text-white/65
              "
            >
              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  select-none
                "
              >
                <input
                  type="checkbox"
                  className="
                    h-3.5
                    w-3.5
                    cursor-pointer
                    accent-[#0755a5]
                  "
                />

                <span>Remember me</span>
              </label>

              <button
                type="button"
                className="
                  shrink-0
                  transition-colors
                  duration-200
                  hover:text-white
                "
                onClick={() => {
                  // Password reset can be implemented here.
                }}
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              disabled={submitting}
              className="
                h-12
                w-full
                rounded-none
                border
                border-white/10
                bg-[#064995]
                text-xs
                font-semibold
                uppercase
                tracking-[0.22em]
                text-white
                shadow-[0_12px_35px_rgba(0,35,100,0.25)]
                transition-all
                duration-200
                hover:bg-[#0753a8]
                hover:shadow-[0_15px_40px_rgba(0,30,90,0.35)]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {submitting ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/30
                      border-t-white
                    "
                  />

                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          {/* FOOTER */}
          <p
            className="
              mt-8
              text-center
              text-[10px]
              font-light
              uppercase
              tracking-[0.16em]
              text-white/35
            "
          >
            Authorized personnel only
          </p>

        </div>
      </main>
    </div>
  );
}