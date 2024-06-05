// src/pages/SearchResults.tsx
import React, { FC, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SearchResult {
  id: number;
  name: string;
  description: string;
}

const SearchResults: FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        // Substitua a URL abaixo pela URL real da sua API
        const response = await fetch(`https:8085/produtos/carregarProdutos/search?query=${query}`);
        
        if (!response.ok) {
          throw new Error("Erro ao buscar resultados");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      <h1>Resultados da pesquisa para: {query}</h1>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <ul>
        {results.map(result => (
          <li key={result.id}>
            <h2>{result.name}</h2>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
