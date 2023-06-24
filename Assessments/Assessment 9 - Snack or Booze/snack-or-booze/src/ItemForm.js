import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import "./ItemForm.css";
const INITIAL_FORM_DATA = {
  name: "",
  description: "",
  recipe: "",
  serve: ""

};

function ItemForm({ addItem }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [type, setType] = useState("snacks");
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData });
    addItem(formData, type);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };
  return (

    <section className="col-md-4 itemForm">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            Add an Item
          </CardTitle>
          <form onSubmit={handleSubmit}>
            <ListGroup>

              <ListGroupItem>
                <select name="type" id="type" value={formData.type} onChange={(e) => setType(e.target.value)}>
                  <option value="snacks">Snack</option>
                  <option value="drinks">Drink</option>
                </select>
              </ListGroupItem>
              <ListGroupItem>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                />
              </ListGroupItem>
              <ListGroupItem>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                />
              </ListGroupItem>
              <ListGroupItem>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="recipe"
                  id="recipe"
                  value={formData.recipe}
                />
              </ListGroupItem>
              <ListGroupItem>
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="serve"
                  id="serve"
                  value={formData.serve}
                />
              </ListGroupItem>
              <button>Add new Item</button>

            </ListGroup>
          </form>
        </CardBody>
      </Card>
    </section>
  );
}
export default ItemForm;
