import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
  { id: 3, title: "Post 3" },
  { id: 4, title: "Post 4" },
];

function App() {
  const queryClient = useQueryClient();
  const postsQuery = useQuery({
    queryKey: ["posts"], //Siempre sera un arreglo
    queryFn: () => wait(1000).then(() => [...POSTS]), //Esto retorna una promesa
  });

  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (postsQuery.isLoading) return <h2>Loading....</h2>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;
  return (
    <>
      <h1>Hello, Guy Im a big Messi fan</h1>
      <div>
        {postsQuery.data.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))}
        <button
          disabled={newPostMutation.isLoading}
          onClick={() => newPostMutation.mutate("New Post")}
        >
          Add new
        </button>
      </div>
    </>
  );
}

const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default App;
