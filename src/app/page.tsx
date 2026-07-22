

interface User {
  name: string;
  age: number;
}

export default function Home() {
  const user: User = { name: "Rahim", age: 25 };
  return (
     <main style={{ padding: "2rem" }}>
      <h1>Welcome to NextKitchen 🍳</h1>
      <p>My first Next.js + TypeScript project!</p>
      <p>Name: {user.name}, Age: {user.age}</p>
    </main>
  );
}
