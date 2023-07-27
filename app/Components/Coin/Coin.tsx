import React, { useEffect, useState } from "react";
import { useUserContext } from "../../UserContext/UserContext";
import { useUsersContext } from "../../UsersContext/UsersContext";

const Coin = ({ assignedId }) => {
  const { userDb } = useUserContext();
  const { usersDb } = useUsersContext();
  const firstId = usersDb[0]?.user_casino[0]?.id || "";
  const tokenID = userDb?.token;
  const [coinsMovements, setCoinsMovements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filtersActive, setFiltersActive] = useState(false);

  useEffect(() => {
    assignedId ? getCoinsMovements(assignedId) : getCoinsMovements(firstId);
  }, [assignedId, firstId]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApplyFilter = () => {
    setApplyFilter(true);
    setFilterValue(searchTerm.toLowerCase());
    setCurrentPage(1); // Reset current page when applying a new filter
    setFiltersActive(true);
  };

  const handleClearFilters = () => {
    setApplyFilter(false);
    setFilterValue("");
    setSearchTerm("");
    setCurrentPage(1); // Reset current page when clearing filters
    setFiltersActive(false);
  };

  const getCoinsMovements = async (userCasinoId) => {
    try {
      const response = await fetch(`https://redtronapi-development.up.railway.app/coinsMovements?usercasinoId=${userCasinoId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + tokenID,
        },
      });
      const data = await response.json();
      setCoinsMovements(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleShowPrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredMovements = applyFilter
    ? coinsMovements.filter((movement) => {
        const username = movement.userCasinoId.user.username.toLowerCase();
        const casinoName = movement.userCasinoId.casino.name.toLowerCase();
        const searchTermLower = filterValue.toLowerCase();

        if (filterValue && (username.includes(searchTermLower) || casinoName.includes(searchTermLower))) {
          return true;
        }

        return false;
      })
    : coinsMovements;

  const currentItems = filteredMovements.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <h2>Últimos Movimientos</h2>
      <div>
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleApplyFilter}>Aplicar Filtro</button>
        {filtersActive && (
          <button onClick={handleClearFilters}>Borrar Filtros</button>
        )}
      </div>
      {currentItems.map((movement) => (
        <div key={movement.id}>
          <h3>
            El total de fichas cargadas para el cajero {movement.userCasinoId.user.username} en el casino {movement.userCasinoId.casino.name} es de {movement.coins_balance}
          </h3>
        </div>
      ))}
      <div>
        {currentPage > 1 && (
          <button onClick={handleShowPrevious}>Volver</button>
        )}
        {filteredMovements.length > currentItems.length && (
          <button onClick={handleShowMore}>Mostrar más</button>
        )}
      </div>
    </div>
  );
};

export default Coin;

