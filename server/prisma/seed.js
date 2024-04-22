import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const kyle = await prisma.user.create({ data: { name: "Kyle" } });
  const sally = await prisma.user.create({ data: { name: "Sally" } });

  const post1 = await prisma.post.create({
    data: {
      body: "Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.Under the hood, Next.js also abstracts and automatically configures tooling needed for React, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.Next.js offers a streamlined project structure, automatic code-splitting, and hot reloading for a smooth development workflow.Next.js offers both SSR and SSG, giving you flexibility in how your application is rendered. SSR improves SEO and initial load performance, while SSG generates lightning-fast static pages ideal for content-heavy websites.",
      title: "Post about Next js ",
    },
  });
  const post2 = await prisma.post.create({
    data: {
      body: "React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable components. From web sites to phone apps, everything on the screen can be broken down into components. In this chapter, you’ll learn to create, customize, and conditionally display React components.React uses JSX, a syntax extension for JavaScript that allows you to write HTML-like structures within your code. This improves readability and makes it easier to visualize the UI. React employs a virtual DOM, an in-memory representation of the actual DOM. When data changes, React efficiently updates the virtual DOM and then only re-renders the minimal changes in the real DOM. This significantly improves performance.",
      title: "Post about React",
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      message: "I am a root comment",
      userId: kyle.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "I am a nested comment",
      userId: sally.id,
      postId: post1.id,
    },
  });

  const comment3 = await prisma.comment.create({
    data: {
      message: "I am another root comment",
      userId: sally.id,
      postId: post1.id,
    },
  });
}

seed();
