import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 min-h-screen">
      <h1 className="text-4xl font-bold">
        Simple Dashboard <ThemeToggle />
      </h1>
      <p className="mt-4">
        This not a production app, this only use for learning and testing.
      </p>
      <ul className="mt-4 list-disc">
        <li className="list-none font-bold">Build using</li>
        <li>
          <a
            href="https://nextjs.org"
            className="text-muted-foreground hover:underline"
          >
            NextJs
          </a>{" "}
          and{" "}
          <a
            className="text-muted-foreground hover:underline"
            href="https://react.dev"
          >
            React
          </a>
        </li>
        <li>
          <a
            className="text-muted-foreground hover:underline"
            href="https://authjs.dev"
          >
            AuthJs
          </a>{" "}
          for authentication and user management.
        </li>
        <li>
          <a
            className="text-muted-foreground hover:underline"
            href="https://tailwindcss.com"
          >
            Tailwindcss
          </a>{" "}
          and{" "}
          <a
            className="text-muted-foreground hover:underline"
            href="https://ui.shadcn.com/"
          >
            Shadcn UI
          </a>{" "}
          for Style
        </li>
        <li>
          <a
            className="text-muted-foreground hover:underline"
            href="https://www.prisma.io"
          >
            Prisma
          </a>{" "}
          and{" "}
          <a
            className="text-muted-foreground hover:underline"
            href="https://www.mongodb.com"
          >
            MongoDB
          </a>{" "}
          for ORM and Database.
        </li>
        <li>
          <a
            className="text-muted-foreground hover:underline"
            href="https://www.npmjs.com/package/react-hook-form"
          >
            react-hook-form
          </a>{" "}
          and{" "}
          <a
            className="text-muted-foreground hover:underline"
            href="https://zod.dev"
          >
            Zod
          </a>{" "}
          for Client Side Form Validation.
        </li>
        <li>
          <a
            className="text-muted-foreground hover:underline"
            href="https://imagekit.io"
          >
            ImageKit
          </a>{" "}
          for Upload Images and Attachments.
        </li>
        <li>
          <a
            className="text-muted-foreground hover:underline"
            href="https://jotai.org/"
          >
            Jotai
          </a>{" "}
          for State Management
        </li>
      </ul>
      <br />
      <span>
        Go to the
        <Link className="text-muted-foreground hover:underline" href="/login">
          {" "}
          Login
        </Link>{" "}
        |
        <Link
          className="text-muted-foreground hover:underline"
          href="/dashboard"
        >
          {" "}
          Dashboard
        </Link>
      </span>
    </main>
  );
}
