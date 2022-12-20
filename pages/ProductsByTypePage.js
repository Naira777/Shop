
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesById, changeCategoryIdes } from '../redux/reducer';
import { getCategoriesByid } from '../utils';

import MainLayout from '../layouts/MainLayout';
import ProductsByType from '../components/ProductsByType/index';


function ProductsByTypePage() {


  const {categoryList} = useSelector(state => state.CategoryPage)
  const dispatch = useDispatch();

  const {filtertype} = useParams();

  useEffect(() => {
    dispatch(getCategoriesById());
  }, []);                   

  useEffect(() => {
    dispatch(changeCategoryIdes(getCategoriesByid(categoryList, filtertype)));
  }, [filtertype, categoryList]);



  return (


    <MainLayout>
      <ProductsByType  />
    </MainLayout>

   
  );
}

export default ProductsByTypePage;