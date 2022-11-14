import Link from "next/link";
export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white mb-8 py-4">
        <div className="container mx-auto flex justify-center">
          <Link href="/">🏡</Link>
          <span className="mx-auto">Welcome to my blog</span>{" "}
        </div>
      </header>
      <main className="container mx-auto flex-1">{children}</main>
      <footer className="bg-black text-white mt-8 py-4">
        <div className="container mx-auto flex justify-center">
          &copy; 2022 Paul McBride
        </div>
      </footer>
    </div>
  );
}
