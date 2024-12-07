import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import { SearchResultInfo } from "@/components/SearchResultsInfo";
import SortOptionDropDown from "@/components/SortOptionDropDown";
import { useState } from "react";
import { useParams } from "react-router-dom";

//  Search state types
export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

//  Search page
const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const { results, isLoading } = useSearchRestaurants(searchState, city);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  //  handle pagination
  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  //  handle search
  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  //  handle reset
  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  //  handle loading
  if (isLoading) return <span>Loading...</span>;

  //  handle no results
  if (!results?.data || !city) return <span>No results found</span>;

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div id='cuisines-list'>
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          onChange={setSelectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevIsExpand) => !prevIsExpand)}
        />
      </div>
      <div className='flex flex-col gap-5'>
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder='Search by cuisine or Restaurant name'
          onReset={resetSearch}
        />
        <div className='flex justify-between flex-col gap-3 lg:flex-row'>
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropDown
            onChange={(value) => setSortOption(value)}
            sortOption={searchState.sortOption}
          />
        </div>
        {results.data.map((restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
