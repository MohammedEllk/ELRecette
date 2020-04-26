import React from 'react';
import ReactDOM from 'react-dom';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import './css/index.css';
import {AddR} from './components/addr';
import {EditR} from './components/editr';
//instance recipe/recette
class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      showAdd: false,
      showEdit: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addR = this.addR.bind(this);
    this.editR = this.editR.bind(this);
    this.deleteR = this.deleteR.bind(this);
  }
  componentDidMount() {
    var recipes = (typeof localStorage["recipes"] !== "undefined") ? JSON.parse(localStorage.getItem("recipes")) : [
      {name: "Harcha", ingredients: ["kilo farine", "ver d'eau", "200g sel"]},
      {name: "Meloui", ingredients: ["1/2 kilo farine", "200g sel", "200ml huile"]},
      {name: "Merka", ingredients: ["bzar", "1 onion", "6 carrots", "4potatos"]}
    ];
    this.setState({recipes: recipes});
  }
  showAddModal() {//modèle : ajouter
    this.setState({showAdd: !this.state.showAdd});
  }
  showEditModal(index) {//modèle : modifier
    this.setState({currentlyEditing: index, showEdit: !this.state.showEdit});
  }
  addR(recipe) {//pour créer une nouvelle recette
    let recipes = this.state.recipes;
    recipes.push(recipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showAddModal();
  }
  editR(newName, newIngredients, currentlyEditing) {//
    let recipes = this.state.recipes;
    recipes[currentlyEditing] = {name: newName, ingredients: newIngredients};
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes});
    this.showEditModal(currentlyEditing);
  }
  deleteR(index) {
    let recipes = this.state.recipes.slice();
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    this.setState({recipes: recipes, currentlyEditing: 0});
  }
  render() {
    const recipes = this.state.recipes;
    var currentlyEditing = this.state.currentlyEditing;
    return(
      <div className="jumbotron">
        <h1>Recette</h1>
        <PanelGroup accordion id="recipes">
          {recipes.map((recipe, index) => (
            <Panel eventKey={index} key={index}>
              <Panel.Heading>
                <Panel.Title className="title" toggle>{recipe.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body collapsible>
                <ListGroup>
                  {recipe.ingredients.map((ingredient, index) => (
                    <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                <ButtonToolbar>
                  <Button bsStyle="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                  <Button bsStyle="danger" onClick={() => {this.deleteR(index)}}>Delete</Button>
                </ButtonToolbar>
              </Panel.Body>
              <EditR onShow={this.state.showEdit} onEdit={this.editR} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recipe={recipes[currentlyEditing]} />
            </Panel>
          ))}
        </PanelGroup>
        <Button bsStyle="primary" onClick={this.showAddModal}>Ajouter La recette</Button>
        <AddR onShow={this.state.showAdd} onAdd={this.addR} onAddModal={this.showAddModal} />
      </div>
    );
  }
};

ReactDOM.render(<Recipe />, document.getElementById('recette'));