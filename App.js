import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import BrandsPage from "./pages/BrandsPage";
import CategoryPage from "./pages/CategoryPage";
import BrandProductPage from "./pages/BrandProductPage";
import ProductPage from "./pages/ProductPage";
import ProductsByTypePage from "./pages/ProductsByTypePage";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import PrivacyPage from "./pages/PrivacyPage";
import RulesPage from "./pages/RulesPage";
import RecipesPage from "./pages/RecipesPage";
import RecipePage from "./pages/RecipePage";
import ProfilePage from "./pages/ProfilePage";
import SelfInfoPage from "./pages/SelfInfoPage";
import SpecialOffersPage from "./pages/SpecialOffersPage";
import MyCartPage from "./pages/MyCartPage";
import ConfirmPage from "./pages/ConfirmPage";
import SearchPage from "./pages/SearchPage";
import ProductsByCategoryPage from "./pages/ProductsByCategoryPage";
import RecipeIngredientsPage from "./pages/RecipeIngredientsPage";
import ScrollToTop from "./CustomHooks/ScrollToTop";
import CareersPage from "./pages/CareersPage";
import FrequentlyQuestionsPage from "./pages/FrequentlyQuestionsPage";
import ShoppingHistoryPage from "./pages/ShoppingHistoryPage";
import SupplierPage from "./pages/SupplierPage";
import VacanciesPage from "./pages/VacanciesPage";
import "./components/Translation/i18n";


function App() {

    return (

        <Router>
            <ScrollToTop/>
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/aboutus" element={<AboutUsPage/>}/>
                <Route path="/aboutus/:filterType" element={<AboutUsPage/>}/>
                <Route path="/privacy" element={<PrivacyPage/>}/>
                <Route path="/rules" element={<RulesPage/>}/>
                <Route path="/selfinfo" element={<SelfInfoPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/profile/:filtertype" element={<ProfilePage/>}/>
                <Route path="/selfinfo" element={<SelfInfoPage/>}/>
                <Route path="/mycart" element={<MyCartPage/>}/>
                <Route path="/mycart/:filtertype" element={<MyCartPage/>}/>
                <Route path="/confirm" element={<ConfirmPage/>}/>
                <Route path="/confirm/:filtertype" element={<ConfirmPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/search/:filtertype" element={<SearchPage/>}/>
                <Route path="/brands" element={<BrandsPage/>}/>
                <Route path="/brands/:filtertype" element={<BrandsPage/>}/>
                <Route path="/brand_products" element={<BrandProductPage/>}/>
                <Route path="/careers" element={<CareersPage/>}/>
                <Route
                    path="/frequentlyQuestions"
                    element={<FrequentlyQuestionsPage/>}
                />
                <Route path="/shoppingHistory" element={<ShoppingHistoryPage/>}/>
                <Route path="/supplier" element={<SupplierPage/>}/>
                <Route path="/vacancies" element={<VacanciesPage/>}/>
                <Route path="/vacancies/:filter" element={<VacanciesPage/>}/>

                <Route
                    path="/brand_products/:filtertype"
                    element={<BrandProductPage/>}
                />
                <Route
                    path="/brand_products/:filtertype/:filtertype1"
                    element={<BrandProductPage/>}
                />

                <Route path="/categories" element={<CategoryPage/>}/>
                <Route
                    path="/categories/:categoryId"
                    element={<ProductsByCategoryPage/>}
                />
                <Route
                    path="/categories/:categoryId/:filterId"
                    element={<ProductsByCategoryPage/>}
                />
                <Route
                    path="/categories/:categoryId/:filterId/:filter1Id"
                    element={<ProductsByCategoryPage/>}
                />

                <Route path="/specialoffers" element={<SpecialOffersPage/>}>
                    <Route path=":filtertype" element={<SpecialOffersPage/>}/>
                </Route>

                <Route
                    path="/products/:filterproducttype"
                    element={<ProductsByTypePage/>}
                />
                <Route
                    path="/products/:filterproducttype/:filtertype"
                    element={<ProductsByTypePage/>}
                />
                <Route
                    path="/products/:filterproducttype/:filtertype/:filtertype1"
                    element={<ProductsByTypePage/>}
                />

                <Route path="/product" element={<ProductPage/>}>
                    <Route path=":filtertype" element={<ProductPage/>}/>
                </Route>

                <Route path="/recipes" element={<RecipesPage/>}>
                    <Route path=":filtertype" element={<RecipesPage/>}/>
                </Route>

                <Route path="/recipe" element={<RecipePage/>}/>
                <Route path="/recipe/:filtertype" element={<RecipePage/>}/>
                <Route
                    path="/recipe/ingredients/:filtertype"
                    element={<RecipeIngredientsPage/>}
                />
                <Route
                    path="/recipe/ingredients/:filtertype/:filtertype1"
                    element={<RecipeIngredientsPage/>}
                />
                <Route
                    path="/recipe/ingredients/:filtertype/:filtertype1/:filtertype2"
                    element={<RecipeIngredientsPage/>}
                />
            </Routes>
        </Router>
    );
}

export default App;
