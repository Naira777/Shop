import MainLayout from '../layouts/MainLayout'

import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesById, changeCategoryIdes } from '../redux/reducer';
import { getCategoriesByid } from '../utils';

import ProductsByCategory from './../components/ProductsByCategory/index';

function ProductsByCategoryPage() {

  
  const {categoryList} = useSelector(state => state.CategoryPage)
  const dispatch = useDispatch();

  const {categoryId} = useParams();

  useEffect(() => {
    dispatch(getCategoriesById());
  }, []);                   

  useEffect(() => {
    dispatch(changeCategoryIdes(getCategoriesByid(categoryList, categoryId)));
  }, [categoryId, categoryList]);

  return (
  
    <MainLayout>
    <ProductsByCategory />
    </MainLayout>

    
  );
}
export default ProductsByCategoryPage;