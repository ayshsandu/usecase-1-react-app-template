import React, { useState } from 'react';
import { Table, Icon, Input, Container, Button } from 'semantic-ui-react';

function Cart({ cart, removeFromCart }) {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (itemId, event) => {
    const newQuantities = { ...quantities };
    newQuantities[itemId] = event.target.value;
    setQuantities(newQuantities);
  };

  const getItemTotal = (item) => {
    const quantity = parseInt(quantities[item.id]) || 1;
    return quantity * item.price;
  };

  const getTotal = () => {
    let total = 0;
    for (const item of cart) {
      total += getItemTotal(item);
    }
    return total;
  };

  return (
    <Container>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Unit Price</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cart.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>
                <Input
                  type="number"
                  min="1"
                  value={quantities[item.id] || 1}
                  onChange={(e) => handleQuantityChange(item.id, e)}
                />
              </Table.Cell>
              <Table.Cell>${item.price}</Table.Cell>
              <Table.Cell>${getItemTotal(item)}</Table.Cell>
              <Table.Cell>
                <Button onClick={() => removeFromCart(item.id)}>
                  <Icon name="trash" color="red"/>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3" textAlign="right">
              Total
            </Table.HeaderCell>
            <Table.HeaderCell>${getTotal()}</Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Container>
  );
}

export default Cart;
