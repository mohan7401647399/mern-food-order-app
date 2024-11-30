import Restaurant from "../model/Restaurant";

//  search restaurants
const searchRestaurant = async (req: any, res: any) => {
    try {
        const city = req.params.city;
        const searchQuery = (req.query.searchQuery as string) || "";
        const selectedCuisines = (req.query.selectedCuisines as string) || "";
        const sortOption = (req.query.sortOption as string) || "lastUpdated";
        const page = parseInt(req.query.page as string) || 1;

        let query: any = {};

        query["city"] = new RegExp(city, "i");
        const cityCheck = await Restaurant.countDocuments(query);
        if (cityCheck === 0) return res.status(404).json({
            data: [],
            pagination: {
                total: 0,
                page: 1,
                pages: 1
            }
        });

        if (selectedCuisines) {
            const cuisinesArray = selectedCuisines
                .split(",")
                .map((cuisine) => new RegExp(cuisine, "i"));
            query["cuisines"] = { $all: cuisinesArray };
        }
        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i");
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } },
            ];
        }
        const pageSize = 0;
        const skip = (page - 1) * pageSize;

        const restaurants = await Restaurant.find(query)
            .sort({ [sortOption]: 1 })
            .skip(skip)
            .limit(pageSize).lean();

        const total = await Restaurant.countDocuments(query);

        const response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize), //  50 results - pageSize = 10 > page 5
            }
        };
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Something went wrong in search restaurant" });
    }
};

export default { searchRestaurant }