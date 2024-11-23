import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./Auth/ProtectedRoute";
import ManageRestaurantPages from "./pages/ManageRestaurantPages";

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout showHero>
                        <HomePage />
                    </Layout>
                }
            />
            <Route path="/auth-callback" element={<AuthCallbackPage />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/user-profile"
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    }
                /><Route
                    path="/manage-restaurant"
                    element={
                        <Layout>
                            <ManageRestaurantPages />
                        </Layout>
                    }
                />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}
