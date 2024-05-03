import "./App.css";
import Error from "./components/Error";
import Loader from "./components/Loader";
import { useEffect } from "react";
import { useFetch } from "./hooks/useFetch";

const App = () => {
  const [isLoading, isError, data, initializeFetch] = useFetch([
    "https://acutis-api.onrender.com/img/one",
    "https://acutis-api.onrender.com/deeds/one",
  ]);

  useEffect(() => {
    initializeFetch();
  }, []);

  if (isLoading)
    return (
      <main>
        <Loader />
      </main>
    );

  if (isError)
    return (
      <main>
        <Error />
      </main>
    );

  return (
    <main>
      <div className="content-container">
        <img src={data[0].imgUrl} />
        <p>Carlo Acutis {data[1].deed}</p>
      </div>
    </main>
  );
};

export default App;
