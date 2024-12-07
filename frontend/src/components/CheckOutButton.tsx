import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";
import LoadingButtons from "./LoadingButtons";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckOut: (userFormData: UserFormData) => void;
  disabled: boolean;
};

const CheckOutButton = ({ onCheckOut, disabled }: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: pathname },
    });
  };

  if (!isAuthenticated)
    return (
      <Button onClick={onLogin} className='flex-1 bg-orange-500'>
        Log in to check out
      </Button>
    );

  if (isAuthLoading || !currentUser) return <LoadingButtons />;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className='flex-1 bg-orange-500'>
          Go to CheckOut
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[425px] md:min-w-[700px] bg-gray-50'>
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckOut}
          isLoading={isGetUserLoading}
          title='Confirm Delivery Details'
          buttonText='Continue to Payment'
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckOutButton;
