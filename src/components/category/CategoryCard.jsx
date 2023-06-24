import React from 'react';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { CategoryContainer, CategoryImage, CategoryHeader } from '../../styles/category';
import NoImageYet from '../../images/NoImageYet.jpg';
import baseUrl from '../../api/image';
import { useFilterContext } from '../../context/FilterProvider';
// import { Colors } from '../../styles/theme';

export default function CategoryCard({ category }) {
  const { setCategory } = useFilterContext();
  const navigate = useNavigate();
  const handleClick = () => {
    const array = [];
    array.push(category.id);
    setCategory(array);
    navigate('/products');
  };
  return (

    <CategoryContainer data-cy="categoryListItem" onClick={handleClick}>
      <CategoryImage
        src={category.categoryImg ? `${baseUrl}/${category.categoryImg}` : NoImageYet}
      />
      <CategoryHeader>{category.name}</CategoryHeader>
      <Typography variant="p">{category.description}</Typography>
    </CategoryContainer>
  );
}