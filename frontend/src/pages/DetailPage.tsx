import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckOutButton from "@/components/CheckOutButton";
import MenuItems from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  //  item add to cart
  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItem) => {
      const existingCardItem = prevCartItem.find(
        (cardItem) => cardItem._id === menuItem._id,
      );
      let updatedCardItems;

      if (existingCardItem) {
        updatedCardItems = prevCartItem.map((cardItem) =>
          cardItem._id === menuItem._id
            ? { ...cardItem, quantity: cardItem.quantity + 1 }
            : cardItem,
        );
      } else {
        updatedCardItems = [
          ...prevCartItem,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCardItems),
      );

      return updatedCardItems;
    });
  };

  //  item remove from cart
  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItem) => {
      const updatedCartItems = prevCartItem.filter(
        (item) => cartItem._id !== item._id,
      );
      return updatedCartItems;
    });
  };

  const onCheckOut = (userFormData: UserFormData) => {
    console.log("userFormData", userFormData);
  };

  if (isLoading || !restaurant) return "Loading...";

  return (
    <div className='flex flex-col gap-10'>
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.lastUpdated}
          alt={restaurant.restaurantName}
          className='rounded-md object-cover w-full h-full'
        />
      </AspectRatio>
      <div className='grid md:grid-cols-[4fr_2fr] gap-5 md:px-32'>
        <div className='flex flex-col gap-4'>
          <RestaurantInfo restaurant={restaurant} />
          <span className='text-2xl font-bold tracking-tight'>Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItems
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItems.length === 0}
                onCheckOut={onCheckOut}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
