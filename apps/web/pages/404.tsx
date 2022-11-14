import Link from "next/link";

import Container from "components/Container";

export default function NotFound() {
  return (
    <Container title="404 – Paul McBride">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-2xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          404 – Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for does not exist. It&apos;s possible that
          the page has been moved, or you&apos;ve typed the url in wrong.
        </p>
        <Link
          href="/"
          className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}
