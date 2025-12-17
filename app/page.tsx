import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex min-h-screen justify-center items-center bg-[#0A0E14]">
      <div className="text-center p-6 bg-white rounded-lg max-w-xl w-full flex flex-col items-center justify-center">
        <Image
          src="/icons/logo.svg"
          alt="Talk Flow AI"
          width={100}
          height={100}
          className="mb-4 w-32 h-32"
        />
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Welcome to Talk Flow AI
        </h1>
        <p className="text-lg text-secondary mb-6">
          We are here to help you build amazing applications with our modern
          design system.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
