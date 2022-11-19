import { useState, useRef } from "react";
import Link from "next/link";
// import { trackGoal } from "fathom-client";

// import { Form, FormState, Subscribers } from "lib/types";
import LoadingSpinner from "components/LoadingSpinner";

function ErrorMessage({ children }: any) {
  return (
    <p className="flex items-center text-sm font-bold text-red-800 dark:text-red-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  );
}

function SuccessMessage({ children }: any) {
  return (
    <p className="flex items-center text-sm font-bold text-grey-700 dark:text-grey-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 h-4 w-4"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      {children}
    </p>
  );
}

export default function Subscribe() {
  const [form, setForm] = useState<{
    state: "initial" | "loading" | "success" | "error";
    message?: string;
  }>({ state: "initial" });
  const inputEl = useRef<HTMLInputElement>(null);

  const subscribe = async (e: any) => {
    e.preventDefault();
    setForm({ state: "loading" });

    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: inputEl.current!.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: "error",
        message: error,
      });
      return;
    }

    // trackGoal("JYFUFMSF", 0);
    inputEl.current!.value = "";
    setForm({
      state: "success",
      message: `Hooray! You're now on the list.`,
    });
  };

  return (
    <div className="border border-grey-200 rounded-lg p-6 my-4 w-full dark:border-gray-800 bg-grey-50 dark:bg-grey-opaque col-start-2">
      <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
        Subscribe to my newsletter
      </p>
      <p className="my-1 text-gray-800 dark:text-gray-200">
        I&apos;ll email you about tech, what I&apos;m working on, and other
        intersting things I find around the web. I&apos;ll never spam you and I
        won&apos;t share your email with anyone else.
      </p>
      <form className="relative my-4" onSubmit={subscribe}>
        <input
          ref={inputEl}
          aria-label="Email for newsletter"
          placeholder="ann@example.com"
          type="email"
          autoComplete="email"
          required
          className="px-4 py-2 mt-1 focus:ring-grey-500 focus:border-grey-500 block w-full border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pr-32"
        />
        <button
          className="flex items-center justify-center absolute right-1 top-1 px-4 font-medium h-8 bg-emerald-500 dark:bg-gray-700 text-white dark:text-gray-100 rounded w-28"
          type="submit"
        >
          {form.state === "loading" ? <LoadingSpinner /> : "Subscribe"}
        </button>
      </form>
      {form.state === "error" ? (
        <ErrorMessage>{form.message}</ErrorMessage>
      ) : form.state === "success" ? (
        <SuccessMessage>{form.message}</SuccessMessage>
      ) : null}
    </div>
  );
}
