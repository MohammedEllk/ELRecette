import React from 'react';
import ReactDOM from 'react-dom';
import {Button,ButtonToolbar,Card, CardGroup,Badge} from 'react-bootstrap';
import './css/index.css';
import {EditR} from './components/editr';
//instance recipe/recette
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      nameValue :"",
      ingredientsValue:"",
      showEdit: false,
      recipes : [],
      currentlyEditing: 0
      
      
    }
    this.buildStringFromIngredients = this.buildStringFromIngredients.bind(this);
    this.getIngredientsFromString = this.getIngredientsFromString.bind(this);
    this.editR = this.editR.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    
   


    
  }
  componentDidMount() {
    var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem("recipes")) : [
      {name: "Harcha", ingredients: ["kilo farine", "ver d'eau", "200g sel"]},
      {name: "Meloui", ingredients: ["1/2 kilo farine", "200g sel", "200ml huile"]},
      {name: "Merka", ingredients: ["bzar", "1 onion", "6 carrots", "4potatos"]}
    ];
    this.setState({recipes: recipes});
  }
  getIngredientsFromString(str) {
		return str.split(",").map(ingredient => ingredient.trim());
	}

	buildStringFromIngredients(arr) {
		return arr.join(', ');
	}
  setName=(event)=>{
    this.setState( {
     nameValue : event.target.value
    })
   }
   setIngredients=(event)=>{
    this.setState( {
     ingredientsValue : event.target.value
    })
   }
   addRecipe=(event)=>{
    event.preventDefault();
    
    
    
     let recipe = {
       name:this.state.nameValue,
       ingredients:this.getIngredientsFromString(this.state.ingredientsValue)
     }
     
     this.setState(
       {
        recipes:[...this.state.recipes,recipe]
       }
     )
     
     localStorage.setItem('recipe', JSON.stringify(recipe));
   }
   onDelete=(recipes)=>{
     let index = this.state.recipes.indexOf(recipes)
     let listrecipe=[...this.state.recipes];
     listrecipe.splice(index,1);
     
     this.setState(
       {
         recipes:listrecipe
       }
     );
     
     localStorage.setItem('recipes', JSON.stringify(listrecipe));
   }
  showEditModal(index) {//modèle : modifier
    this.setState({currentlyEditing: index,showEdit:!this.state.showEdit});
  }
  editR(newName, newIngredients, currentlyEditing) {//
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, ingredients: newIngredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showEditModal(currentlyEditing);
  }


   




  render() {
    
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;
    
    return(

      <div  bg="dark">
        <h1>My Recipe</h1>
        <div className = "card m-2">
        <div className="col">
        <h1>Ajouter un Récipe</h1>
        <form onSubmit={this.addRecipe}>
            <label>Ajouter la recette</label>
            <input type="text" onChange={this.setName} name="recipe" value={this.state.nameValue} placeholder="new recette" className="p-2"/>
            <label>Les ingrédients</label>
            <input type="textarea" onChange={this.setIngredients} name="ingredients" value={this.state.ingredientsValue} placeholder="ingredients" className="p-2"/>
            <div><button className="btn btn-primary">Ajouter </button> </div>
        </form>
        </div>
        
        
        
        {this.state.recipes.map((recipe,index) => (
          <div className="row mb-2" bg="primary" >
          <Card.Title className="title" bg="light" >  {recipe.name} </Card.Title>
          <Card.Body >
          
          {recipe.ingredients.map((ingredient, index) => (
           <Card bg="info" text='muted' >{ingredient}</Card>
           ))}
            <ButtonToolbar>
                  <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                  <Button className="btn btn-danger" bsStyle="danger" onClick={()=>this.onDelete(recipe)}>Supprimer</Button>
            </ButtonToolbar>
            
           
          </Card.Body>
         <Card> <EditR onShow={this.state.showEdit} onEdit={this.editR} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recipe={recipes[currentlyEditing]} /></Card>
         </div>  ))
         }
         
        
      </div>
      </div>
        
        
        

      );
        
        }
        
};

ReactDOM.render(<Recipe />, document.getElementById('recette'));