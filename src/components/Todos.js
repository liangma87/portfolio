import React from 'react';
import { Table } from 'reactstrap';

export default class Todos extends React.Component {
  render() {
    return (
      <Table hover bordered>
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Notes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Check earning report</td>
            <td>04/22/2019</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Check earning report</td>
            <td>04/23/2019</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Follow up on XXX</td>
            <td>04/24/2019</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}