import React from 'react';
import {Modal,ControlLabel,FormGroup,FormControl,Button} from 'react-bootstrap';

//classe pour ajouter les plats
export class AddR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", ingredients: ""};
    this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
    this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleRecipeNameChange(e) {
    this.setState({name: e.target.value});
  }
  handleRecipeIngredientsChange(e) {
    this.setState({ingredients: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    const onAdd = this.props.onAdd;
    const regExp = /\s*,\s*/;
    var newName = this.state.name;
    var newIngredients = this.state.ingredients.split(regExp);
    var newRecipe = {name: newName, ingredients: newIngredients};
    onAdd(newRecipe);
    this.setState({name: "", ingredients: ""});
  }
  handleCancel() {
    const onAddModal = this.props.onAddModal;
    this.setState({name: "", ingredients: ""});
    onAddModal();
  }
  render() {
    const onShow = this.props.onShow;
    var regex1 = /^\S/;
    var regex2 = /^[^,\s]/;
   var regex3 = /[^,\s]$/;
    const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
    return(
      <Modal show={onShow} onHide={this.handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>New Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="formControlsName">
            <ControlLabel>Nom du recette</ControlLabel>
            <FormControl type="text" required onChange={this.handleRecipeNameChange} value={this.state.name} placeholder="entrer le nom de la recette" />
          </FormGroup>
          <FormGroup controlId="formControlsIngredients">
            <ControlLabel>Les ingrédients du recette</ControlLabel>
            <FormControl componentClass="textarea" type="text" required onChange={this.handleRecipeIngredientsChange} value={this.state.ingredients} placeholder="entrer les  Ingrédients sépareé par des virgules" />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!validRecipe} bsStyle="success" onClick={this.handleSubmit}>Sauvegarder la recette</Button>
        </Modal.Footer>
      </Modal>
    );
  }
};