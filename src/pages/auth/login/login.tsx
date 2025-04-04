import { LoginForm } from "@/components/login-form"
import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to={'/'}>
            <div className="flex items-center gap-2 text-xl">InnovaLearn</div>
          </Link> 
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://startastudio.com/wp-content/uploads/2021/08/how-to-learn-animation-while-working-nine-to-five_01-1024x875.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
