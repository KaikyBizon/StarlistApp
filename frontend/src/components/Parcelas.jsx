import Form from 'react-bootstrap/Form';
import '../StylesPages/Parcelas.css'

function Parcelamento() {
  return (
    <Form.Select className='parcelas'>
      <option>12x</option>
      <option value="1">10x</option>
      <option value="2">8x</option>
      <option value="3">6x</option>
      <option value="4">4x</option>
      <option value="5">2x</option>
      <option value="6">A vista</option>
    </Form.Select>
  );
}

export default Parcelamento;