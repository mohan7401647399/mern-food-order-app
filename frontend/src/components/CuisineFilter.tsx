import { cuisineList } from "@/config/restaurant-options-config";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisines: string[];
  isExpanded: boolean;
  onExpandedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  onExpandedClick,
}: Props) => {
  const handleCuisinesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  };

  const handleCuisinesReset = () => onChange([]);

  return (
    <>
      <div className='flex justify-between items-center px-'>
        <div className='text-md font-semibold mb-2'>Filter by Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className='text-sm font-semibold mb-2 underline cursor-pointer text-blue-500'
        >
          Reset Filters
        </div>
      </div>
      <div className='space-y-2 flex flex-col'>
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className='flex'>
                <input
                  id={`cuisine_${cuisine}`}
                  type='checkbox'
                  className='hidden'
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                  value={cuisine}
                />
                <label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={3} strokeWidth={2} />}
                  {cuisine}
                </label>
              </div>
            );
          })}

        <Button
          className='mt-4 flex-1'
          variant='link'
          onClick={onExpandedClick}
        >
          {isExpanded ? (
            <span className='flex flex-row items-center'>
              View Less <ChevronUp />
            </span>
          ) : (
            <span className='flex flex-row items-center'>
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
