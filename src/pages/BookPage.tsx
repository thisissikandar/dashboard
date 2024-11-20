import { book } from "@/api/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

let bookFetcher;
const BookPage = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["book"],
    queryFn: book,
  });

  console.log(data);

  if (isPending)
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        <LoaderCircle className="animate-spin  w-16 h-16" />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return <div>BookPage</div>;
};

export default BookPage;
export { bookFetcher };
