import React, { useEffect, useState } from 'react';

const Table = () => {
  const [works, setWorks] = useState([]);
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(1); 
  const totalPages = 20; 
  const pagesPerGroup = 5; 

  useEffect(() => {
    fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=12`)
      .then((response) => response.json())
      .then((data) => {
        setWorks(data.data);
        console.log(data.data,"data.data");

      });
  }, [currentPage]);

  const handleCheckboxChange = (id) => {
    if (selectedWorks.includes(id)) {
      setSelectedWorks(selectedWorks.filter((artId) => artId !== id));
    } else {
      setSelectedWorks([...selectedWorks, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedWorks.length === works.length) {
      setSelectedWorks([]);
    } else {
      setSelectedWorks(works.map((artwork) => artwork.id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (pageGroup < Math.ceil(totalPages / pagesPerGroup)) {
      setPageGroup(pageGroup + 1);
      setCurrentPage(pageGroup * pagesPerGroup + 1);
    }
  };

  const handlePrev = () => {
    if (pageGroup > 1) {
      setPageGroup(pageGroup - 1);
      setCurrentPage((pageGroup - 1) * pagesPerGroup + 1);
    }
  };

  const PaginationRen = () => {
    const startPage = (pageGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-2 py-1 ${currentPage === i ? 'bg-gray-300 text-white' : 'bg-gray-200'} rounded`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="overflow-x-auto">
      <table className="w-[70%] m-auto table-auto  mb-4 ">
        <thead className='bg-gray-200 '>
          <tr>
            <th className="">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedWorks.length === works.length}
                className="mr-2"
              />
              Select All
            </th>
            <th className=" p-2">Title</th>
            <th className=" p-2">Place of Origin</th>
            <th className=" p-2">Artist</th>
            <th className=" p-2">Inscriptions</th>
            <th className=" p-2">Start Date</th>
            <th className=" p-2">End Date</th>
          </tr>
        </thead>
        <tbody>
          {works.map((artwork) => (
            <tr
              key={artwork.id}
              className={`border-t ${
                selectedWorks.includes(artwork.id) ? 'bg-blue-100' : ''
              }`} 
            >
              <td className="">
                <input
                  type="checkbox"
                  checked={selectedWorks.includes(artwork.id)}
                  onChange={() => handleCheckboxChange(artwork.id)}
                  className="mr-2"
                />
              </td>
              <td className=" p-2">{artwork.title}</td>
              <td className=" p-2">{artwork.place_of_origin || "N/A"}</td>
              <td className=" p-2">{artwork.artist_display || "N/A"}</td>
              <td className=" p-2">{artwork.inscriptions || "N/A"}</td>
              <td className=" p-2">{artwork.date_start || "N/A"}</td>
              <td className=" p-2">{artwork.date_end || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={handlePrev}
          disabled={pageGroup === 1}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          &lt;
        </button>
        {PaginationRen()}
        <button
          onClick={handleNext}
          disabled={pageGroup === Math.ceil(totalPages / pagesPerGroup)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
