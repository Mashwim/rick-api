import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [charactersData, setCharactersData] = useState(null);

  const peticionFetch = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/?page=1"
      );
      const responseData = await response.json();

      if (response.status === 200) {
        const response2 = await fetch(
          "https://rickandmortyapi.com/api/character/?page=2"
        );
        const responseData2 = await response2.json();
        setCharactersData(responseData2.results.concat(responseData.results));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const obtenerPersonajeAleatorio = () => {
    const randomIndex = Math.floor(Math.random() * charactersData.length);
    const randomChar = charactersData[randomIndex];
    setRandomCharacter(randomChar);
  };

  useEffect(() => {
    peticionFetch();
  }, []);

  const handleObtenerPersonaje = () => {
    if (charactersData) {
      obtenerPersonajeAleatorio();
    }
  };

  console.log(charactersData);
  return (
    <div className="flex flex-col justify-center items-center bg-[url('fondo-1.jpg')] contrast-125 bg-contain bg-no-repeat bg-center">
      <h1 className="text-center text-5xl font-mono font-bold m-16 text-black">
        Random Character Rick & Morty
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-slate-300 border border-slate-400 rounded-lg shadow-lg shadow-black">
          {randomCharacter ? (
            <div key={randomCharacter.id}>
              <img
                className="m-10 border border-black rounded-lg"
                src={randomCharacter.image}
                alt={randomCharacter.name}
              />
              <h2 className="text-center text-2xl font-bold m-5 text-black">
                {randomCharacter.name}
              </h2>
            </div>
          ) : (
            <div className="m-10 border border-black rounded-lg w-64 h-64 flex items-center justify-center bg-[url('icon.jpg')] bg-cover"></div>
          )}
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md my-20"
        onClick={handleObtenerPersonaje}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
