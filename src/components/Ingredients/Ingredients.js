import React, {useState, useEffect} from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

const Ingredients = () => {
  const [userIngedients, setUserIngredients] = useState ([]);

  useEffect(()=> {
    fetch('https://react-hooks-fe9e5.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = [];
        for(const key in responseData)
        {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);


  const addIngredientsHandler = 
  ingredient => {
    fetch('https://react-hooks-fe9e5.firebaseio.com/ingredients.json',{ 
      method: 'POST', 
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'} 
    }).then(response => {
      return response.json();
    }).then(responseData => {
    setUserIngredients(prevIngredients => [...prevIngredients,
      {id: responseData.name, ...ingredient} 
    ]);
  });
};

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
    );
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientsHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngedients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
  