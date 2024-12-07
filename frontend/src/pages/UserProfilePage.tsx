import { useGetMyUser, useUpdateUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

export default function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateUser();

  //  if loading
  if (isGetLoading) return <span>Loading...</span>;

  //  if unable to load
  if (!currentUser) return <span>Unable to load user profile</span>;

  //  if loaded
  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
}
