import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex flex-col justify-center gap-4 max-w-screen-xl mx-auto md:pt-64 pt-48 p-4">
      <h1 className="text-center md:text-6xl text-3xl font-bold">404</h1>
      <h3 className="text-center md:text-4xl text-2xl font-semibold">
        This page does not exist
      </h3>
      <Link href="/" className="inline-block text-center md:text-4xl text-2xl">
        Go Back To Home
      </Link>
    </main>
  );
};

export default NotFound;
