import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/user-profile-form/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPages() {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();

  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  );
}
